import { type StatBaseline, STAT_BASELINE } from "./baseline";
import { compareVersions, getItemHistory, getStatChangesForItem, type TimedStatChange } from "./history";
import { ALL_PATCHES } from "./patches";
import { DERIVED_STAT_KEYS, isStatKey } from "./stats";
import type { Patch, StatChange } from "./types";

export type StatValidationResult = { errors: string[]; warnings: string[] };

const NUMERIC_CHANGE_PATTERN = /from\s+x?(-?\d+(?:\.\d+)?)[^\d\s]*\s+to\s+x?(-?\d+(?:\.\d+)?)/gi;

const sameValue = (a: number, b: number) => Math.abs(a - b) < 1e-9;

// Note text may use cm or ms where `changes` stores m or s.
const matchesRecorded = (recorded: number[], value: number) =>
	recorded.some((recordedValue) => [1, 100, 1000].some((scale) => sameValue(recordedValue * scale, value)));

const chainKey = (change: StatChange) => (change.stat === "other" ? `other:${change.label}` : change.stat);

/**
 * Checks the structured stat data a patch-note scrape produces:
 * - every `from` continues the previous `to` for the same item+stat (baseline included as a point at `asOfVersion`);
 * - targets, baseline items and stat keys are all known;
 * - derived stats (total damage) are never recorded, and "Full shot damage" notes agree with damage × pellets;
 * - numeric "from X to Y" text without matching `changes` is reported as a warning.
 */
export const validateStatHistory = ({
	baseline = STAT_BASELINE,
	knownIds,
	patches = ALL_PATCHES,
}: {
	baseline?: StatBaseline;
	knownIds: ReadonlySet<string>;
	patches?: Patch[];
}): StatValidationResult => {
	const errors: string[] = [];
	const warnings: string[] = [];
	const known = (id: string) => knownIds.has(id);
	const isExcepted = (itemId: string, stat: string, version: string) =>
		baseline.exceptions.some(
			(exception) => exception.itemId === itemId && exception.stat === stat && exception.version === version,
		);

	for (const patch of patches) {
		for (const note of patch.patchNotes) {
			for (const change of note.changes ?? []) {
				if (!note.target || !known(note.target)) {
					errors.push(`${patch.version}: changes on unknown target "${note.target}"`);
				}
				if (change.stat === "other" ? !change.label : !isStatKey(change.stat)) {
					errors.push(`${patch.version} ${note.target}: invalid stat "${change.stat}"`);
				}
				if (change.stat !== "other" && DERIVED_STAT_KEYS.includes(change.stat)) {
					errors.push(`${patch.version} ${note.target}: "${change.stat}" is derived and can't be recorded`);
				}
			}

			if (!note.target || note.target === "general" || !known(note.target)) continue;

			const recorded = (note.changes ?? []).flatMap((change) => [change.from, change.to]);
			for (const [, from, to] of note.note.matchAll(NUMERIC_CHANGE_PATTERN)) {
				const covered = [Number(from), Number(to)].every((value) => matchesRecorded(recorded, value));
				if (!covered) {
					warnings.push(`${patch.version} ${note.target}: "from ${from} to ${to}" has no matching change`);
				}
			}
		}
	}

	for (const [itemId, values] of Object.entries(baseline.items)) {
		if (!known(itemId)) errors.push(`baseline: unknown item "${itemId}"`);
		for (const stat of Object.keys(values)) {
			if (!isStatKey(stat)) errors.push(`baseline ${itemId}: invalid stat "${stat}"`);
			else if (DERIVED_STAT_KEYS.includes(stat)) errors.push(`baseline ${itemId}: "${stat}" is derived`);
		}
	}

	const itemIds = new Set(
		patches.flatMap((patch) => patch.patchNotes.filter((note) => note.changes?.length).map((note) => note.target ?? "")),
	);

	for (const itemId of itemIds) {
		const byStat = new Map<string, TimedStatChange[]>();
		for (const timed of getStatChangesForItem(itemId, patches)) {
			const key = chainKey(timed.change);
			byStat.set(key, [...(byStat.get(key) ?? []), timed]);
		}

		for (const [stat, changes] of byStat) {
			const baselineValue = isStatKey(stat) ? baseline.items[itemId]?.[stat] : undefined;
			let previous: { value: number; where: string } | null = null;
			let baselineChecked = baselineValue === undefined;

			for (const { change, patch } of changes) {
				// Insert the baseline as a known point once we pass its version.
				if (!baselineChecked && compareVersions(patch.version, baseline.asOfVersion) > 0) {
					if (previous && !sameValue(previous.value, baselineValue as number)) {
						if (!isExcepted(itemId, stat, baseline.asOfVersion)) {
							errors.push(
								`${itemId} ${stat}: last change (${previous.where}) ends at ${previous.value} but baseline ${baseline.asOfVersion} is ${baselineValue}`,
							);
						}
					}
					previous = { value: baselineValue as number, where: `baseline ${baseline.asOfVersion}` };
					baselineChecked = true;
				}

				if (previous && !sameValue(previous.value, change.from) && !isExcepted(itemId, stat, patch.version)) {
					errors.push(
						`${itemId} ${stat}: ${patch.version} changes from ${change.from} but ${previous.where} left it at ${previous.value}`,
					);
				}
				previous = { value: change.to, where: patch.version };
			}

			if (!baselineChecked && previous && !sameValue(previous.value, baselineValue as number)) {
				if (!isExcepted(itemId, stat, baseline.asOfVersion)) {
					errors.push(
						`${itemId} ${stat}: last change (${previous.where}) ends at ${previous.value} but baseline ${baseline.asOfVersion} is ${baselineValue}`,
					);
				}
			}
		}
	}

	// Patch notes sometimes state full-shot damage alongside per-pellet damage; both must agree with the pellet count.
	for (const itemId of itemIds) {
		const totals = getItemHistory(itemId, patches, baseline).stats.find((series) => series.stat === "total-damage");
		for (const { change, patch } of getStatChangesForItem(itemId, patches)) {
			if (change.stat !== "other" || change.label !== "Full shot damage") continue;
			const total = [...(totals?.points ?? [])]
				.reverse()
				.find((point) => point.date && point.version === patch.version);
			if (!total) {
				errors.push(`${itemId} ${patch.version}: full shot damage recorded but no damage × pellets to check it against`);
			} else if (!sameValue(total.value, change.to)) {
				errors.push(
					`${itemId} ${patch.version}: full shot damage ${change.to} ≠ ${total.breakdown?.damage} × ${total.breakdown?.pellets} pellets (${total.value})`,
				);
			}
		}
	}

	return { errors, warnings };
};

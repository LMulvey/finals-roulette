import { type StatBaseline, STAT_BASELINE } from "./baseline";
import { ALL_PATCHES } from "./patches";
import { STAT_DISPLAY_ORDER, type StatKey } from "./stats";
import type { Patch, PatchNote, StatChange } from "./types";

export type StatPoint = {
	/** Null for the synthetic "before {version}" starting point. */
	date: Date | null;
	label: string;
	value: number;
	version: string;
};

export type StatSeries = {
	current: number;
	points: StatPoint[];
	stat: StatKey;
};

export type OtherStatChange = {
	date: Date;
	from: number;
	label: string;
	to: number;
	unit?: string;
	version: string;
};

export type ItemHistory = {
	/** Every patch that touched the item, newest first, temporary notes included. */
	entries: Array<{ notes: PatchNote[]; patch: Patch }>;
	otherChanges: OtherStatChange[];
	stats: StatSeries[];
};

/** Numeric comparison of "11.10.0"-style versions. */
export const compareVersions = (a: string, b: string) => {
	const left = a.split(".").map(Number);
	const right = b.split(".").map(Number);
	for (let index = 0; index < Math.max(left.length, right.length); index++) {
		const difference = (left[index] ?? 0) - (right[index] ?? 0);
		if (difference !== 0) return difference;
	}
	return 0;
};

export type TimedStatChange = { change: StatChange; patch: Patch };

/** Permanent stat changes for an item, oldest first. Temporary (limited-time) notes never shape a trend. */
export const getStatChangesForItem = (itemId: string, patches: Patch[] = ALL_PATCHES): TimedStatChange[] =>
	[...patches]
		.sort((a, b) => compareVersions(a.version, b.version))
		.flatMap((patch) =>
			patch.patchNotes
				.filter((note) => note.target === itemId && !note.temporary)
				.flatMap((note) => (note.changes ?? []).map((change) => ({ change, patch }))),
		);

const buildSeries = (stat: StatKey, changes: TimedStatChange[], baselineValue: number | undefined, asOf: string) => {
	const [first] = changes;

	// Runtime trusts each change's own from/to; the validation test is what keeps the chain honest.
	if (!first) {
		if (baselineValue === undefined) return null;
		return {
			current: baselineValue,
			points: [{ date: null, label: `As of ${asOf}`, value: baselineValue, version: asOf }],
			stat,
		};
	}

	const toPoint = ({ change, patch }: TimedStatChange): StatPoint => ({
		date: patch.date,
		label: patch.version,
		value: change.to,
		version: patch.version,
	});
	const isAfterBaseline = ({ patch }: TimedStatChange) => compareVersions(patch.version, asOf) > 0;

	const points: StatPoint[] = [
		{ date: null, label: `Before ${first.patch.version}`, value: first.change.from, version: first.patch.version },
		...changes.filter((change) => !isAfterBaseline(change)).map(toPoint),
	];

	// The snapshot wins over a stale chain: it captures changes the patch notes never announced.
	const lastBeforeBaseline = points.at(-1);
	if (baselineValue !== undefined && lastBeforeBaseline && lastBeforeBaseline.value !== baselineValue) {
		points.push({ date: null, label: `By ${asOf}`, value: baselineValue, version: asOf });
	}

	points.push(...changes.filter(isAfterBaseline).map(toPoint));

	return { current: points.at(-1)?.value ?? first.change.to, points, stat };
};

export const getItemHistory = (
	itemId: string,
	patches: Patch[] = ALL_PATCHES,
	baseline: StatBaseline = STAT_BASELINE,
): ItemHistory => {
	const entries = patches
		.map((patch) => ({ notes: patch.patchNotes.filter((note) => note.target === itemId), patch }))
		.filter(({ notes }) => notes.length)
		.sort((a, b) => compareVersions(b.patch.version, a.patch.version));

	const timedChanges = getStatChangesForItem(itemId, patches);
	const baselineValues = baseline.items[itemId] ?? {};

	const stats = STAT_DISPLAY_ORDER.map((stat) =>
		buildSeries(
			stat,
			timedChanges.filter(({ change }) => change.stat === stat),
			baselineValues[stat],
			baseline.asOfVersion,
		),
	).filter((series): series is StatSeries => series !== null);

	const otherChanges = timedChanges
		.flatMap(({ change, patch }) =>
			change.stat === "other"
				? [
						{
							date: patch.date,
							from: change.from,
							label: change.label,
							to: change.to,
							unit: change.unit,
							version: patch.version,
						},
					]
				: [],
		)
		.reverse();

	return { entries, otherChanges, stats };
};

import { type StatBaseline, STAT_BASELINE } from "./baseline";
import { ALL_PATCHES } from "./patches";
import { STAT_DISPLAY_ORDER, type StatKey } from "./stats";
import type { Patch, PatchNote, StatChange } from "./types";

export type StatPoint = {
	/** Factors behind a derived value, e.g. total damage = damage × pellets. */
	breakdown?: { damage: number; pellets: number };
	/** Null for synthetic points ("Before 5.8.0", "By 11.10.0", "As of 11.10.0"). */
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

/** A free-text (`stat: "other"`) stat, charted from its changes alone — there's no snapshot value for it. */
export type OtherStatSeries = {
	current: number;
	label: string;
	points: StatPoint[];
	unit?: string;
};

export type ItemHistory = {
	/** Every patch that touched the item, newest first, temporary notes included. */
	entries: Array<{ notes: PatchNote[]; patch: Patch }>;
	otherStats: OtherStatSeries[];
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

/** Where a point sits in time: before a patch, at it, or the snapshot catching up after it. */
type Rank = 0 | 1 | 2;
type RankedPoint = StatPoint & { rank: Rank };

const comparePositions = (a: RankedPoint, b: RankedPoint) => compareVersions(a.version, b.version) || a.rank - b.rank;

const stripRank = ({ rank: _rank, ...point }: RankedPoint): StatPoint => point;

const buildPoints = (
	changes: TimedStatChange[],
	baselineValue: number | undefined,
	asOf: string,
): RankedPoint[] | null => {
	const [first] = changes;

	// Runtime trusts each change's own from/to; the validation test is what keeps the chain honest.
	if (!first) {
		if (baselineValue === undefined) return null;
		return [{ date: null, label: `As of ${asOf}`, rank: 1, value: baselineValue, version: asOf }];
	}

	const toPoint = ({ change, patch }: TimedStatChange): RankedPoint => ({
		date: patch.date,
		label: patch.version,
		rank: 1,
		value: change.to,
		version: patch.version,
	});
	const isAfterBaseline = ({ patch }: TimedStatChange) => compareVersions(patch.version, asOf) > 0;

	const points: RankedPoint[] = [
		{ date: null, label: `Before ${first.patch.version}`, rank: 0, value: first.change.from, version: first.patch.version },
		...changes.filter((change) => !isAfterBaseline(change)).map(toPoint),
	];

	// The snapshot wins over a stale chain: it captures changes the patch notes never announced.
	const lastBeforeBaseline = points.at(-1);
	if (baselineValue !== undefined && lastBeforeBaseline && lastBeforeBaseline.value !== baselineValue) {
		points.push({ date: null, label: `By ${asOf}`, rank: 2, value: baselineValue, version: asOf });
	}

	points.push(...changes.filter(isAfterBaseline).map(toPoint));
	return points;
};

/** Value of a step series at a position. Before its first point, the earliest known value carries back. */
const valueAt = (points: RankedPoint[], position: RankedPoint) => {
	let value = points[0]?.value;
	for (const point of points) {
		if (comparePositions(point, position) > 0) break;
		value = point.value;
	}
	return value;
};

/**
 * Total damage per shot for pellet weapons: damage × pellets, each taken as it stood at that patch,
 * so a past per-pellet buff is multiplied by the pellet count of its own era.
 */
const buildTotalDamage = (damage: RankedPoint[] | null, pellets: RankedPoint[] | null): RankedPoint[] | null => {
	if (!damage || !pellets || !pellets.some((point) => point.value > 1)) return null;

	const positions = [...damage, ...pellets].sort(comparePositions);
	const points: RankedPoint[] = [];

	for (const position of positions) {
		const damageValue = valueAt(damage, position);
		const pelletCount = valueAt(pellets, position);
		if (damageValue === undefined || pelletCount === undefined) continue;

		const value = damageValue * pelletCount;
		const previous = points.at(-1);
		const samePosition = previous && comparePositions(previous, position) === 0;
		if (previous && previous.value === value && !samePosition) continue;

		const point = { ...position, breakdown: { damage: damageValue, pellets: pelletCount }, value };
		if (samePosition) points[points.length - 1] = point;
		else points.push(point);
	}

	return points;
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

	const pointsFor = (stat: StatKey) =>
		buildPoints(
			timedChanges.filter(({ change }) => change.stat === stat),
			baselineValues[stat],
			baseline.asOfVersion,
		);

	const recorded = new Map(STAT_DISPLAY_ORDER.map((stat) => [stat, pointsFor(stat)]));
	recorded.set("total-damage", buildTotalDamage(recorded.get("damage") ?? null, recorded.get("pellets") ?? null));

	const stats = STAT_DISPLAY_ORDER.flatMap((stat) => {
		const points = recorded.get(stat);
		const last = points?.at(-1);
		return points && last ? [{ current: last.value, points: points.map(stripRank), stat }] : [];
	});

	const otherLabels = [
		...new Set(timedChanges.flatMap(({ change }) => (change.stat === "other" ? [change.label] : []))),
	];
	const otherStats = otherLabels.flatMap((label) => {
		const changes = timedChanges.filter(({ change }) => change.stat === "other" && change.label === label);
		const points = buildPoints(changes, undefined, baseline.asOfVersion);
		const last = points?.at(-1);
		const [first] = changes;
		if (!points || !last || first?.change.stat !== "other") return [];
		return [{ current: last.value, label, points: points.map(stripRank), unit: first.change.unit }];
	});

	return { entries, otherStats, stats };
};

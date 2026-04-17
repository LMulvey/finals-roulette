import { differenceInCalendarDays } from "date-fns";
import { ALL_SEASON_FIVE_PATCHES } from "./season-5";
import { ALL_SEASON_SIX_PATCHES } from "./season-6";
import { ALL_SEASON_SEVEN_PATCHES } from "./season-7";
import { ALL_SEASON_EIGHT_PATCHES } from "./season-8";
import { ALL_SEASON_NINE_PATCHES } from "./season-9";
import { ALL_SEASON_TEN_PATCHES } from "./season-10";
import type { Patch, PatchNote, PatchNoteTarget } from "./types";

type Season = "seasonEight" | "seasonFive" | "seasonNine" | "seasonSeven" | "seasonSix" | "seasonTen";

export const ALL_PATCHES: Patch[] = [
	...ALL_SEASON_TEN_PATCHES,
	...ALL_SEASON_NINE_PATCHES,
	...ALL_SEASON_EIGHT_PATCHES,
	...ALL_SEASON_SEVEN_PATCHES,
	...ALL_SEASON_SIX_PATCHES,
	...ALL_SEASON_FIVE_PATCHES,
];

export const PATCHES_BY_SEASON: Record<Season, Patch[]> = {
	seasonEight: ALL_SEASON_EIGHT_PATCHES,
	seasonFive: ALL_SEASON_FIVE_PATCHES,
	seasonNine: ALL_SEASON_NINE_PATCHES,
	seasonSeven: ALL_SEASON_SEVEN_PATCHES,
	seasonSix: ALL_SEASON_SIX_PATCHES,
	seasonTen: ALL_SEASON_TEN_PATCHES,
};

export const getPatchByVersion = (flatVersion: string) => {
	const maybePatch = ALL_PATCHES.find((patch) => {
		return patch.version.replaceAll(".", "") === flatVersion;
	});
	return maybePatch;
};

const getRecentPatches = (numberOfDays?: number) => {
	const DEFAULT_NUMBER_OF_DAYS = 21;
	const resolvedNumberOfDays = numberOfDays ?? DEFAULT_NUMBER_OF_DAYS;

	return ALL_PATCHES.filter((patch) => {
		const difference = differenceInCalendarDays(new Date(), patch.date);

		return difference < resolvedNumberOfDays;
	}).sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const getMostRecentPatch = (guarantee?: boolean) => {
	const recentPatches = getRecentPatches();
	const maybePatch = recentPatches[0];

	if (guarantee) {
		return maybePatch ?? ALL_PATCHES[0];
	}

	return maybePatch;
};

const findMostCommonAdjustmentType = (patchNotes: PatchNote[]): PatchNote["adjustmentType"] => {
	// eslint-disable-next-line unicorn/no-array-reduce
	const adjustmentCounts = patchNotes.reduce(
		(accumulator, note) => {
			accumulator[note.adjustmentType] = (accumulator[note.adjustmentType] || 0) + 1;
			return accumulator;
		},
		{} as Record<PatchNote["adjustmentType"], number>,
	);

	return (
		// eslint-disable-next-line unicorn/no-array-reduce
		Object.entries(adjustmentCounts).reduce(
			(mostCommon, [type, count]) => {
				if (!mostCommon || count > adjustmentCounts[mostCommon]) {
					return type as PatchNote["adjustmentType"];
				}

				return mostCommon;
			},
			null as null | PatchNote["adjustmentType"],
		) ?? "neutral"
	);
};

export const maybeGetRecentAdjustmentForTarget = (target: PatchNoteTarget) => {
	const recentPatches = getRecentPatches();
	const sortedPatches = [...recentPatches].sort((a, b) => b.date.getTime() - a.date.getTime());

	const maybeAdjustmentPatches = sortedPatches.find((patch) =>
		patch.patchNotes.some((patchNote) => patchNote.target === target),
	);

	if (maybeAdjustmentPatches) {
		const filteredByTarget = maybeAdjustmentPatches.patchNotes.filter((patchNote) => patchNote.target === target);
		const flattenedNotes = filteredByTarget.map((patchNote) => patchNote.note).join(". ");
		const flattenedSassyNotes = filteredByTarget
			.map((patchNote) => patchNote.sassyNote)
			.filter(Boolean)
			.join(". ");
		const adjustmentType = findMostCommonAdjustmentType(filteredByTarget);

		return {
			adjustmentType,
			note: `${flattenedNotes}.`.replace("..", "."),
			patchDate: maybeAdjustmentPatches.date.toLocaleDateString(),
			patchUrl: `/patches/${maybeAdjustmentPatches.version.replaceAll(".", "")}`,
			patchVersion: maybeAdjustmentPatches.version,
			sassyNotes: flattenedSassyNotes.length ? `${flattenedSassyNotes}.` : "",
		};
	}

	return null;
};

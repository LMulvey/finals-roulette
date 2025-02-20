import { ALL_SEASON_FIVE_PATCHES } from './season-5';
import { type Patch, type PatchNote, type PatchNoteTarget } from './types';
import { differenceInCalendarDays } from 'date-fns';

type Season = 'seasonFive';

export const ALL_PATCHES: Patch[] = [...ALL_SEASON_FIVE_PATCHES];

export const PATCHES_BY_SEASON: Record<Season, Patch[]> = {
  seasonFive: ALL_SEASON_FIVE_PATCHES,
};

export const getPatchByVersion = (flatVersion: string) => {
  const maybePatch = ALL_PATCHES.find((patch) => {
    return patch.version.replaceAll('.', '') === flatVersion;
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

export const getMostRecentPatch = () => {
  const recentPatches = getRecentPatches();
  return recentPatches[0];
};

const findMostCommonAdjustmentType = (
  patchNotes: PatchNote[],
): PatchNote['adjustmentType'] => {
  // eslint-disable-next-line unicorn/no-array-reduce
  const adjustmentCounts = patchNotes.reduce(
    (accumulator, note) => {
      accumulator[note.adjustmentType] =
        (accumulator[note.adjustmentType] || 0) + 1;
      return accumulator;
    },
    {} as Record<PatchNote['adjustmentType'], number>,
  );

  return (
    // eslint-disable-next-line unicorn/no-array-reduce
    Object.entries(adjustmentCounts).reduce(
      (mostCommon, [type, count]) => {
        if (!mostCommon || count > adjustmentCounts[mostCommon]) {
          return type as PatchNote['adjustmentType'];
        }

        return mostCommon;
      },
      null as null | PatchNote['adjustmentType'],
    ) ?? 'neutral'
  );
};

export const maybeGetRecentAdjustmentForTarget = (target: PatchNoteTarget) => {
  const recentPatches = getRecentPatches();
  const sortedPatches = [...recentPatches].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  const maybeAdjustmentPatches = sortedPatches.find((patch) =>
    patch.patchNotes.some((patchNote) => patchNote.target === target),
  );

  if (maybeAdjustmentPatches) {
    const filteredByTarget = maybeAdjustmentPatches.patchNotes.filter(
      (patchNote) => patchNote.target === target,
    );
    const flattenedNotes = filteredByTarget
      .map((patchNote) => patchNote.sassyNote ?? patchNote.note)
      .join('. ');
    const adjustmentType = findMostCommonAdjustmentType(filteredByTarget);

    return {
      adjustmentType,
      note: `${flattenedNotes}.`,
      patchDate: maybeAdjustmentPatches.date.toLocaleDateString(),
      patchUrl: `/patches/${maybeAdjustmentPatches.version.replaceAll('.', '')}`,
      patchVersion: maybeAdjustmentPatches.version,
    };
  }

  return null;
};

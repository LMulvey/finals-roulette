import {
  heavyClass,
  heavySpecializations,
  heavyWeapons,
} from './contestants/heavy';
import {
  lightClass,
  lightSpecializations,
  lightWeapons,
} from './contestants/light';
import {
  mediumClass,
  mediumSpecializations,
  mediumWeapons,
} from './contestants/medium';
import { generateLoadoutName } from './generate-loadout-name';
import { getGadgetsForClass } from './get-gadgets-for-class';
import {
  type BaseItemType,
  type ClassType,
  type ContestantClass,
  type ContestantGadget,
  type ContestantLoadout,
  type ContestantSpecialization,
  type ContestantWeapon,
} from './schema';

export type Locks = {
  contestant?: ContestantClass;
  gadgets?: GadgetWithPosition[];
  specialization?: ContestantSpecialization;
  weapon?: ContestantWeapon;
};

type GadgetWithPosition = ContestantGadget & { position: number };

type WeightedItem = BaseItemType & {
  [key: string]: unknown;
};

/**
 * Picks a random number of items from an array, with optional weighting
 * @param items Array of items to pick from
 * @param count Number of items to pick
 * @param useWeights Whether to apply weighting based on item properties
 * @returns Array of randomly selected items
 */
const getRandomItems = <T extends WeightedItem>(
  items: T[],
  count: number,
  useWeights: boolean = false,
): T[] => {
  if (!items.length || count <= 0) return [];
  const resolvedCount = Math.min(count, items.length);

  if (!useWeights) {
    // Simple random selection without weights
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, resolvedCount);
  }

  // Create weighted array where buffed items appear twice
  // eslint-disable-next-line unicorn/no-array-reduce
  const weightedPool: T[] = items.reduce((accumulator: T[], item) => {
    accumulator.push(item);
    if (item.recentlyAdjusted?.adjustmentType === 'buff') {
      accumulator.push(item);
      accumulator.push(item);
    }

    return accumulator;
  }, []);

  const selected: T[] = [];
  const usedIndices = new Set<number>();

  while (selected.length < resolvedCount && usedIndices.size < items.length) {
    const randomIndex = Math.floor(Math.random() * weightedPool.length);
    const selectedItem = weightedPool[randomIndex];

    // Find original index to avoid duplicates
    const originalIndex = items.indexOf(selectedItem);

    if (!usedIndices.has(originalIndex)) {
      selected.push(selectedItem);
      usedIndices.add(originalIndex);
    }
  }

  return selected;
};

const findCommonClassTypes = (gadgets: ContestantGadget[]): ClassType[] => {
  if (!gadgets.length) {
    return [];
  }

  const commonTypes = new Set(gadgets[0].classType);

  for (let index = 1; index < gadgets.length; index++) {
    const currentGadgetTypes = new Set(gadgets[index].classType);

    for (const type of commonTypes) {
      if (!currentGadgetTypes.has(type)) {
        commonTypes.delete(type);
      }
    }

    if (commonTypes.size === 0) break;
  }

  return Array.from(commonTypes) as ClassType[];
};

const filterGadgetsByCommonTypes = (
  gadgets: ContestantGadget[],
): ContestantGadget[] => {
  const commonTypes = findCommonClassTypes(gadgets);

  if (commonTypes.length === 0) return [];

  return gadgets.filter((gadget) =>
    commonTypes.every((type) => gadget.classType.includes(type)),
  );
};

const getRandomContestant = (locks?: Locks) => {
  const MERGED_CONTESTANTS = [lightClass, mediumClass, heavyClass];

  if (locks?.contestant) {
    return [locks.contestant];
  }

  if (locks?.specialization) {
    const filteredContestants = MERGED_CONTESTANTS.filter(
      (contestant) => contestant.type === locks.specialization?.classType,
    );
    return getRandomItems(filteredContestants, 1, false);
  }

  if (locks?.weapon) {
    const filteredContestants = MERGED_CONTESTANTS.filter(
      (contestant) => contestant.type === locks.weapon?.classType,
    );
    return getRandomItems(filteredContestants, 1, false);
  }

  if (locks?.gadgets) {
    const filteredGadgets = filterGadgetsByCommonTypes(locks.gadgets);
    const supportedClassTypes = filteredGadgets.flatMap(
      (gadget) => gadget.classType,
    );
    const filteredContestants = MERGED_CONTESTANTS.filter((contestant) =>
      supportedClassTypes.includes(contestant.type),
    );
    return getRandomItems(filteredContestants, 1, false);
  }

  return getRandomItems(MERGED_CONTESTANTS, 1, false);
};

export const getContestantMeta = (
  classType: ClassType,
): {
  gadgets: ContestantGadget[];
  specializations: ContestantSpecialization[];
  weapons: ContestantWeapon[];
} => {
  const gadgets = getGadgetsForClass(classType);
  switch (classType) {
    case 'heavy':
      return {
        gadgets,
        specializations: heavySpecializations,
        weapons: heavyWeapons,
      };
    case 'medium':
      return {
        gadgets,
        specializations: mediumSpecializations,
        weapons: mediumWeapons,
      };
    case 'light':
    default:
      return {
        gadgets,
        specializations: lightSpecializations,
        weapons: lightWeapons,
      };
  }
};

const getRandomLoadoutGadgets = (contestantType: ClassType, locks?: Locks) => {
  const possibleGadgets = getGadgetsForClass(contestantType, locks);
  const maybeLockedGadgets = locks?.gadgets ?? [];

  // eslint-disable-next-line unicorn/no-new-array
  let mergedGadgets: Array<ContestantGadget | null> = new Array(3).fill(null);

  for (const { position, ...lockedGadget } of maybeLockedGadgets) {
    mergedGadgets[position] = lockedGadget;
  }

  const remainingSlots = mergedGadgets.filter(
    (currentGadget) => currentGadget === null,
  ).length;
  const randomGadgets = getRandomItems(possibleGadgets, remainingSlots, true);

  let randomIndex = 0;
  mergedGadgets = mergedGadgets.map((gadget) =>
    gadget === null ? randomGadgets[randomIndex++] : gadget,
  );

  return mergedGadgets as ContestantGadget[];
};

type GetRandomLoadoutOptions = {
  locks: Locks;
};

export const getRandomLoadout = (
  options?: GetRandomLoadoutOptions,
): ContestantLoadout => {
  const [contestant] = getRandomContestant(options?.locks);
  const meta = getContestantMeta(contestant.type);

  const gadgets = getRandomLoadoutGadgets(contestant.type, options?.locks);

  const maybeLockedSpecialization = options?.locks.specialization
    ? [options?.locks.specialization]
    : null;
  const [specialization] =
    maybeLockedSpecialization ?? getRandomItems(meta.specializations, 1, true);

  const maybeLockedWeapon = options?.locks.weapon
    ? [options?.locks.weapon]
    : null;
  const [weapon] = maybeLockedWeapon ?? getRandomItems(meta.weapons, 1, true);

  const loadout = { contestant, gadgets, specialization, weapon };
  const loadoutName = generateLoadoutName(loadout);

  return {
    contestant,
    gadgets,
    loadoutName,
    specialization,
    weapon,
  };
};

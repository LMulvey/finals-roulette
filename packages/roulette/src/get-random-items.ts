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
import { rollLoadoutName } from './generate-loadout-name';
import { getGadgetsForClass } from './get-gadgets-for-class';
import { maybeGetRecentAdjustmentForTarget } from '@repo/patch-notes/patches';
import {
  type BaseItemType,
  type ClassType,
  type ContestantClass,
  type ContestantGadget,
  type ContestantLoadout,
  type ContestantSpecialization,
  type ContestantWeapon,
} from '@repo/schema/roulette';

export type Locks = {
  contestant?: ContestantClass;
  gadgets?: GadgetWithPosition[];
  specialization?: ContestantSpecialization;
  weapon?: ContestantWeapon;
};

type GadgetWithPosition = ContestantGadget & { position: number };

type WeightedItem = BaseItemType<string> & {
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
    const maybeRecentlyAdjusted = maybeGetRecentAdjustmentForTarget(item.id);
    if (maybeRecentlyAdjusted?.adjustmentType === 'buff') {
      accumulator.push(item);
      accumulator.push(item);
    }

    /**
     * Push new additions way up!
     */
    if (maybeRecentlyAdjusted?.adjustmentType === 'addition') {
      accumulator.push(item);
      accumulator.push(item);
      accumulator.push(item);
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

    if (!selectedItem) {
      continue;
    }

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

  const [firstGadget, ...remainingGadgets] = gadgets;

  if (!firstGadget) {
    return [];
  }

  const commonTypes = new Set(firstGadget.classType);

  for (const gadget of remainingGadgets) {
    const currentGadgetTypes = new Set(gadget.classType);

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

const getRandomContestant = (
  locks?: Locks,
  options?: {
    disabledEquipmentIds?: string[];
  },
) => {
  const disabledEquipmentIds = options?.disabledEquipmentIds ?? [];
  const MERGED_CONTESTANTS = [lightClass, mediumClass, heavyClass].filter(
    (contestant) => !disabledEquipmentIds.includes(contestant.id),
  );

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
  options?: {
    disabledEquipmentIds?: string[];
    returnIfDisabledByEmbark?: boolean;
    returnIfDisabledByUser?: boolean;
  },
): {
  gadgets: ContestantGadget[];
  specializations: ContestantSpecialization[];
  weapons: ContestantWeapon[];
} => {
  const disabledEquipmentIds = options?.disabledEquipmentIds ?? [];
  const gadgets = getGadgetsForClass(classType, options);

  const filterItems = <TItem extends BaseItemType<string>>(item: TItem) => {
    const isDisabledByUser = disabledEquipmentIds.includes(item.id);
    const isDisabledByEmbark = item.disabled;

    if (isDisabledByUser && !options?.returnIfDisabledByUser) return false;
    if (isDisabledByEmbark && !options?.returnIfDisabledByEmbark) return false;

    return true;
  };

  switch (classType) {
    case 'heavy':
      return {
        gadgets: gadgets.filter(filterItems),
        specializations: heavySpecializations.filter(filterItems),
        weapons: heavyWeapons.filter(filterItems),
      };
    case 'medium':
      return {
        gadgets: gadgets.filter(filterItems),
        specializations: mediumSpecializations.filter(filterItems),
        weapons: mediumWeapons.filter(filterItems),
      };
    case 'light':
    default:
      return {
        gadgets: gadgets.filter(filterItems),
        specializations: lightSpecializations.filter(filterItems),
        weapons: lightWeapons.filter(filterItems),
      };
  }
};

const getRandomLoadoutGadgets = (
  contestantType: ClassType,
  options?: {
    disabledEquipmentIds?: string[];
    locks?: Locks;
    returnIfDisabledByEmbark?: boolean;
    returnIfDisabledByUser?: boolean;
  },
) => {
  const possibleGadgets = getGadgetsForClass(contestantType, options);
  const maybeLockedGadgets = options?.locks?.gadgets ?? [];

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
    gadget === null ? randomGadgets[randomIndex++] ?? null : gadget,
  );

  return mergedGadgets as ContestantGadget[];
};

type GetRandomLoadoutOptions = {
  disabledEquipmentIds?: string[];
  locks: Locks;
};

const getDefaultSpecializationForClass = (classType: ClassType) => {
  switch (classType) {
    case 'heavy':
      return heavySpecializations[0]!;
    case 'medium':
      return mediumSpecializations[0]!;
    case 'light':
    default:
      return lightSpecializations[0]!;
  }
};

const getDefaultWeaponForClass = (classType: ClassType) => {
  switch (classType) {
    case 'heavy':
      return heavyWeapons[0]!;
    case 'medium':
      return mediumWeapons[0]!;
    case 'light':
    default:
      return lightWeapons[0]!;
  }
};

export const getRandomLoadout = (
  options?: GetRandomLoadoutOptions,
): ContestantLoadout => {
  const contestant = getRandomContestant(options?.locks, {
    disabledEquipmentIds: options?.disabledEquipmentIds,
  })[0] ?? lightClass;
  const meta = getContestantMeta(contestant.type, {
    disabledEquipmentIds: options?.disabledEquipmentIds,
    returnIfDisabledByEmbark: true,
    returnIfDisabledByUser: true,
  });
  const gadgets = getRandomLoadoutGadgets(contestant.type, {
    disabledEquipmentIds: options?.disabledEquipmentIds,
    locks: options?.locks,
  });

  const maybeLockedSpecialization = options?.locks.specialization
    ? [options?.locks.specialization]
    : null;
  const specialization =
    maybeLockedSpecialization?.[0] ??
    getRandomItems(meta.specializations, 1, true)[0] ??
    meta.specializations[0] ??
    getDefaultSpecializationForClass(contestant.type);

  const maybeLockedWeapon = options?.locks.weapon
    ? [options?.locks.weapon]
    : null;
  const weapon =
    maybeLockedWeapon?.[0] ??
    getRandomItems(meta.weapons, 1, true)[0] ??
    meta.weapons[0] ??
    getDefaultWeaponForClass(contestant.type);

  const loadout = { contestant, gadgets, specialization, weapon };
  const { loadoutName, loadoutNameSeed } = rollLoadoutName(loadout);

  return {
    contestant,
    gadgets,
    loadoutName,
    loadoutNameSeed,
    specialization,
    weapon,
  };
};

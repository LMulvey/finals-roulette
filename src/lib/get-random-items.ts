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
  type ContestantGadget,
  type ContestantLoadout,
  type ContestantSpecialization,
  type ContestantWeapon,
} from './schema';

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

const getRandomContestant = () => {
  const MERGED_CONTESTANTS = [lightClass, mediumClass, heavyClass];
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

export const getRandomLoadout = (): ContestantLoadout => {
  const [contestant] = getRandomContestant();
  const meta = getContestantMeta(contestant.type);
  const possibleGadgets = getGadgetsForClass(contestant.type);

  const gadgets = getRandomItems(possibleGadgets, 3, true);
  const [specialization] = getRandomItems(meta.specializations, 1, true);
  const [weapon] = getRandomItems(meta.weapons, 1, true);
  const loadout = { contestant, gadgets, specialization, weapon };
  const loadoutName = generateLoadoutName(loadout);

  return { contestant, gadgets, loadoutName, specialization, weapon };
};

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
import { getGadgetsForClass } from './get-gadgets-for-class';
import {
  type ClassType,
  type ContestantSpecialization,
  type ContestantWeapon,
} from './schema';

type WeightedItem = {
  [key: string]: unknown;
  recentlyBuffed?: boolean;
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
    if (item.recentlyBuffed) {
      accumulator.push(item); // Add buffed items twice for double weight
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

const getContestantMeta = (
  classType: ClassType,
): {
  specializations: ContestantSpecialization[];
  weapons: ContestantWeapon[];
} => {
  switch (classType) {
    case 'heavy':
      return {
        specializations: heavySpecializations,
        weapons: heavyWeapons,
      };
    case 'medium':
      return {
        specializations: mediumSpecializations,
        weapons: mediumWeapons,
      };
    case 'light':
    default:
      return {
        specializations: lightSpecializations,
        weapons: lightWeapons,
      };
  }
};

export const getRandomLoadout = () => {
  const [contestant] = getRandomContestant();
  const meta = getContestantMeta(contestant.type);
  const possibleGadgets = getGadgetsForClass(contestant.type);

  const gadgets = getRandomItems(possibleGadgets, 3, true);
  const [specialization] = getRandomItems(meta.specializations, 1, true);
  const [weapon] = getRandomItems(meta.weapons, 1, true);

  return { contestant, gadgets, specialization, weapon };
};

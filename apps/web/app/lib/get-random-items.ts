import {
  getContestantMeta as getContestantMetaFromPackage,
  getRandomLoadout as getRandomLoadoutFromPackage,
  type Locks,
} from '@repo/roulette/get-random-items';
import { type ClassType } from '@repo/schema/roulette';
import { getSettings } from './settings-storage';

export type { Locks };

export const getContestantMeta = (
  classType: ClassType,
  options?: {
    returnIfDisabledByEmbark?: boolean;
    returnIfDisabledByUser?: boolean;
  },
) => {
  const settings = getSettings();

  return getContestantMetaFromPackage(classType, {
    ...options,
    disabledEquipmentIds: settings.disabledEquipmentIds,
  });
};

export const getRandomLoadout = (options?: { locks: Locks }) => {
  const settings = getSettings();

  return getRandomLoadoutFromPackage({
    ...options,
    disabledEquipmentIds: settings.disabledEquipmentIds,
    locks: options?.locks ?? {},
  });
};

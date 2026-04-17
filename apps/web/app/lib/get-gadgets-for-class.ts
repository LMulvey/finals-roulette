import { getGadgetsForClass as getGadgetsForClassFromPackage } from '@repo/roulette/get-gadgets-for-class';
import { type ClassType } from '@repo/schema/roulette';
import { type Locks } from './get-random-items';
import { getSettings } from './settings-storage';

export const getGadgetsForClass = (
  classType: ClassType,
  options?: {
    locks?: Locks;
    returnIfDisabledByEmbark?: boolean;
    returnIfDisabledByUser?: boolean;
  },
) => {
  const settings = getSettings();

  return getGadgetsForClassFromPackage(classType, {
    ...options,
    disabledEquipmentIds: settings.disabledEquipmentIds,
  });
};

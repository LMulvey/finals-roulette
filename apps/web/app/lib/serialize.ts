import {
  deserializeLoadout as deserializeLoadoutFromPackage,
  serializeLoadout as serializeLoadoutFromPackage,
} from '@repo/roulette/serialize';
import { getSettings } from './settings-storage';

export const serializeLoadout = serializeLoadoutFromPackage;

export const deserializeLoadout = (compressed: string) => {
  const settings = getSettings();

  return deserializeLoadoutFromPackage(compressed, {
    disabledEquipmentIds: settings.disabledEquipmentIds,
  });
};

import { storage } from './storage';
import { type Settings } from '@repo/schema/roulette';

const SETTINGS_STORAGE_KEY = 'user_settings';

const defaultSettings: Settings = {
  disabledEquipmentIds: [],
  showEquipmentDescriptions: true,
};

export const getSettings = (): Settings => {
  const settings = storage.get<Settings>(SETTINGS_STORAGE_KEY);
  return settings ?? defaultSettings;
};

export const saveSettings = (newSettings: Settings) => {
  storage.set<Settings>(SETTINGS_STORAGE_KEY, newSettings);
};

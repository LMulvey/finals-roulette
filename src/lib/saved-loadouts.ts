import { isTruthy } from './is-truthy';
import { type ContestantLoadout } from './schema';
import { deserializeLoadout } from './serialize';
import { storage } from './storage';

export type ContestantLoadoutWithKey = ContestantLoadout & {
  loadoutKey: string;
};
type SavedLoadout = string;
type SavedLoadouts = SavedLoadout[];

const SAVED_LOADOUTS_STORAGE_KEY = 'saved_loadouts';

export const getSavedLoadoutKeys = (): SavedLoadouts => {
  const loadoutKeys = storage.get<SavedLoadouts>(SAVED_LOADOUTS_STORAGE_KEY);
  return loadoutKeys ?? [];
};

export const getSavedLoadouts = (): ContestantLoadoutWithKey[] => {
  const loadoutKeys = getSavedLoadoutKeys();
  const loadouts =
    loadoutKeys
      ?.map((loadoutKey) => {
        const loadout = deserializeLoadout(loadoutKey);
        if (!loadout) return null;
        return { ...loadout, loadoutKey };
      })
      ?.filter(isTruthy) ?? [];
  return loadouts;
};

export const addSavedLoadout = (loadoutKey: string) => {
  const currentLoadoutKeys = getSavedLoadoutKeys();
  const newLoadoutKeys = [loadoutKey, ...currentLoadoutKeys];

  storage.set<SavedLoadouts>(SAVED_LOADOUTS_STORAGE_KEY, newLoadoutKeys);
};

export const deleteSavedLoadout = (loadoutKey: string) => {
  const currentLoadoutKeys = getSavedLoadoutKeys();
  const newLoadoutKeys = currentLoadoutKeys.filter(
    (maybeLoadoutKey) => loadoutKey !== maybeLoadoutKey,
  );

  storage.set<SavedLoadouts>(SAVED_LOADOUTS_STORAGE_KEY, newLoadoutKeys);
};

import { isTruthy } from './is-truthy';
import { type ContestantLoadout } from './schema';
import { deserializeLoadout } from './serialize';
import { storage } from './storage';

type RecentLoadout = string;
type RecentLoadouts = RecentLoadout[];

const RECENT_LOADOUTS_STORAGE_KEY = 'recent_loadouts';

export const getRecentLoadouts = (): ContestantLoadout[] => {
  const loadoutKeys = storage.get<RecentLoadouts>(RECENT_LOADOUTS_STORAGE_KEY);
  const loadouts =
    loadoutKeys
      ?.map((loadoutKey) => deserializeLoadout(loadoutKey))
      ?.filter(isTruthy) ?? [];
  return loadouts;
};

export const saveRecentLoadout = (loadoutKey: string) => {
  const currentLoadoutKeys =
    storage.get<RecentLoadouts>(RECENT_LOADOUTS_STORAGE_KEY) ?? [];
  const newLoadoutKeys = [
    loadoutKey,
    // Maximum of ten loadouts saved
    ...currentLoadoutKeys.slice(0, 10),
  ];

  storage.set<RecentLoadouts>(RECENT_LOADOUTS_STORAGE_KEY, newLoadoutKeys);
};

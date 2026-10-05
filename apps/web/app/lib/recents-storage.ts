import type { ContestantLoadout } from "@repo/schema/roulette";
import { isTruthy } from "./is-truthy";
import { deserializeLoadout } from "./serialize";
import { storage } from "./storage";

type RecentLoadouts = string[];

const RECENT_LOADOUTS_STORAGE_KEY = "recent_loadouts";
const MAX_RECENT_LOADOUTS = 10;

export const getRecentLoadoutKeys = (): RecentLoadouts =>
	storage.get<RecentLoadouts>(RECENT_LOADOUTS_STORAGE_KEY) ?? [];

export const getRecentLoadouts = (): Array<
	ContestantLoadout & { loadoutKey: string }
> =>
	getRecentLoadoutKeys()
		.map((loadoutKey) => {
			const loadout = deserializeLoadout(loadoutKey);
			return loadout ? { ...loadout, loadoutKey } : null;
		})
		.filter(isTruthy);

export const saveRecentLoadout = (loadoutKey: string) => {
	const currentLoadoutKeys = getRecentLoadoutKeys().filter(
		(key) => key !== loadoutKey,
	);
	storage.set<RecentLoadouts>(
		RECENT_LOADOUTS_STORAGE_KEY,
		[loadoutKey, ...currentLoadoutKeys].slice(0, MAX_RECENT_LOADOUTS),
	);
};

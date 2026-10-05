import {
	getSwapOptions as getSwapOptionsFromPackage,
	type LoadoutSlot,
	rerollLoadoutSlot as rerollLoadoutSlotFromPackage,
	type SwapOption,
	swapLoadoutItem as swapLoadoutItemFromPackage,
} from "@repo/roulette/swap";
import type { ContestantLoadout } from "@repo/schema/roulette";
import { getSettings } from "./settings-storage";

export type { LoadoutSlot, SwapOption };

const withSettings = () => ({
	disabledEquipmentIds: getSettings().disabledEquipmentIds,
});

export const getSwapOptions = (loadout: ContestantLoadout, slot: LoadoutSlot) =>
	getSwapOptionsFromPackage(loadout, slot, withSettings());

export const swapLoadoutItem = (
	loadout: ContestantLoadout,
	slot: LoadoutSlot,
	itemId: string,
) => swapLoadoutItemFromPackage(loadout, slot, itemId, withSettings());

export const rerollLoadoutSlot = (
	loadout: ContestantLoadout,
	slot: LoadoutSlot,
) => rerollLoadoutSlotFromPackage(loadout, slot, withSettings());

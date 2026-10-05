import type {
	ContestantClass,
	ContestantGadget,
	ContestantLoadout,
	ContestantSpecialization,
	ContestantWeapon,
} from "@repo/schema/roulette";
import { heavyClass } from "./contestants/heavy";
import { lightClass } from "./contestants/light";
import { mediumClass } from "./contestants/medium";
import { getContestantMeta } from "./get-random-items";

export type LoadoutSlot =
	| { kind: "contestant" }
	| { kind: "specialization" }
	| { kind: "weapon" }
	| { index: number; kind: "gadget" };

export type SwapOption = ContestantClass | ContestantGadget | ContestantSpecialization | ContestantWeapon;

type SwapOptions = {
	disabledEquipmentIds?: string[];
};

export const ALL_CONTESTANTS: ContestantClass[] = [lightClass, mediumClass, heavyClass];

const pickRandom = <T>(items: T[]): T | undefined => items[Math.floor(Math.random() * items.length)];

/**
 * Lists every item that can legally occupy `slot` given the rest of the loadout.
 * Gadgets already equipped in other slots are excluded (no duplicates), and items
 * the user disabled in settings are left out.
 */
export const getSwapOptions = (
	loadout: ContestantLoadout,
	slot: LoadoutSlot,
	options?: SwapOptions,
): SwapOption[] => {
	const disabledEquipmentIds = options?.disabledEquipmentIds ?? [];

	if (slot.kind === "contestant") {
		return ALL_CONTESTANTS.filter((contestant) => !disabledEquipmentIds.includes(contestant.id));
	}

	const meta = getContestantMeta(loadout.contestant.type, { disabledEquipmentIds });

	switch (slot.kind) {
		case "specialization":
			return meta.specializations;
		case "weapon":
			return meta.weapons;
		case "gadget": {
			const otherGadgetIds = loadout.gadgets
				.filter((_, index) => index !== slot.index)
				.map((gadget) => gadget.id);
			return meta.gadgets.filter((gadget) => !otherGadgetIds.includes(gadget.id));
		}
	}
};

/**
 * Returns a new loadout with `itemId` placed in `slot`.
 *
 * Switching contestant keeps any gadgets the new class can still use and re-rolls
 * everything that is class-specific (weapon, specialization, invalid gadgets).
 */
export const swapLoadoutItem = (
	loadout: ContestantLoadout,
	slot: LoadoutSlot,
	itemId: string,
	options?: SwapOptions,
): ContestantLoadout => {
	const candidates = getSwapOptions(loadout, slot, options);
	const nextItem = candidates.find((candidate) => candidate.id === itemId);

	if (!nextItem) {
		return loadout;
	}

	switch (slot.kind) {
		case "contestant": {
			const contestant = nextItem as ContestantClass;
			if (contestant.type === loadout.contestant.type) return loadout;

			const meta = getContestantMeta(contestant.type, {
				disabledEquipmentIds: options?.disabledEquipmentIds,
			});
			const keptGadgets = loadout.gadgets.map((gadget) =>
				gadget.classType.includes(contestant.type) ? gadget : null,
			);
			const usedIds = new Set(keptGadgets.filter(Boolean).map((gadget) => gadget?.id));
			const gadgets = keptGadgets.map((gadget) => {
				if (gadget) return gadget;
				const replacement = pickRandom(meta.gadgets.filter((candidate) => !usedIds.has(candidate.id)));
				if (replacement) usedIds.add(replacement.id);
				return replacement;
			});

			const weapon = pickRandom(meta.weapons);
			const specialization = pickRandom(meta.specializations);

			if (!weapon || !specialization || gadgets.some((gadget) => !gadget)) {
				return loadout;
			}

			return {
				...loadout,
				contestant,
				gadgets: gadgets as ContestantGadget[],
				specialization,
				weapon,
			};
		}
		case "specialization":
			return { ...loadout, specialization: nextItem as ContestantSpecialization };
		case "weapon":
			return { ...loadout, weapon: nextItem as ContestantWeapon };
		case "gadget":
			return {
				...loadout,
				gadgets: loadout.gadgets.map((gadget, index) =>
					index === slot.index ? (nextItem as ContestantGadget) : gadget,
				),
			};
	}
};

/** Re-rolls a single slot to a random valid item other than the current one. */
export const rerollLoadoutSlot = (
	loadout: ContestantLoadout,
	slot: LoadoutSlot,
	options?: SwapOptions,
): ContestantLoadout => {
	const currentId = getItemInSlot(loadout, slot)?.id;
	const candidates = getSwapOptions(loadout, slot, options).filter((candidate) => candidate.id !== currentId);
	const next = pickRandom(candidates);

	return next ? swapLoadoutItem(loadout, slot, next.id, options) : loadout;
};

export const getItemInSlot = (loadout: ContestantLoadout, slot: LoadoutSlot): SwapOption | undefined => {
	switch (slot.kind) {
		case "contestant":
			return loadout.contestant;
		case "specialization":
			return loadout.specialization;
		case "weapon":
			return loadout.weapon;
		case "gadget":
			return loadout.gadgets[slot.index];
	}
};

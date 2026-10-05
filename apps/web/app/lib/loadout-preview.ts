import type { ContestantLoadout } from "@repo/schema/roulette";
import { CLASS_LABEL } from "./equipment";

export const getLoadoutPreview = (loadout: ContestantLoadout) => {
	const className = CLASS_LABEL[loadout.contestant.type];
	const name = loadout.loadoutName ?? `${className} loadout`;
	return {
		name,
		className,
		title: `${name} · THE FINALS Roulette`,
		description: `${className} contestant with ${loadout.weapon.label}, ${loadout.specialization.label}, and ${loadout.gadgets.map((gadget) => gadget.label).join(", ")}.`,
	};
};

import type {
	ClassType,
	ContestantClass,
	ContestantGadget,
	ContestantSpecialization,
	ContestantWeapon,
	WeaponType,
} from "@repo/schema/roulette";

export type EquipmentItem =
	| ContestantClass
	| ContestantGadget
	| ContestantSpecialization
	| ContestantWeapon;

export type EquipmentKind =
	| "contestant"
	| "gadget"
	| "specialization"
	| "weapon";

export const getEquipmentKind = (item: EquipmentItem): EquipmentKind => {
	if ("healthPoints" in item) return "contestant";
	if (Array.isArray(item.classType)) return "gadget";
	if ("type" in item) return "weapon";
	return "specialization";
};

export const EQUIPMENT_KIND_LABEL: Record<EquipmentKind, string> = {
	contestant: "Contestant",
	gadget: "Gadget",
	specialization: "Specialization",
	weapon: "Weapon",
};

export const WEAPON_TYPE_LABEL: Record<WeaponType, string> = {
	"assault-rifle": "Assault Rifle",
	crossbow: "Crossbow",
	"grenade-launcher": "Grenade Launcher",
	handgun: "Handgun",
	lmg: "LMG",
	"marksman-rifle": "Marksman Rifle",
	melee: "Melee",
	shotgun: "Shotgun",
	smg: "SMG",
};

export const CLASS_LABEL: Record<ClassType, string> = {
	heavy: "Heavy",
	light: "Light",
	medium: "Medium",
};

/** Short secondary line for an item: weapon type, class list for gadgets, HP for contestants. */
export const getEquipmentMeta = (item: EquipmentItem): string => {
	switch (getEquipmentKind(item)) {
		case "contestant": {
			const contestant = item as ContestantClass;
			return `${contestant.healthPoints} HP`;
		}
		case "weapon":
			return WEAPON_TYPE_LABEL[(item as ContestantWeapon).type];
		case "gadget":
			return (item as ContestantGadget).classType
				.map((classType) => CLASS_LABEL[classType])
				.join(" · ");
		default:
			return CLASS_LABEL[(item as ContestantSpecialization).classType];
	}
};

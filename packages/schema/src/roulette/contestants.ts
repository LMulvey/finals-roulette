import type { BaseItemType, ClassType } from "./base";
import type { GadgetId, SpecializationId, WeaponId, WeaponType } from "./ids";

export type ContestantClass = {
	description: string;
	healthPoints: number;
	id: string;
	imageUrl?: string;
	label: string;
	regenerationSeconds: number;
	type: ClassType;
};

export type ContestantGadget = BaseItemType<GadgetId> & {
	classType: ClassType[];
	description: string;
	imageUrl?: string;
	label: string;
};

export type ContestantSpecialization = BaseItemType<SpecializationId> & {
	classType: ClassType;
	description: string;
	imageUrl?: string;
	label: string;
};

export type ContestantWeapon = BaseItemType<WeaponId> & {
	classType: ClassType;
	description: string;
	imageUrl?: string;
	label: string;
	type: WeaponType;
};

export type ContestantLoadout = {
	contestant: ContestantClass;
	gadgets: ContestantGadget[];
	loadoutName: null | string;
	/** Seed that regenerates `loadoutName`; lets share URLs carry a few chars instead of the name text. */
	loadoutNameSeed?: null | number;
	specialization: ContestantSpecialization;
	weapon: ContestantWeapon;
};

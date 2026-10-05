import type { GadgetId, SpecializationId, WeaponId } from "@repo/schema/roulette";

export type Patch = {
	date: Date;
	description: string;
	originalUrl: string;
	patchNotes: PatchNote[];
	title: string;
	updatedNote?: string;
	version: string;
};

export type PatchNote = {
	adjustmentType: "addition" | "buff" | "nerf" | "neutral" | "removal";
	category: PatchNoteCategory;
	devNote?: string;
	note: string;
	sassyNote?: string;
	section: PatchNoteSection;
	target?: PatchNoteTarget;
	/** Limited-time change (e.g. Respec Order). Shown on the patch page but ignored for "recently adjusted" badges. */
	temporary?: boolean;
};

export type PatchNoteCategory =
	| "animation"
	| "audio"
	| "characters"
	| "contestants"
	| "controller"
	| "cosmetics"
	| "gadget"
	| "game-mode"
	| "gameplay"
	| "general"
	| "maps"
	| "rendering"
	| "settings"
	| "specializations"
	| "stability-and-performance"
	| "ui"
	| "vfx"
	| "weapons";

export type PatchNoteSection =
	| "additions"
	| "balance"
	| "content-and-bug-fixes"
	| "removals"
	| "security-and-anti-cheat"
	| "store";

export type PatchNoteTarget = "general" | GadgetId | SpecializationId | (string & {}) | WeaponId;

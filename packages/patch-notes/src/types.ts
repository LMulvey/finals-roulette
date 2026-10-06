import type { GadgetId, SpecializationId, WeaponId } from "@repo/schema/roulette";
import type { StatKey } from "./stats";

export type Patch = {
	date: Date;
	description: string;
	originalUrl: string;
	patchNotes: PatchNote[];
	title: string;
	updatedNote?: string;
	version: string;
};

/** Machine-readable mirror of a numeric "from X to Y" change in `PatchNote.note`. */
export type StatChange =
	| { from: number; stat: StatKey; to: number }
	| { from: number; label: string; stat: "other"; to: number; unit?: string };

export type PatchNote = {
	adjustmentType: "addition" | "buff" | "nerf" | "neutral" | "removal";
	category: PatchNoteCategory;
	changes?: StatChange[];
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

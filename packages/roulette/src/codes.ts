import type { GadgetId, SpecializationId, WeaponId } from "@repo/schema/roulette";

/*
 * Permanent share-URL codes. An item's code is its index in these lists, written
 * as one base64url character, so a whole loadout fits in 7 characters.
 *
 * APPEND-ONLY. Never reorder or delete entries: that would silently change what
 * every existing share link and saved loadout points at. To retire an item,
 * replace its id with `null` (a tombstone). `codes.test.mjs` pins the current
 * lists and fails if an existing code changes.
 *
 * Each list holds at most 64 entries (one character). Past that, bump
 * `LOADOUT_CODE_VERSION` in serialize.ts and widen the field.
 */

export const CONTESTANT_CODES: ReadonlyArray<null | string> = [
	"light-contestant",
	"medium-contestant",
	"heavy-contestant",
];

export const SPECIALIZATION_CODES: ReadonlyArray<null | SpecializationId> = [
	"cloaking-device",
	"evasive-dash",
	"grappling-hook",
	"shockwave",
	"guardian-turret",
	"dematerializer",
	"healing-beam",
	"charge-n-slam",
	"goo-gun",
	"mesh-shield",
	"winch-claw",
];

export const WEAPON_CODES: ReadonlyArray<null | WeaponId> = [
	"93r",
	"dagger",
	"lh1",
	"m11",
	"m26-matter",
	"recurve-bow",
	"sh1900",
	"sr-84",
	"sword",
	"v9s",
	"xp-54",
	"throwing-knives",
	"arn-220",
	"akm",
	"cerberus",
	"cl-40",
	"dual-blades",
	"famas",
	"fcar",
	"model-1887",
	"pike-556",
	"chimera-xb",
	"r-357",
	"riot-shield",
	"cb-01-repeater",
	"p90",
	"50-akimbo",
	"flamethrower",
	"ks-23",
	"lewis-gun",
	"m32gl",
	"m60",
	"sa1216",
	"shak-50",
	"sledgehammer",
	"spear",
	"m134-minigun",
	"bfr-titan",
];

export const GADGET_CODES: ReadonlyArray<GadgetId | null> = [
	"breach-charge",
	"gateway",
	"glitch-grenade",
	"gravity-vortex",
	"sonar-grenade",
	"stun-gun",
	"thermal-bore",
	"thermal-vision",
	"tracking-dart",
	"vanishing-bomb",
	"aps-turret",
	"data-reshaper",
	"defibrillator",
	"explosive-mine",
	"gas-mine",
	"glitch-trap",
	"jump-pad",
	"hover-pad",
	"zipline",
	"proximity-sensor",
	"anti-gravity-cube",
	"barricade",
	"c4",
	"dome-shield",
	"lockbolt-launcher",
	"pyro-mine",
	"rpg-7",
	"flashbang",
	"frag-grenade",
	"gas-grenade",
	"goo-grenade",
	"pyro-grenade",
	"smoke-grenade",
	"h-plus-infuser",
	"healing-emitter",
	"breach-drill",
];

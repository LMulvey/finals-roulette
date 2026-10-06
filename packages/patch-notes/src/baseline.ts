import type { StatKey } from "./stats";

export type StatBaseline = {
	/** Patch the snapshot was taken at. History before it is rebuilt from each change's `from`. */
	asOfVersion: string;
	/** Deliberate breaks in a stat's from/to chain (missed patch, unannounced change), so validation passes knowingly. */
	exceptions: Array<{
		itemId: string;
		reason: string;
		/** A `StatKey`, or `other:<label>` for a free-text stat. */
		stat: string;
		/** Patch whose `from` breaks the chain, or `asOfVersion` when the chain disagrees with the snapshot. */
		version: string;
	}>;
	items: Record<string, Partial<Record<StatKey, number>>>;
};

// One-time snapshot. Patch-note scrapes add `changes`; they never edit this file.
// Conventions: values are the permanent ones (11.10.0's Respec Order changes were Cashout-only and temporary).
// `damage` = body damage per bullet; per pellet for shotguns/ShAK-50; base (glancing) primary hit for melee.
// `reload-time` = empty (full) reload. `cooldown` for deployables = cooldown after destruction.
// Equip/unequip times come from the latest known from/to change (mostly 7.3.0); they're not listed on the wiki.
export const STAT_BASELINE: StatBaseline = {
	asOfVersion: "11.10.0",
	exceptions: [
		{ itemId: "breach-drill", reason: "10.9.0 cooldown 20s → 15s; no 10.9.0 patch file in repo", stat: "cooldown", version: "11.10.0" },
		{ itemId: "cerberus", reason: "Full shot rose 99 → 104 in 9.9.0 via pellets 11 → 13 and damage 9 → 8; the note gives no full-shot figure", stat: "other:Full shot damage", version: "11.6.0" },
		{ itemId: "dagger", reason: "11.0.0 melee rework redefined primary damage as base/precise hits", stat: "damage", version: "11.10.0" },
		{ itemId: "ks-23", reason: "Wiki shows 78 RPM vs 85 after 6.0.0; change not in repo patch notes", stat: "fire-rate", version: "11.10.0" },
		{ itemId: "model-1887", reason: "Wiki shows 0.65 vs 0.7 after 5.8.0; change not in repo patch notes", stat: "falloff-multiplier", version: "11.10.0" },
		{ itemId: "model-1887", reason: "Wiki shows 72 RPM vs 75 after 5.12.0; change not in repo patch notes", stat: "fire-rate", version: "11.10.0" },
		{ itemId: "riot-shield", reason: "11.3.0 notes say from 4.25m; 11.0.0 said 3m → 4m", stat: "other:Lunge distance", version: "11.3.0" },
		{ itemId: "sledgehammer", reason: "11.0.0 melee rework redefined primary damage as base/precise hits", stat: "damage", version: "11.10.0" },
		{ itemId: "sword", reason: "11.0.0 melee rework redefined primary damage as base/precise hits", stat: "damage", version: "11.10.0" },
		{ itemId: "xp-54", reason: "6.9.0 damage 17 → 16; no 6.9.0 patch file in repo", stat: "damage", version: "11.10.0" },
	],
	items: {
		// src: thefinals.wiki/wiki/.50_Akimbo
		"50-akimbo": { damage: 46, "falloff-max-range": 39, "falloff-min-range": 32, "falloff-multiplier": 0.5, "fire-rate": 230, "headshot-multiplier": 2, "magazine-size": 14, "reload-time": 3 },
		// src: thefinals.wiki/wiki/93R — fire-rate is the between-bursts rate (1000 RPM within a burst)
		"93r": { damage: 24, "equip-time": 0.15, "falloff-max-range": 37.5, "falloff-min-range": 30, "falloff-multiplier": 0.5, "fire-rate": 210, "headshot-multiplier": 1.5, "magazine-size": 27, "reload-time": 1.75, "unequip-time": 0.15 },
		// src: thefinals.wiki/wiki/AKM
		akm: { damage: 21, "equip-time": 0.3, "falloff-max-range": 37.5, "falloff-min-range": 30, "falloff-multiplier": 0.55, "fire-rate": 600, "headshot-multiplier": 1.5, "magazine-size": 34, "reload-time": 2.35, "unequip-time": 0.2 },
		// src: thefinals.wiki/wiki/Anti-Gravity_Cube — radius is the wide field (7m tall)
		"anti-gravity-cube": { charges: 1, cooldown: 28, duration: 20, radius: 4 },
		// src: thefinals.wiki/wiki/APS_Turret
		"aps-turret": { cooldown: 30, radius: 3 },
		// src: thefinals.wiki/wiki/ARN-220 — magazine is per mag (dual 30×2)
		"arn-220": { damage: 17, "equip-time": 0.3, "falloff-max-range": 42.5, "falloff-min-range": 37.5, "falloff-multiplier": 0.72, "fire-rate": 750, "headshot-multiplier": 1.5, "magazine-size": 30, "reload-time": 2.7 },
		// src: thefinals.wiki/wiki/Barricade
		barricade: { charges: 2, cooldown: 30 },
		// src: thefinals.wiki/wiki/BFR_Titan
		"bfr-titan": { damage: 90, "falloff-max-range": 40, "falloff-min-range": 25, "falloff-multiplier": 0.7, "fire-rate": 71, "headshot-multiplier": 1.5, "magazine-size": 5, "reload-time": 4.75 },
		// src: thefinals.wiki/wiki/Breach_Charge
		"breach-charge": { charges: 3, cooldown: 20, damage: 80, radius: 2.5 },
		// src: thefinals.wiki/wiki/Breach_Drill (10.9.0: 20s → 15s)
		"breach-drill": { charges: 1, cooldown: 15 },
		// src: thefinals.wiki/wiki/C4 — radius is outer
		c4: { charges: 1, cooldown: 45, damage: 155, radius: 6.5 },
		// src: thefinals.wiki/wiki/CB-01_Repeater
		"cb-01-repeater": { damage: 84, "equip-time": 0.3, "falloff-max-range": 40, "falloff-min-range": 35, "falloff-multiplier": 0.64, "fire-rate": 78, "headshot-multiplier": 1.5, "magazine-size": 8, "reload-time": 4.95 },
		// src: thefinals.wiki/wiki/Cerberus_12GA — damage per pellet (×13)
		cerberus: { damage: 9, "equip-time": 0.3, "falloff-max-range": 20, "falloff-min-range": 10, "falloff-multiplier": 0.65, "fire-rate": 100, "magazine-size": 3, pellets: 13, "reload-time": 2.85 },
		// src: thefinals.wiki/wiki/Charge_'N'_Slam — damage is the initial hit, radius the ground slam
		"charge-n-slam": { cooldown: 12, damage: 100, duration: 3, radius: 4 },
		// src: thefinals.wiki/wiki/Chimera-XB
		"chimera-xb": { damage: 45, "falloff-max-range": 27.5, "falloff-min-range": 17.5, "falloff-multiplier": 0.53, "fire-rate": 260, "headshot-multiplier": 1.5, "magazine-size": 15, "reload-time": 2.15 },
		// src: thefinals.wiki/wiki/CL-40 — damage is direct hit
		"cl-40": { damage: 105, "fire-rate": 73, "magazine-size": 5, "reload-time": 4.75 },
		// src: patch 11.0.0 — duration is the minimum cloak duration
		"cloaking-device": { duration: 11 },
		// src: thefinals.wiki/wiki/Dagger — damage is base (glancing) primary; precise 70
		dagger: { damage: 49 },
		// src: thefinals.wiki/wiki/Data_Reshaper
		"data-reshaper": { charges: 2, cooldown: 26, range: 21 },
		// src: thefinals.wiki/wiki/Defibrillator
		defibrillator: { charges: 1, cooldown: 45, damage: 50 },
		// src: thefinals.wiki/wiki/Dematerializer
		dematerializer: { charges: 3, cooldown: 15, duration: 15 },
		// src: thefinals.wiki/wiki/Dome_Shield
		"dome-shield": { charges: 1, cooldown: 30, duration: 5.5, radius: 4 },
		// src: patch 11.0.0 — damage is base (glancing) per blade (×2); precise 57
		"dual-blades": { damage: 39 },
		// src: thefinals.wiki/wiki/Evasive_Dash
		"evasive-dash": { charges: 2, cooldown: 5 },
		// src: thefinals.wiki/wiki/Explosive_Mine
		"explosive-mine": { charges: 1, cooldown: 15, damage: 120, radius: 4.25 },
		// src: thefinals.wiki/wiki/FAMAS — fire-rate is the between-bursts rate (1080 RPM within a burst)
		famas: { damage: 24, "equip-time": 0.3, "falloff-max-range": 42.5, "falloff-min-range": 33.5, "falloff-multiplier": 0.5, "fire-rate": 220, "headshot-multiplier": 1.5, "magazine-size": 27, "reload-time": 2.4, "unequip-time": 0.2 },
		// src: thefinals.wiki/wiki/FCAR
		fcar: { damage: 23, "equip-time": 0.3, "falloff-max-range": 40, "falloff-min-range": 35, "falloff-multiplier": 0.55, "fire-rate": 530, "headshot-multiplier": 1.5, "magazine-size": 25, "reload-time": 2.1, "unequip-time": 0.2 },
		// src: thefinals.wiki/wiki/Flamethrower — damage is per hit (plus 15.75/s burn)
		flamethrower: { damage: 30, "falloff-max-range": 7.4, "falloff-min-range": 7.4, "falloff-multiplier": 0, "fire-rate": 170, "magazine-size": 30, "reload-time": 3.55 },
		// src: thefinals.wiki/wiki/Flashbang
		flashbang: { charges: 2, cooldown: 18, duration: 4.5 },
		// src: thefinals.wiki/wiki/Frag_Grenade — radius is outer
		"frag-grenade": { charges: 1, cooldown: 20, damage: 140, radius: 5.5 },
		// src: thefinals.wiki/wiki/Gas_Grenade
		"gas-grenade": { charges: 1, cooldown: 24, duration: 12, radius: 5 },
		// src: thefinals.wiki/wiki/Gas_Mine — damage is the trigger hit
		"gas-mine": { charges: 2, cooldown: 27, damage: 30, duration: 10 },
		// src: thefinals.wiki/wiki/Gateway
		gateway: { charges: 2, cooldown: 40, duration: 20, range: 50 },
		// src: thefinals.wiki/wiki/Glitch_Grenade
		"glitch-grenade": { charges: 2, cooldown: 25, duration: 5 },
		// src: thefinals.wiki/wiki/Glitch_Trap
		"glitch-trap": { charges: 1, cooldown: 20 },
		// src: thefinals.wiki/wiki/Goo_Grenade
		"goo-grenade": { charges: 2, cooldown: 30 },
		// src: thefinals.wiki/wiki/Grappling_Hook
		"grappling-hook": { charges: 1, cooldown: 6, range: 25 },
		// src: thefinals.wiki/wiki/Gravity_Vortex — duration is the maximum
		"gravity-vortex": { charges: 1, cooldown: 20, duration: 10 },
		// src: thefinals.wiki/wiki/Guardian_Turret — damage per bullet
		"guardian-turret": { cooldown: 35, damage: 6, range: 20 },
		// src: thefinals.wiki/wiki/Healing_Beam
		"healing-beam": { range: 10 },
		// src: thefinals.wiki/wiki/Healing_Emitter
		"healing-emitter": { charges: 1, cooldown: 30, radius: 4 },
		// src: thefinals.wiki/wiki/Builds + packages/roulette contestants
		"heavy-contestant": { health: 350 },
		// src: thefinals.wiki/wiki/Hover_Pad
		"hover-pad": { charges: 1, cooldown: 11 },
		// src: thefinals.wiki/wiki/Jump_Pad
		"jump-pad": { charges: 1, cooldown: 40 },
		// src: thefinals.wiki/wiki/KS-23
		"ks-23": { damage: 104, "equip-time": 0.3, "falloff-max-range": 22, "falloff-min-range": 12, "falloff-multiplier": 0.58, "fire-rate": 78, "magazine-size": 6, "reload-time": 4.36 },
		// src: thefinals.wiki/wiki/Lewis_Gun
		"lewis-gun": { damage: 23, "equip-time": 0.35, "falloff-max-range": 40, "falloff-min-range": 35, "falloff-multiplier": 0.67, "fire-rate": 500, "headshot-multiplier": 1.5, "magazine-size": 47, "reload-time": 3.55, "unequip-time": 0.25 },
		// src: thefinals.wiki/wiki/LH1
		lh1: { damage: 44, "equip-time": 0.3, "falloff-max-range": 55, "falloff-min-range": 50, "falloff-multiplier": 0.75, "fire-rate": 270, "headshot-multiplier": 2, "magazine-size": 15, "reload-time": 2.85, "unequip-time": 0.2 },
		// src: packages/roulette contestants
		"light-contestant": { health: 150 },
		// src: thefinals.wiki/wiki/Lockbolt — range is the pull distance
		"lockbolt-launcher": { charges: 1, cooldown: 30, damage: 5, duration: 7, range: 6 },
		// src: thefinals.wiki/wiki/M11
		m11: { damage: 16, "falloff-max-range": 20, "falloff-min-range": 10, "falloff-multiplier": 0.45, "fire-rate": 1000, "headshot-multiplier": 1.5, "magazine-size": 40, "reload-time": 1.85 },
		// src: thefinals.wiki/wiki/M134_Minigun
		"m134-minigun": { damage: 11, "falloff-max-range": 50, "falloff-min-range": 30, "falloff-multiplier": 0.4, "fire-rate": 1500, "headshot-multiplier": 1.33, "magazine-size": 300, "reload-time": 5.25, "unequip-time": 0.25 },
		// src: thefinals.wiki/wiki/M26_Matter — damage per pellet (×11)
		"m26-matter": { damage: 11, "falloff-max-range": 25, "falloff-min-range": 15, "falloff-multiplier": 0.65, "fire-rate": 84, "magazine-size": 8, pellets: 11, "reload-time": 2.45 },
		// src: thefinals.wiki/wiki/MGL32 — damage is direct hit
		m32gl: { damage: 83, "fire-rate": 90, "magazine-size": 6, "reload-time": 3.1 },
		// src: thefinals.wiki/wiki/M60
		m60: { damage: 20, "falloff-max-range": 35, "falloff-min-range": 25, "falloff-multiplier": 0.5, "fire-rate": 580, "headshot-multiplier": 1.5, "magazine-size": 70, "reload-time": 3.55 },
		// src: packages/roulette contestants
		"medium-contestant": { health: 250 },
		// src: thefinals.wiki/wiki/Model_1887 — damage per pellet (×9)
		"model-1887": { damage: 13, "equip-time": 0.3, "falloff-max-range": 30, "falloff-min-range": 20, "falloff-multiplier": 0.65, "fire-rate": 72, "magazine-size": 7, pellets: 9, "reload-time": 4.4, "unequip-time": 0.2 },
		// src: thefinals.wiki/wiki/P90
		p90: { damage: 14, "falloff-max-range": 24, "falloff-min-range": 18, "falloff-multiplier": 0.62, "fire-rate": 900, "headshot-multiplier": 1.5, "magazine-size": 50, "reload-time": 2.6 },
		// src: thefinals.wiki/wiki/Pike-556
		"pike-556": { damage: 49, "equip-time": 0.3, "falloff-max-range": 50, "falloff-min-range": 40, "falloff-multiplier": 0.8, "fire-rate": 200, "headshot-multiplier": 1.75, "magazine-size": 12, "reload-time": 3.25 },
		// src: thefinals.wiki/wiki/Proximity_Sensor
		"proximity-sensor": { charges: 2, cooldown: 20, radius: 11 },
		// src: thefinals.wiki/wiki/Pyro_Grenade
		"pyro-grenade": { charges: 1, cooldown: 24, duration: 12 },
		// src: thefinals.wiki/wiki/Pyro_Mine — damage is the explosion
		"pyro-mine": { charges: 2, cooldown: 27, damage: 55, duration: 10 },
		// src: thefinals.wiki/wiki/R_.357
		"r-357": { damage: 74, "falloff-max-range": 44, "falloff-min-range": 27.5, "falloff-multiplier": 0.4, "fire-rate": 140, "headshot-multiplier": 2, "magazine-size": 6, "reload-time": 2.5 },
		// src: thefinals.wiki/wiki/Recurve_Bow — damage at max draw (60 min); fire-rate per patch 9.4.0 (wiki infobox says 78)
		"recurve-bow": { damage: 126, "fire-rate": 103, "headshot-multiplier": 1.5 },
		// src: thefinals.wiki/wiki/Riot_Shield — damage is base (glancing) primary; precise 86
		"riot-shield": { damage: 60 },
		// src: thefinals.wiki/wiki/RPG-7 — radius is outer
		"rpg-7": { charges: 1, cooldown: 45, damage: 110, radius: 5.5 },
		// src: thefinals.wiki/wiki/SA1216 — damage per pellet (×12); magazine 4×4
		sa1216: { damage: 6, "equip-time": 0.3, "falloff-max-range": 20, "falloff-min-range": 12.5, "falloff-multiplier": 0.62, "fire-rate": 190, "magazine-size": 16, pellets: 12, "reload-time": 3.25, "unequip-time": 0.2 },
		// src: thefinals.wiki/wiki/SH1900 — damage per pellet (×15)
		sh1900: { damage: 12, "equip-time": 0.2, "falloff-max-range": 15, "falloff-min-range": 10, "falloff-multiplier": 0.62, "fire-rate": 80, "magazine-size": 2, pellets: 15, "reload-time": 2.6, "unequip-time": 0.2 },
		// src: thefinals.wiki/wiki/ShAK-50 — damage per projectile (×2 per shot)
		"shak-50": { damage: 15, "equip-time": 0.3, "falloff-max-range": 25, "falloff-min-range": 15, "falloff-multiplier": 0.65, "fire-rate": 420, "headshot-multiplier": 1.5, "magazine-size": 20, pellets: 2, "reload-time": 3.2 },
		// src: thefinals.wiki/wiki/Shockwave — duration is the glitch effect (11.7.0)
		shockwave: { charges: 2, cooldown: 12, duration: 2 },
		// src: thefinals.wiki/wiki/Sledgehammer — damage is base (glancing) primary; precise 120
		sledgehammer: { damage: 90 },
		// src: thefinals.wiki/wiki/Smoke_Grenade
		"smoke-grenade": { charges: 2, cooldown: 50, duration: 9 },
		// src: thefinals.wiki/wiki/Sonar_Grenade
		"sonar-grenade": { charges: 2, cooldown: 34, duration: 5.25, radius: 12 },
		// src: thefinals.wiki/wiki/Spear — damage is base (glancing) primary; precise 82
		spear: { damage: 57 },
		// src: thefinals.wiki/wiki/SR-84
		"sr-84": { damage: 118, "equip-time": 0.3, "falloff-max-range": 100, "falloff-min-range": 80, "falloff-multiplier": 0.75, "fire-rate": 45, "headshot-multiplier": 2, "magazine-size": 6, "reload-time": 3.35, "unequip-time": 0.2 },
		// src: thefinals.wiki/wiki/Nullifier (Stun Gun page redirects there)
		"stun-gun": { charges: 1, cooldown: 18, duration: 3.75, range: 16 },
		// src: patch 11.0.0 — damage is base (glancing) primary; precise 110 (wiki infobox says 71.5)
		sword: { damage: 71 },
		// src: thefinals.wiki/wiki/Thermal_Bore — radius is outer
		"thermal-bore": { charges: 2, cooldown: 25, damage: 25, radius: 3 },
		// src: thefinals.wiki/wiki/Thermal_Vision
		"thermal-vision": { charges: 1, cooldown: 10, duration: 20 },
		// src: thefinals.wiki/wiki/Throwing_Knives — damage is primary throw (secondary 140)
		"throwing-knives": { damage: 60, "headshot-multiplier": 1.5 },
		// src: thefinals.wiki/wiki/Tracking_Dart
		"tracking-dart": { charges: 4, cooldown: 12, damage: 5, duration: 13 },
		// src: thefinals.wiki/wiki/V9S
		v9s: { damage: 38, "falloff-max-range": 20, "falloff-min-range": 15, "falloff-multiplier": 0.65, "fire-rate": 360, "headshot-multiplier": 1.5, "magazine-size": 18, "reload-time": 1.5 },
		// src: thefinals.wiki/wiki/Vanishing_Bomb — duration is self (teammates 6.5s)
		"vanishing-bomb": { charges: 1, cooldown: 25, duration: 5, radius: 4 },
		// src: thefinals.wiki/wiki/Winch_Claw
		"winch-claw": { damage: 5, range: 12 },
		// src: thefinals.wiki/wiki/XP-54 (6.9.0: damage 17 → 16)
		"xp-54": { damage: 16, "equip-time": 0.2, "falloff-max-range": 32.5, "falloff-min-range": 22.5, "falloff-multiplier": 0.52, "fire-rate": 880, "headshot-multiplier": 1.5, "magazine-size": 36, "reload-time": 2.5, "unequip-time": 0.2 },
		// src: thefinals.wiki/wiki/Zipline; range is max placement distance (patch 11.9.0)
		zipline: { charges: 1, cooldown: 30, range: 50 },
	},
};

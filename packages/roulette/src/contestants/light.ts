import type { ContestantClass, ContestantSpecialization, ContestantWeapon } from "@repo/schema/roulette";

export const lightClass: ContestantClass = {
	description: "Fast and agile contestant specializing in mobility, stealth, and being an annoying little shit.",
	healthPoints: 150,
	id: "light-contestant",
	imageUrl: "/images/contestants/light.png",
	label: "Light",
	regenerationSeconds: 7,
	type: "light",
};

export const lightWeapons: ContestantWeapon[] = [
	{
		classType: "light",
		description: "A burst-fire machine pistol designed to deal burst damage at close-to-moderate distances.",
		id: "93r",
		imageUrl: "/images/weapons/93r.png",
		label: "93R",
		type: "handgun",
	},
	{
		classType: "light",
		description: "The backstab is so good that sometimes it can MAYBE backstab you from the front.",
		id: "dagger",
		imageUrl: "/images/weapons/dagger.png",
		label: "Dagger",
		type: "melee",
	},
	{
		classType: "light",
		description:
			"A marksman rifle designed to deal high damage per shot and very high critical damage. Currently the weapon of choice for cheaters.",
		id: "lh1",
		imageUrl: "/images/weapons/lh1.png",
		label: "LH1",
		type: "marksman-rifle",
	},
	{
		classType: "light",
		description:
			"The only audio you will hear is the rapid fire *pfbt* sounds while you are being shredded and inevitably die.",
		id: "m11",
		imageUrl: "/images/weapons/m11.png",
		label: "M11",
		type: "smg",
	},
	{
		classType: "light",
		description: "A bolt-action shotgun that is magazine-fed, designed to deal high damage at close range.",
		id: "m26-matter",
		imageUrl: "/images/weapons/m26-matter.png",
		label: "M26 Matter",
		type: "shotgun",
	},
	{
		classType: "light",
		description: "Lights who can use this, use it really well. Everyone else just cannot.",
		id: "recurve-bow",
		imageUrl: "/images/weapons/recurve-bow.png",
		label: "Recurve Bow",
		type: "marksman-rifle",
	},
	{
		classType: "light",
		description: "A sawed-off double barrel shotgun designed to instantly two-tap other lights.",
		id: "sh1900",
		imageUrl: "/images/weapons/sh1900.png",
		label: "SH1900",
		type: "shotgun",
	},
	{
		classType: "light",
		description:
			"Sniper rifle designed for lights who want to stay away from the action. Killing one earns a friendly bagging.",
		id: "sr-84",
		imageUrl: "/images/weapons/sr-84.png",
		label: "SR-84",
		type: "marksman-rifle",
	},
	{
		classType: "light",
		description: "Who the fuck put swords in this game? Skill-less waste of a loadout only used by real dinguses.",
		id: "sword",
		imageUrl: "/images/weapons/sword.png",
		label: "Sword",
		type: "melee",
	},
	{
		classType: "light",
		description: "Pew pew pew pew secret agent man.",
		id: "v9s",
		imageUrl: "/images/weapons/v9s.png",
		label: "V9S",
		type: "handgun",
	},
	{
		classType: "light",
		description: "A submachine gun designed to deal high damage over short windows at close to moderate distances.",
		id: "xp-54",
		imageUrl: "/images/weapons/xp-54.png",
		label: "XP-54",
		type: "smg",
	},
	{
		classType: "light",
		description: "Sharp spoons. Clangs every time they miss a shot. Clangs constantly.",
		id: "throwing-knives",
		imageUrl: "/images/weapons/throwing-knives.png",
		label: "Throwing Knives",
		type: "melee",
	},
	{
		classType: "light",
		description: "Mid-range, fast fire-rate machine gun. Get beamed by lights from further away.",
		id: "arn-220",
		imageUrl: "/images/weapons/arn-220.png",
		label: "ARN-220",
		type: "smg",
	},
];

export const lightSpecializations: ContestantSpecialization[] = [
	{
		classType: "light",
		description:
			"Allows the light to enter invisibility for a limited duration. Inspires a minimum of one Reddit post per hour.",
		id: "cloaking-device",
		imageUrl: "/images/specializations/cloaking-device.png",
		label: "Cloaking Device",
	},
	{
		classType: "light",
		description: "Allows the lights to dash rapidly in any direction. Lives rent-free in u/all-lights-must-die's head.",
		id: "evasive-dash",
		imageUrl: "/images/specializations/evasive-dash.png",
		label: "Evasive Dash",
	},
	{
		classType: "light",
		description: "You can be Spider-Man in the game. Zoom zoom, mother fucker.",
		id: "grappling-hook",
		imageUrl: "/images/specializations/grappling-hook.png",
		label: "Grappling Hook",
	},
];

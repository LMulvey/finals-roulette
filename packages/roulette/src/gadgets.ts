import type { ContestantGadget } from "@repo/schema/roulette";

export const ALL_GADGETS: ContestantGadget[] = [
	{
		classType: ["light"],
		description: "A lower-powered version of C4.",
		id: "breach-charge",
		imageUrl: "/images/gadgets/breach-charge.webp",
		label: "Breach Charge",
	},
	{
		classType: ["light"],
		description: "A throwable two-way portal for contestants and other throwables.",
		id: "gateway",
		imageUrl: "/images/gadgets/gateway.webp",
		label: "Gateway",
	},
	{
		classType: ["light"],
		description: "A throwable for temporarily disabling gadgets and specializations within vicinity.",
		id: "glitch-grenade",
		imageUrl: "/images/gadgets/glitch-grenade.webp",
		label: "Glitch Grenade",
	},
	{
		classType: ["light"],
		description: "Creates a small vortex that sucks all contestants and items towards it for a brief duration.",
		id: "gravity-vortex",
		imageUrl: "/images/gadgets/gravity-vortex.webp",
		label: "Gravity Vortex",
	},
	{
		classType: ["light"],
		description: "A grenade that pings every few seconds and detects/marks enemy contestants.",
		id: "sonar-grenade",
		imageUrl: "/images/gadgets/sonar-grenade.webp",
		label: "Sonar Grenade",
	},
	{
		classType: ["light"],
		description: "Don't null me, bro.",
		id: "stun-gun",
		imageUrl: "/images/gadgets/stun-gun.webp",
		label: "Nullifier",
	},
	{
		classType: ["light"],
		description: "Make walls go boom, but from far away.",
		id: "thermal-bore",
		imageUrl: "/images/gadgets/thermal-bore.webp",
		label: "Thermal Bore",
	},
	{
		classType: ["light"],
		description:
			"Formerly a specialization, this gadget allows the user to easily identify other contestants for a short duration.",
		disabled: true,
		id: "thermal-vision",
		imageUrl: "/images/gadgets/thermal-vision.webp",
		label: "Thermal Vision",
	},
	{
		classType: ["light"],
		description:
			"Fires a small tracking dart that sticks into other contestants and marks their locations for your team for a short duration.",
		id: "tracking-dart",
		imageUrl: "/images/gadgets/tracking-dart.webp",
		label: "Tracking Dart",
	},
	{
		classType: ["light"],
		description:
			"A throwable that makes all friendly contestants within the area-of-effect invisible for a short duration.",
		id: "vanishing-bomb",
		imageUrl: "/images/gadgets/vanishing-bomb.webp",
		label: "Vanishing Bomb",
	},
	{
		classType: ["medium"],
		description: "A deployable that destroys incoming projectiles but takes damage every time.",
		id: "aps-turret",
		imageUrl: "/images/gadgets/aps-turret.webp",
		label: "APS Turret",
	},
	{
		classType: ["medium"],
		description: "Make that turret DISAPPEAR!",
		id: "data-reshaper",
		imageUrl: "/images/gadgets/data-reshaper.webp",
		label: "Data Reshaper",
	},
	{
		classType: ["medium"],
		description:
			"Revive teammates in the middle of the action. Use text chat to cuss them out when they die immediately, again.",
		id: "defibrillator",
		imageUrl: "/images/gadgets/defibrillator.webp",
		label: "Defibrillator",
	},
	{
		classType: ["medium", "heavy"],
		description:
			"A deployable mine that arms 1.5 seconds after landing on a flat surface and detonates via proximity or other explosions.",
		id: "explosive-mine",
		imageUrl: "/images/gadgets/explosive-mine.webp",
		label: "Explosive Mine",
	},
	{
		classType: ["medium"],
		description:
			"A deployable gas mine that arms 1.5 seconds after landing on a flat surface and detonates via proximity or other explosions.",
		id: "gas-mine",
		imageUrl: "/images/gadgets/gas-mine.webp",
		label: "Gas Mine",
	},
	{
		classType: ["medium"],
		description:
			"A deployable mine-like item that causes the glitch effect to any enemy contestants with a line of sight to it.",
		id: "glitch-trap",
		imageUrl: "/images/gadgets/glitch-trap.webp",
		label: "Glitch Trap",
	},
	{
		classType: ["medium"],
		description:
			"A deployable arena jump pad to help you boing your way to new heights. Once deployed, anyone can use it.",
		id: "jump-pad",
		imageUrl: "/images/gadgets/jump-pad.webp",
		label: "Jump Pad",
	},
	{
		classType: ["medium"],
		description: "A deployable hovering platform that creates temporary high ground and traversal options.",
		id: "hover-pad",
		imageUrl: "/images/gadgets/hover-pad.webp",
		label: "Hover Pad",
	},
	{
		classType: ["medium"],
		description: "A deployable arena zipline. Sponsored by Zipline 'N Co. Once deployed, anyone can use it.",
		id: "zipline",
		imageUrl: "/images/gadgets/zipline.webp",
		label: "Zipline",
	},
	{
		classType: ["medium", "heavy"],
		description: "A deployable object that pings and tracks nearby opponents through walls within range.",
		id: "proximity-sensor",
		imageUrl: "/images/gadgets/proximity-sensor.webp",
		label: "Proximity Sensor",
	},
	{
		classType: ["heavy"],
		description:
			"A deployable that removes gravity within a circle area-of-effect and causes items nearby to float upward for a time.",
		id: "anti-gravity-cube",
		imageUrl: "/images/gadgets/anti-gravity-cube.webp",
		label: "Anti-Gravity Cube",
	},
	{
		classType: ["heavy"],
		description:
			"Metal barricade that blocks gunfire, but allows things like the fire and the spear to pass through for some reason.",
		id: "barricade",
		imageUrl: "/images/gadgets/barricade.webp",
		label: "Barricade",
	},
	{
		classType: ["heavy"],
		description: "C4 go boom.",
		id: "c4",
		imageUrl: "/images/gadgets/c4.webp",
		label: "C4",
	},
	{
		classType: ["heavy"],
		description: "A deployable dome shield that used to be more useful but its duration was recently heavily nerfed.",
		id: "dome-shield",
		imageUrl: "/images/gadgets/dome-shield.webp",
		label: "Dome Shield",
	},
	{
		classType: ["heavy"],
		description: "It's like a leash and contestants can drag it around.",
		id: "lockbolt-launcher",
		imageUrl: "/images/gadgets/lockbolt-launcher.webp",
		label: "Lockbolt Launcher",
	},
	{
		classType: ["heavy"],
		description:
			"A deployable fire mine that arms 1.5 seconds after landing on a flat surface and detonates via proximity or other explosions.",
		id: "pyro-mine",
		imageUrl: "/images/gadgets/pyro-mine.webp",
		label: "Pyro Mine",
	},
	{
		classType: ["heavy"],
		description:
			"Shoots a hilariously weak projectile that does little physical damage and even less environmental/structure damage.",
		id: "rpg-7",
		imageUrl: "/images/gadgets/rpg-7.webp",
		label: "RPG-7",
	},
	{
		classType: ["light", "medium", "heavy"],
		description: "Use these on your teammates to be an annoying little gremlin.",
		id: "flashbang",
		imageUrl: "/images/gadgets/flashbang.webp",
		label: "Flashbang",
	},
	{
		classType: ["light", "medium", "heavy"],
		description: "Explodes a few seconds after throwing. Cannot be cooked. If it lands at your feet, you are cooked.",
		id: "frag-grenade",
		imageUrl: "/images/gadgets/frag-grenade.webp",
		label: "Frag Grenade",
	},
	{
		classType: ["light", "medium", "heavy"],
		description:
			"A throwable that creates a stinky gas cloud in the area in which it detonates. It can be put out with fire.",
		id: "gas-grenade",
		imageUrl: "/images/gadgets/gas-grenade.webp",
		label: "Gas Grenade",
	},
	{
		classType: ["light", "medium", "heavy"],
		description:
			"A throwable that creates a wall of goo in a random direction upon opening – never in the place that you want or need it.",
		id: "goo-grenade",
		imageUrl: "/images/gadgets/goo-grenade.webp",
		label: "Goo Grenade",
	},
	{
		classType: ["light", "medium", "heavy"],
		description: "BURN, BABY, BURN!",
		id: "pyro-grenade",
		imageUrl: "/images/gadgets/pyro-grenade.webp",
		label: "Pyro Grenade",
	},
	{
		classType: ["light", "medium", "heavy"],
		description: "Masks contestant outlines. Lags old computers.",
		id: "smoke-grenade",
		imageUrl: "/images/gadgets/smoke-grenade.webp",
		label: "Smoke Grenade",
	},
	{
		classType: ["light"],
		description: "Spam-heal fellow contestants with perfect aim.",
		id: "h-plus-infuser",
		imageUrl: "/images/gadgets/h-plus-infuser.webp",
		label: "H+ Infuser",
	},
	{
		classType: ["heavy"],
		description: "A deployable ball named Chuck that heals you",
		id: "healing-emitter",
		imageUrl: "/images/gadgets/healing-emitter.webp",
		label: "Healing Emitter",
	},
	{
		classType: ["medium"],
		description: "Bores through walls, then makes them go boom.",
		id: "breach-drill",
		imageUrl: "/images/gadgets/breach-drill.webp",
		label: "Breach Drill",
	},
];

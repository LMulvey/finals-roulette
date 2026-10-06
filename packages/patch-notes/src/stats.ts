export type StatDefinition = {
	label: string;
	/** Cooldowns, equip/reload times etc. — a decrease is a buff. */
	lowerIsBetter: boolean;
	unit: string;
};

// A stat earns a key only once two or more items use it; anything rarer is recorded as `other`.
export const STAT_DEFINITIONS = {
	charges: { label: "Charges", lowerIsBetter: false, unit: "" },
	cooldown: { label: "Cooldown", lowerIsBetter: true, unit: "s" },
	damage: { label: "Damage", lowerIsBetter: false, unit: "" },
	duration: { label: "Duration", lowerIsBetter: false, unit: "s" },
	"environmental-damage": { label: "Env. damage", lowerIsBetter: false, unit: "" },
	"equip-time": { label: "Equip time", lowerIsBetter: true, unit: "s" },
	"falloff-max-range": { label: "Falloff end", lowerIsBetter: false, unit: "m" },
	"falloff-min-range": { label: "Falloff start", lowerIsBetter: false, unit: "m" },
	"falloff-multiplier": { label: "Falloff mult.", lowerIsBetter: false, unit: "×" },
	"fire-rate": { label: "Fire rate", lowerIsBetter: false, unit: "RPM" },
	"headshot-multiplier": { label: "Headshot mult.", lowerIsBetter: false, unit: "×" },
	health: { label: "Health", lowerIsBetter: false, unit: "HP" },
	"magazine-size": { label: "Magazine", lowerIsBetter: false, unit: "" },
	pellets: { label: "Pellets", lowerIsBetter: false, unit: "" },
	radius: { label: "Radius", lowerIsBetter: false, unit: "m" },
	range: { label: "Range", lowerIsBetter: false, unit: "m" },
	"reload-time": { label: "Reload", lowerIsBetter: true, unit: "s" },
	/** Derived: damage × pellets at each patch. Never recorded in `changes` or the baseline. */
	"total-damage": { label: "Total damage", lowerIsBetter: false, unit: "" },
	"unequip-time": { label: "Unequip time", lowerIsBetter: true, unit: "s" },
} as const satisfies Record<string, StatDefinition>;

export type StatKey = keyof typeof STAT_DEFINITIONS;

/** Display order: headline stats first, handling and utility after. */
export const STAT_DISPLAY_ORDER: StatKey[] = [
	"health",
	"total-damage",
	"damage",
	"pellets",
	"fire-rate",
	"headshot-multiplier",
	"magazine-size",
	"falloff-min-range",
	"falloff-max-range",
	"falloff-multiplier",
	"environmental-damage",
	"cooldown",
	"charges",
	"duration",
	"radius",
	"range",
	"reload-time",
	"equip-time",
	"unequip-time",
];

/** Computed from other stats; scrapes and the baseline must not record these. */
export const DERIVED_STAT_KEYS: readonly StatKey[] = ["total-damage"];

export const isStatKey = (value: string): value is StatKey => Object.hasOwn(STAT_DEFINITIONS, value);

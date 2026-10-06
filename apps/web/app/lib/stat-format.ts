import { STAT_DEFINITIONS, type StatKey } from "@repo/patch-notes/stats";

export const formatNumber = (value: number) =>
	Number.isInteger(value)
		? String(value)
		: String(Number.parseFloat(value.toFixed(3)));

export const formatStatValue = (value: number, unit = "") => {
	const number = formatNumber(value);
	if (!unit) return number;
	if (unit === "×") return `×${number}`;
	if (unit === "s" || unit === "m" || unit === "%" || unit === "°")
		return `${number}${unit}`;
	return `${number} ${unit}`;
};

/** Sign of a change in "better/worse" terms for the stat, so a shorter cooldown reads as a buff. */
export const changeDirection = (stat: StatKey, from: number, to: number) => {
	if (to === from) return null;
	const increased = to > from;
	return increased !== STAT_DEFINITIONS[stat].lowerIsBetter ? "buff" : "nerf";
};

export const formatPatchDate = (date: Date) =>
	date.toLocaleDateString(undefined, {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

export const patchHref = (version: string) =>
	`/patches/${version.replaceAll(".", "")}`;

/** DOM id of a patch's entry in the history sheet timeline. */
export const timelineEntryId = (version: string) =>
	`history-${version.replaceAll(".", "-")}`;

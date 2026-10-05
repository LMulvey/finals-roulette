import type { PatchNote } from "@repo/patch-notes/types";

type Counts = Record<PatchNote["adjustmentType"], number>;

export const countAdjustments = (notes: PatchNote[]) =>
	notes.reduce(
		(counts, note) => {
			counts[note.adjustmentType] += 1;
			return counts;
		},
		{ addition: 0, buff: 0, nerf: 0, neutral: 0, removal: 0 } as Record<
			PatchNote["adjustmentType"],
			number
		>,
	);

const SEGMENTS: Array<{
	className: string;
	key: PatchNote["adjustmentType"];
	label: string;
}> = [
	{ className: "bg-added", key: "addition", label: "new" },
	{ className: "bg-buff", key: "buff", label: "buffs" },
	{ className: "bg-nerf", key: "nerf", label: "nerfs" },
	{ className: "bg-nerf", key: "removal", label: "removed" },
	{ className: "bg-tweak", key: "neutral", label: "tweaks" },
];

/** Compact scoreboard of a patch: one coloured pip + count per adjustment type. */
export const PatchTally = ({ counts }: { readonly counts: Counts }) => {
	const visible = SEGMENTS.filter(({ key }) => counts[key] > 0);

	if (!visible.length) {
		return <span className="text-xs text-ink-ghost">No equipment changes</span>;
	}

	return (
		<ul className="flex items-center gap-3 text-xs text-ink-faint">
			{visible.map(({ className, key, label }) => (
				<li className="flex items-center gap-1.5" key={key}>
					<span aria-hidden className={`h-2.5 w-1 -skew-x-12 ${className}`} />
					<span className="font-semibold tabular-nums text-ink-soft">
						{counts[key]}
					</span>
					{label}
				</li>
			))}
		</ul>
	);
};

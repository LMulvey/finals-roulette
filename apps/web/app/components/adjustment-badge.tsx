"use client";

import {
	ArrowFatDownIcon,
	ArrowFatUpIcon,
	ArrowSquareOutIcon,
	MinusIcon,
	PlusIcon,
	XCircleIcon,
} from "@phosphor-icons/react";
import { maybeGetRecentAdjustmentForTarget } from "@repo/patch-notes/patches";
import type { PatchNote } from "@repo/patch-notes/types";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@repo/ui/tooltip";
import Link from "next/link";
import { cn, cvu } from "@/lib/cvu";

type AdjustmentType = PatchNote["adjustmentType"];

export const ADJUSTMENT_LABEL: Record<AdjustmentType, string> = {
	addition: "New",
	buff: "Buffed",
	nerf: "Nerfed",
	neutral: "Tweaked",
	removal: "Removed",
};

export const adjustmentTone = cvu("", {
	variants: {
		type: {
			addition: ["bg-added-soft text-added"],
			buff: ["bg-buff-soft text-buff"],
			nerf: ["bg-nerf-soft text-nerf"],
			neutral: ["bg-tweak-soft text-tweak"],
			removal: ["bg-nerf-soft text-nerf"],
		},
	},
});

export const AdjustmentIcon = ({
	size = 14,
	type,
}: {
	readonly size?: number;
	readonly type: AdjustmentType;
}) => {
	switch (type) {
		case "addition":
			return <PlusIcon size={size} weight="bold" />;
		case "buff":
			return <ArrowFatUpIcon size={size} weight="fill" />;
		case "nerf":
			return <ArrowFatDownIcon size={size} weight="fill" />;
		case "removal":
			return <XCircleIcon size={size} weight="fill" />;
		default:
			return <MinusIcon size={size} weight="bold" />;
	}
};

/** Skewed broadcast tag showing an item's most recent balance change, with patch details on hover/tap. */
export const AdjustmentBadge = ({
	className,
	targetId,
}: {
	readonly className?: string;
	readonly targetId: string;
}) => {
	const adjustment = maybeGetRecentAdjustmentForTarget(targetId);

	if (!adjustment) {
		return null;
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					aria-label={`${ADJUSTMENT_LABEL[adjustment.adjustmentType]} in ${adjustment.patchVersion}`}
					className={cn(
						"tag relative z-10 text-xs",
						adjustmentTone({ type: adjustment.adjustmentType }),
						className,
					)}
				>
					<span className="flex items-center gap-1">
						<AdjustmentIcon size={12} type={adjustment.adjustmentType} />
						{ADJUSTMENT_LABEL[adjustment.adjustmentType]}
					</span>
				</TooltipTrigger>
				<TooltipContent className="w-72 space-y-2 p-3" side="bottom">
					<div className="flex items-center justify-between gap-2">
						<p className="eyebrow">
							{ADJUSTMENT_LABEL[adjustment.adjustmentType]} ·{" "}
							{adjustment.patchVersion}
						</p>
						<Link
							className="flex items-center gap-1 text-xs font-semibold text-cashout hover:text-cashout-hover"
							href={adjustment.patchUrl}
						>
							Patch notes <ArrowSquareOutIcon size={12} />
						</Link>
					</div>
					<p className="text-sm leading-snug text-ink">{adjustment.note}</p>
					{adjustment.sassyNotes ? (
						<p className="text-xs italic text-cashout">
							{adjustment.sassyNotes}
						</p>
					) : null}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

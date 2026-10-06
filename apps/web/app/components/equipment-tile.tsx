"use client";

import { CheckIcon, ProhibitIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/cvu";
import { type EquipmentItem, getEquipmentMeta } from "@/lib/equipment";
import { AdjustmentBadge } from "./adjustment-badge";
import { EquipmentHistorySheet } from "./equipment-history-sheet";

type EquipmentTileProps = {
	readonly className?: string;
	/** Item is excluded from rolls (by the user, or by Embark). */
	readonly excluded?: boolean;
	readonly item: EquipmentItem;
	/** Renders the tile as a toggle (Settings). `excluded` is the pressed-off state. */
	readonly onToggle?: () => void;
	readonly showDescription?: boolean;
};

export const EquipmentTile = ({
	className,
	excluded,
	item,
	onToggle,
	showDescription,
}: EquipmentTileProps) => {
	const body = (
		<>
			<span className="notch notch-sm spotlight flex size-14 shrink-0 items-center justify-center">
				{item.imageUrl ? (
					// biome-ignore lint/performance/noImgElement: static equipment renders
					<img
						alt=""
						className={cn(
							"equipment-render size-11 object-contain transition-opacity",
							excluded && "opacity-30 grayscale",
						)}
						draggable={false}
						loading="lazy"
						src={item.imageUrl}
					/>
				) : null}
			</span>
			<span className="min-w-0 grow">
				<span
					className={cn(
						"block truncate font-heading text-xl font-extrabold uppercase italic leading-tight",
						excluded
							? "text-ink-faint line-through decoration-2 decoration-nerf/70"
							: "text-ink",
					)}
				>
					{item.label}
				</span>
				<span className="block truncate text-xs text-ink-faint">
					{getEquipmentMeta(item)}
				</span>
				{showDescription ? (
					<span className="mt-1 line-clamp-2 text-xs leading-snug text-ink-soft">
						{item.description}
					</span>
				) : null}
			</span>
		</>
	);

	if (onToggle) {
		return (
			<button
				aria-pressed={!excluded}
				className={cn(
					"notch press flex w-full items-center gap-3 bg-arena-raised p-2 pr-3 text-left transition-colors hover:bg-arena-high",
					className,
				)}
				onClick={onToggle}
				type="button"
			>
				{body}
				<span
					aria-hidden
					className={cn(
						"flex size-6 shrink-0 items-center justify-center rounded-sm transition-colors",
						excluded ? "bg-nerf-soft text-nerf" : "bg-buff-soft text-buff",
					)}
				>
					{excluded ? (
						<ProhibitIcon size={14} weight="bold" />
					) : (
						<CheckIcon size={14} weight="bold" />
					)}
				</span>
			</button>
		);
	}

	return (
		<div
			className={cn(
				"notch relative flex items-center gap-3 bg-arena-raised p-2 pr-3 transition-colors hover:bg-arena-high has-[button[data-history-trigger]:focus-visible]:bg-arena-high",
				className,
			)}
		>
			{/* Overlay trigger, so the badge's own tooltip button isn't nested inside it. */}
			<EquipmentHistorySheet item={item}>
				<button
					aria-label={`${item.label} patch history`}
					className="absolute inset-0 cursor-pointer outline-none"
					data-history-trigger
					type="button"
				/>
			</EquipmentHistorySheet>
			{body}
			<span className="flex shrink-0 flex-col items-end gap-1 self-start pt-1">
				<AdjustmentBadge targetId={item.id} />
				{excluded ? (
					<span className="tag bg-nerf-soft text-xs text-nerf">
						<span>Disabled</span>
					</span>
				) : null}
			</span>
		</div>
	);
};

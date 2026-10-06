"use client";

import {
	ArrowsDownUpIcon,
	CheckIcon,
	DiceFiveIcon,
	InfoIcon,
	LockSimpleIcon,
	LockSimpleOpenIcon,
	ProhibitIcon,
	WarningIcon,
} from "@phosphor-icons/react";
import { maybeGetRecentAdjustmentForTarget } from "@repo/patch-notes/patches";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@repo/ui/tooltip";
import * as motion from "motion/react-client";
import { useState } from "react";
import { cn } from "@/lib/cvu";
import {
	EQUIPMENT_KIND_LABEL,
	type EquipmentItem,
	getEquipmentKind,
	getEquipmentMeta,
} from "@/lib/equipment";
import type { LoadoutSlot, SwapOption } from "@/lib/swap";
import {
	AdjustmentBadge,
	AdjustmentIcon,
	adjustmentTone,
} from "./adjustment-badge";
import { EquipmentHistorySheet } from "./equipment-history-sheet";

type SlotCardProps = {
	readonly className?: string;
	readonly getOptions?: () => SwapOption[];
	readonly isDisabledInSettings?: boolean;
	readonly item: EquipmentItem;
	/** When set, the lock is forced on and this explains why. */
	readonly lockedReason?: string;
	readonly locked?: boolean;
	readonly onReroll?: () => void;
	readonly onSwap?: (itemId: string) => void;
	readonly onToggleLock?: () => void;
	readonly showDescription?: boolean;
	readonly slot: LoadoutSlot;
	readonly slotNumber: number;
};

const slotTitle = (slot: LoadoutSlot) => {
	if (slot.kind === "gadget") return `Gadget ${slot.index + 1}`;
	return EQUIPMENT_KIND_LABEL[slot.kind];
};

export const SlotCard = ({
	className,
	getOptions,
	isDisabledInSettings,
	item,
	lockedReason,
	locked,
	onReroll,
	onSwap,
	onToggleLock,
	showDescription = true,
	slot,
	slotNumber,
}: SlotCardProps) => {
	const [open, setOpen] = useState(false);
	const canSwap = Boolean(onSwap && getOptions);
	const title = slotTitle(slot);
	const isContestant = getEquipmentKind(item) === "contestant";

	return (
		<motion.article
			className={cn(
				"notch @container group relative isolate flex min-h-36 flex-col overflow-hidden bg-arena-raised p-4 transition-colors duration-150 select-none md:min-h-52 md:p-5",
				canSwap &&
					"hover:bg-arena-high has-[button[data-slot-trigger]:focus-visible]:bg-arena-high",
				open && "bg-arena-high",
				locked && "shadow-[inset_3px_0_0_var(--color-cashout)]",
				className,
			)}
			layout="position"
			variants={{
				animate: {
					opacity: 1,
					transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] },
					y: 0,
				},
				initial: { opacity: 0, y: 12 },
			}}
		>
			{item.imageUrl ? (
				isContestant ? (
					// biome-ignore lint/performance/noImgElement: static contestant art
					<img
						alt=""
						aria-hidden
						className="slot-art pointer-events-none absolute inset-y-0 right-0 -z-10 h-full w-[62%] object-cover object-top opacity-50 mix-blend-luminosity transition-[opacity,transform] duration-300 ease-(--ease-snap) group-hover:scale-[1.03] group-hover:opacity-75 group-hover:mix-blend-normal"
						draggable={false}
						key={item.id}
						src={item.imageUrl}
					/>
				) : (
					<div
						aria-hidden
						className="slot-stage pointer-events-none absolute inset-y-0 right-0 -z-10 w-[64%]"
					>
						{/* biome-ignore lint/performance/noImgElement: static equipment renders */}
						<img
							alt=""
							className="equipment-render absolute inset-0 m-auto max-h-[72%] max-w-[82%] object-contain opacity-85 transition-[opacity,transform] duration-300 ease-(--ease-snap) group-hover:scale-[1.05] group-hover:opacity-100"
							draggable={false}
							key={item.id}
							src={item.imageUrl}
						/>
					</div>
				)
			) : null}
			{/* Keeps titles and descriptions legible where they run over the art. */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-arena-raised from-25% via-arena-raised/70 via-55% to-transparent transition-colors group-hover:from-arena-high group-hover:via-arena-high/70"
			/>

			{canSwap ? (
				<Popover onOpenChange={setOpen} open={open}>
					<PopoverTrigger asChild>
						<button
							aria-label={`${title}: ${item.label}. Choose a different ${EQUIPMENT_KIND_LABEL[getEquipmentKind(item)].toLowerCase()}`}
							className="absolute inset-0 z-0 cursor-pointer outline-none"
							data-slot-trigger
							type="button"
						/>
					</PopoverTrigger>
					<SwapPanel
						currentId={item.id}
						onPick={(itemId) => {
							onSwap?.(itemId);
							setOpen(false);
						}}
						onReroll={
							onReroll
								? () => {
										onReroll();
										setOpen(false);
									}
								: undefined
						}
						options={open ? (getOptions?.() ?? []) : []}
						slot={slot}
						title={title}
					/>
				</Popover>
			) : null}

			<header className="pointer-events-none relative flex items-center gap-2">
				<span className="font-heading text-sm font-extrabold italic tabular-nums text-broadcast">
					{String(slotNumber).padStart(2, "0")}
				</span>
				<span className="eyebrow min-w-0 grow truncate">{title}</span>
				<div className="pointer-events-auto flex shrink-0 items-center gap-1.5">
					<AdjustmentBadge targetId={item.id} />
					<EquipmentHistorySheet item={item}>
						<button
							aria-label={`${item.label} patch history`}
							className="press relative z-10 flex size-8 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-arena-top hover:text-ink"
							title="Patch history"
							type="button"
						>
							<InfoIcon size={16} weight="bold" />
						</button>
					</EquipmentHistorySheet>
					{isDisabledInSettings ? (
						<StatusTip
							content="Disabled in Settings. It won't show up in new rolls."
							label="Disabled in settings"
						>
							<ProhibitIcon size={16} weight="bold" />
						</StatusTip>
					) : null}
					{onToggleLock ? (
						lockedReason ? (
							<StatusTip
								content={lockedReason}
								label="Auto-locked"
								tone="locked"
							>
								<LockSimpleIcon size={16} weight="fill" />
							</StatusTip>
						) : (
							<button
								aria-label={
									locked ? `Unlock ${title}` : `Lock ${title} for the next roll`
								}
								aria-pressed={locked}
								className={cn(
									"press relative z-10 flex size-8 items-center justify-center rounded-md transition-colors",
									locked
										? "bg-cashout text-arena hover:bg-cashout-hover"
										: "text-ink-faint hover:bg-arena-top hover:text-ink",
								)}
								onClick={onToggleLock}
								title={
									locked
										? "Locked — survives the next roll"
										: "Lock for the next roll"
								}
								type="button"
							>
								{locked ? (
									<LockSimpleIcon size={16} weight="fill" />
								) : (
									<LockSimpleOpenIcon size={16} weight="bold" />
								)}
							</button>
						)
					) : null}
				</div>
			</header>

			<div className="pointer-events-none relative mt-auto pt-6">
				<p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
					{getEquipmentMeta(item)}
				</p>
				{/* Shared size and a reserved two-line box keep every card's text on the same rows, whatever the card width or title length. */}
				<h3
					className="h-[2lh] text-[2.25rem] leading-none lg:text-[1.75rem]"
					key={item.id}
				>
					<span className="line-clamp-2 animate-reel">{item.label}</span>
				</h3>
				{showDescription ? (
					<p className="mt-2 line-clamp-3 h-[3lh] max-w-[38ch] text-sm leading-snug text-ink-soft">
						{item.description}
					</p>
				) : null}
				{canSwap ? (
					<p
						aria-hidden
						className="mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cashout opacity-70 transition-opacity group-hover:opacity-100 md:opacity-0"
					>
						<ArrowsDownUpIcon size={14} weight="bold" />
						Swap
					</p>
				) : null}
			</div>
		</motion.article>
	);
};

const StatusTip = ({
	children,
	content,
	label,
	tone = "muted",
}: {
	readonly children: React.ReactNode;
	readonly content: string;
	readonly label: string;
	readonly tone?: "locked" | "muted";
}) => (
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger
				aria-label={label}
				className={cn(
					"relative z-10 flex size-8 items-center justify-center rounded-md",
					tone === "locked"
						? "bg-cashout/80 text-arena"
						: "bg-nerf-soft text-nerf",
				)}
			>
				{children}
			</TooltipTrigger>
			<TooltipContent className="max-w-60" side="bottom">
				<p className="font-semibold">{label}</p>
				<p className="text-ink-soft">{content}</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
);

const SwapPanel = ({
	currentId,
	onPick,
	onReroll,
	options,
	slot,
	title,
}: {
	readonly currentId: string;
	readonly onPick: (itemId: string) => void;
	readonly onReroll?: () => void;
	readonly options: SwapOption[];
	readonly slot: LoadoutSlot;
	readonly title: string;
}) => {
	const hasAlternatives = options.some((option) => option.id !== currentId);

	return (
		<PopoverContent
			align="start"
			className="w-[min(22rem,calc(100vw-2rem))] p-0"
			collisionPadding={16}
			side="bottom"
			sideOffset={6}
		>
			<div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2.5">
				<p className="eyebrow text-ink-soft">Swap {title}</p>
				{onReroll && hasAlternatives ? (
					<button
						className="press flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wider text-cashout transition-colors hover:bg-arena-top"
						onClick={onReroll}
						type="button"
					>
						<DiceFiveIcon size={14} weight="fill" />
						Random
					</button>
				) : null}
			</div>
			{slot.kind === "contestant" ? (
				<p className="flex items-start gap-2 border-b border-line bg-cashout-soft px-3 py-2 text-xs leading-snug text-ink-soft">
					<WarningIcon
						className="mt-0.5 shrink-0 text-cashout"
						size={14}
						weight="fill"
					/>
					Changing class re-rolls your weapon, specialization and any gadgets
					the new class can't use.
				</p>
			) : null}
			{hasAlternatives ? (
				<ul className="grid max-h-[min(60vh,24rem)] grid-cols-1 gap-px overflow-y-auto overscroll-contain p-1.5 sm:grid-cols-2">
					{options.map((option) => {
						const isCurrent = option.id === currentId;
						const adjustment = maybeGetRecentAdjustmentForTarget(option.id);

						return (
							<li key={option.id}>
								<button
									aria-current={isCurrent}
									className={cn(
										"flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-colors",
										isCurrent
											? "cursor-default bg-arena-top"
											: "hover:bg-arena-top focus-visible:bg-arena-top",
									)}
									disabled={isCurrent}
									onClick={() => onPick(option.id)}
									type="button"
								>
									<span className="notch notch-sm spotlight flex size-10 shrink-0 items-center justify-center">
										{option.imageUrl ? (
											// biome-ignore lint/performance/noImgElement: static equipment renders
											<img
												alt=""
												className="equipment-render size-8 object-contain"
												draggable={false}
												src={option.imageUrl}
											/>
										) : null}
									</span>
									<span className="min-w-0 grow">
										<span className="block truncate text-sm font-semibold leading-tight text-ink">
											{option.label}
										</span>
										<span className="block truncate text-xs text-ink-faint">
											{getEquipmentMeta(option)}
										</span>
									</span>
									{isCurrent ? (
										<CheckIcon
											className="shrink-0 text-cashout"
											size={16}
											weight="bold"
										/>
									) : adjustment ? (
										<span
											className={cn(
												"flex size-5 shrink-0 items-center justify-center rounded-sm",
												adjustmentTone({ type: adjustment.adjustmentType }),
											)}
											title={`Recently ${adjustment.adjustmentType}`}
										>
											<AdjustmentIcon
												size={11}
												type={adjustment.adjustmentType}
											/>
										</span>
									) : null}
								</button>
							</li>
						);
					})}
				</ul>
			) : (
				<p className="px-3 py-6 text-center text-sm text-ink-faint">
					No other options. Check your disabled equipment in Settings.
				</p>
			)}
		</PopoverContent>
	);
};

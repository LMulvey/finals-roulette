"use client";

import {
	ArrowFatDownIcon,
	ArrowFatUpIcon,
	ArrowSquareOutIcon,
	XIcon,
} from "@phosphor-icons/react";
import {
	getItemHistory,
	type ItemHistory,
	type StatSeries,
} from "@repo/patch-notes/history";
import { STAT_DEFINITIONS, type StatKey } from "@repo/patch-notes/stats";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@repo/ui/sheet";
import dynamic from "next/dynamic";
import Link from "next/link";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cvu";
import { type EquipmentItem, getEquipmentMeta } from "@/lib/equipment";
import {
	changeDirection,
	formatNumber,
	formatPatchDate,
	formatStatValue,
	patchHref,
	timelineEntryId,
} from "@/lib/stat-format";
import {
	ADJUSTMENT_LABEL,
	AdjustmentBadge,
	AdjustmentIcon,
	adjustmentTone,
} from "./adjustment-badge";

// Recharts only loads once a sheet with trends is opened.
const StatTrendChart = dynamic(() => import("./stat-trend-chart"), {
	loading: () => <div className="h-31 rounded-md bg-arena-raised" />,
	ssr: false,
});

const HIGHLIGHT_MS = 1600;

/** Wraps a trigger element; opens a sheet with the item's stats, trends and patch timeline. */
export const EquipmentHistorySheet = ({
	children,
	item,
}: {
	readonly children: ReactNode;
	readonly item: EquipmentItem;
}) => {
	const [open, setOpen] = useState(false);

	return (
		<Sheet onOpenChange={setOpen} open={open}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent aria-describedby={undefined}>
				{open ? <HistoryPanel item={item} /> : null}
			</SheetContent>
		</Sheet>
	);
};

const HistoryPanel = ({ item }: { readonly item: EquipmentItem }) => {
	const history = useMemo(() => getItemHistory(item.id), [item.id]);
	const trends = history.stats.filter((series) => series.points.length > 1);
	const hasAnything = history.entries.length > 0 || history.stats.length > 0;
	const [highlighted, setHighlighted] = useState<string | null>(null);

	useEffect(() => {
		if (!highlighted) return;
		const timeout = setTimeout(() => setHighlighted(null), HIGHLIGHT_MS);
		return () => clearTimeout(timeout);
	}, [highlighted]);

	const selectVersion = (version: string) => {
		document
			.getElementById(timelineEntryId(version))
			?.scrollIntoView({ behavior: "smooth", block: "center" });
		setHighlighted(version);
	};

	return (
		<>
			<header className="flex items-start gap-3 border-b border-line p-4 md:p-5">
				<span className="notch notch-sm spotlight flex size-14 shrink-0 items-center justify-center">
					{item.imageUrl ? (
						// biome-ignore lint/performance/noImgElement: static equipment renders
						<img
							alt=""
							className="equipment-render size-11 object-contain"
							draggable={false}
							src={item.imageUrl}
						/>
					) : null}
				</span>
				<div className="min-w-0 grow">
					<p className="eyebrow">Patch history</p>
					<SheetTitle className="truncate font-heading text-3xl leading-none font-extrabold uppercase italic">
						{item.label}
					</SheetTitle>
					<SheetDescription className="mt-1 flex items-center gap-2 text-xs text-ink-faint">
						{getEquipmentMeta(item)}
					</SheetDescription>
				</div>
				<div className="flex shrink-0 items-center gap-1.5">
					<AdjustmentBadge targetId={item.id} />
					<SheetClose
						aria-label="Close"
						className="press flex size-8 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-arena-top hover:text-ink"
					>
						<XIcon size={16} weight="bold" />
					</SheetClose>
				</div>
			</header>

			<div className="grow space-y-6 overflow-y-auto overscroll-contain p-4 md:p-5">
				{hasAnything ? null : (
					<p className="py-8 text-center text-sm text-ink-faint">
						No balance changes recorded since Season 5.
					</p>
				)}

				{history.stats.length ? (
					<section aria-labelledby="history-current">
						<h3 className="eyebrow mb-2 not-italic" id="history-current">
							Current stats
						</h3>
						<dl className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
							{history.stats.map((series) => (
								<StatTile key={series.stat} series={series} />
							))}
						</dl>
					</section>
				) : null}

				{trends.length ? (
					<section aria-labelledby="history-trends">
						<h3 className="eyebrow mb-2 not-italic" id="history-trends">
							Trends
						</h3>
						<div className="space-y-3">
							{trends.map((series) => (
								<StatTrendChart
									key={series.stat}
									notesByVersion={notesForStat(history, series.stat)}
									onSelectVersion={selectVersion}
									series={series}
								/>
							))}
						</div>
					</section>
				) : null}

				{history.entries.length ? (
					<Timeline highlighted={highlighted} history={history} />
				) : null}
			</div>
		</>
	);
};

const StatTile = ({ series }: { readonly series: StatSeries }) => {
	const { label, unit } = STAT_DEFINITIONS[series.stat];
	const first = series.points[0]?.value ?? series.current;
	const direction = changeDirection(series.stat, first, series.current);
	const delta = series.current - first;

	return (
		<div className="notch notch-sm bg-arena-raised px-3 py-2">
			<dt className="truncate text-xs text-ink-faint">{label}</dt>
			<dd className="truncate font-heading text-2xl leading-tight font-extrabold tabular-nums">
				{unit === "×" ? "×" : null}
				{formatNumber(series.current)}
				{unit && unit !== "×" ? (
					<span className="ml-0.5 text-sm font-semibold text-ink-soft">
						{unit}
					</span>
				) : null}
			</dd>
			{direction ? (
				<dd
					className={cn(
						"flex items-center gap-1 text-xs tabular-nums",
						direction === "buff" ? "text-buff" : "text-nerf",
					)}
				>
					{direction === "buff" ? (
						<ArrowFatUpIcon size={10} weight="fill" />
					) : (
						<ArrowFatDownIcon size={10} weight="fill" />
					)}
					<span className="text-ink-soft">
						{delta > 0 ? "+" : "−"}
						{formatStatValue(Math.abs(delta), unit === "×" ? "" : unit)} since{" "}
						{series.points[0]?.version}
					</span>
				</dd>
			) : (
				<dd className="text-xs text-ink-ghost">Unchanged</dd>
			)}
		</div>
	);
};

/** Note text per patch for the notes that changed `stat`, for chart tooltips. */
const notesForStat = (history: ItemHistory, stat: StatKey) =>
	new Map(
		history.entries.flatMap(({ notes, patch }) => {
			const text = notes
				.filter(
					(note) =>
						!note.temporary &&
						note.changes?.some((change) => change.stat === stat),
				)
				.map((note) => note.note)
				.join(" ");
			return text ? [[patch.version, text] as const] : [];
		}),
	);

const Timeline = ({
	highlighted,
	history,
}: {
	readonly highlighted: string | null;
	readonly history: ItemHistory;
}) => (
	<section aria-labelledby="history-timeline">
		<h3 className="eyebrow mb-2 not-italic" id="history-timeline">
			Timeline
		</h3>
		<ol className="space-y-1.5">
			{history.entries.map(({ notes, patch }) => (
				<li
					className={cn(
						"notch notch-sm scroll-mt-4 bg-arena-raised p-3 transition-[background-color,box-shadow] duration-500",
						highlighted === patch.version &&
							"bg-arena-top shadow-[inset_3px_0_0_var(--color-cashout)]",
					)}
					id={timelineEntryId(patch.version)}
					key={patch.version}
				>
					<div className="mb-2 flex items-center justify-between gap-2">
						<p className="font-heading text-lg leading-none font-extrabold uppercase italic">
							{patch.version}{" "}
							<span className="font-sans text-xs font-normal normal-case not-italic text-ink-faint">
								{formatPatchDate(patch.date)}
							</span>
						</p>
						<Link
							className="flex items-center gap-1 text-xs font-semibold text-cashout hover:text-cashout-hover"
							href={patchHref(patch.version)}
						>
							Patch notes <ArrowSquareOutIcon size={12} />
						</Link>
					</div>
					<ul className="space-y-2">
						{notes.map((note) => (
							<li className="flex items-start gap-2" key={note.note}>
								<span
									className={cn(
										"mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm",
										adjustmentTone({ type: note.adjustmentType }),
									)}
									title={ADJUSTMENT_LABEL[note.adjustmentType]}
								>
									<AdjustmentIcon size={11} type={note.adjustmentType} />
								</span>
								<div className="min-w-0 text-sm leading-snug">
									<p className="text-ink">
										<span className="sr-only">
											{ADJUSTMENT_LABEL[note.adjustmentType]}:{" "}
										</span>
										{note.note}
										{note.temporary ? (
											<span className="ml-1.5 inline-block rounded-sm bg-cashout-soft px-1.5 text-[0.65rem] font-semibold tracking-wider text-cashout uppercase align-middle">
												Limited-time
											</span>
										) : null}
									</p>
									{note.changes?.some((change) => change.stat === "other") ? (
										<p className="mt-0.5 text-xs text-ink-faint tabular-nums">
											{note.changes
												.flatMap((change) =>
													change.stat === "other"
														? [
																`${change.label}: ${formatStatValue(change.from, change.unit)} → ${formatStatValue(change.to, change.unit)}`,
															]
														: [],
												)
												.join(" · ")}
										</p>
									) : null}
									{note.sassyNote ? (
										<p className="mt-0.5 text-xs text-cashout italic">
											{note.sassyNote}
										</p>
									) : null}
								</div>
							</li>
						))}
					</ul>
				</li>
			))}
		</ol>
	</section>
);

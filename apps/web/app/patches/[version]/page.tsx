"use client";

import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ArrowSquareOutIcon,
	HourglassMediumIcon,
} from "@phosphor-icons/react";
import { ALL_PATCHES, getPatchByVersion } from "@repo/patch-notes/patches";
import type { PatchNote, PatchNoteCategory } from "@repo/patch-notes/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
	ADJUSTMENT_LABEL,
	AdjustmentIcon,
	adjustmentTone,
} from "@/components/adjustment-badge";
import { FilterTabs } from "@/components/filter-controls";
import { countAdjustments, PatchTally } from "@/components/patch-tally";
import { cn } from "@/lib/cvu";
import { maybeGetItemById } from "@/lib/maybe-get-item-by-id";

type CategoryFilter =
	| "all"
	| "contestants"
	| "gadget"
	| "specializations"
	| "weapons";

const CATEGORY_TABS: Array<{
	label: string;
	value: Exclude<CategoryFilter, "all">;
}> = [
	{ label: "Weapons", value: "weapons" },
	{ label: "Specializations", value: "specializations" },
	{ label: "Gadgets", value: "gadget" },
	{ label: "Contestants", value: "contestants" },
];

const SECTION_LABEL: Record<PatchNote["section"], string> = {
	additions: "New arrivals",
	balance: "Balance",
	"content-and-bug-fixes": "Fixes",
	removals: "Removed",
	"security-and-anti-cheat": "Security",
	store: "Store",
};

const SECTION_ORDER: PatchNote["section"][] = [
	"additions",
	"balance",
	"removals",
	"content-and-bug-fixes",
	"security-and-anti-cheat",
	"store",
];

const toCategoryFilter = (category: PatchNoteCategory): CategoryFilter =>
	category === "characters"
		? "contestants"
		: (CATEGORY_TABS.find((tab) => tab.value === category)?.value ?? "all");

const stripeTone: Record<PatchNote["adjustmentType"], string> = {
	addition: "before:bg-added",
	buff: "before:bg-buff",
	nerf: "before:bg-nerf",
	neutral: "before:bg-tweak",
	removal: "before:bg-nerf",
};

const formatDate = (date: Date) =>
	date.toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

export default function Page() {
	const params = useParams<{ version: string }>();
	const patch = getPatchByVersion(params.version);
	const [category, setCategory] = useState<CategoryFilter>("all");

	if (!patch) {
		return (
			<div className="mx-auto w-full max-w-4xl px-4 pt-10 md:px-8">
				<p className="eyebrow text-broadcast">404</p>
				<h1 className="text-5xl">Patch not found</h1>
				<Link
					className="mt-4 inline-flex items-center gap-2 text-cashout hover:text-cashout-hover"
					href="/patches"
				>
					<ArrowLeftIcon size={16} weight="bold" /> All patches
				</Link>
			</div>
		);
	}

	const sorted = [...ALL_PATCHES].sort(
		(a, b) => b.date.getTime() - a.date.getTime(),
	);
	const index = sorted.findIndex(
		(candidate) => candidate.version === patch.version,
	);
	const newer = sorted[index - 1];
	const older = sorted[index + 1];

	const categoryCounts = CATEGORY_TABS.map((tab) => ({
		...tab,
		count: patch.patchNotes.filter(
			(note) => toCategoryFilter(note.category) === tab.value,
		).length,
	})).filter((tab) => tab.count > 0);

	const visibleNotes = patch.patchNotes.filter(
		(note) =>
			category === "all" || toCategoryFilter(note.category) === category,
	);

	const sections = SECTION_ORDER.map((section) => {
		const byTarget = new Map<string, PatchNote[]>();
		for (const note of visibleNotes.filter(
			(candidate) => candidate.section === section,
		)) {
			const target = note.target ?? "general";
			byTarget.set(target, [...(byTarget.get(target) ?? []), note]);
		}
		return { section, targets: [...byTarget.entries()] };
	}).filter(({ targets }) => targets.length);

	const hasTemporary = patch.patchNotes.some((note) => note.temporary);

	return (
		<article className="mx-auto w-full max-w-4xl px-4 pt-6 md:px-8 md:pt-10">
			<Link
				className="eyebrow mb-6 inline-flex items-center gap-1.5 transition-colors hover:text-ink"
				href="/patches"
			>
				<ArrowLeftIcon size={14} weight="bold" /> All patches
			</Link>

			<header className="mb-8 border-b border-line pb-8">
				<p className="mb-2 flex flex-wrap items-center gap-2">
					<span className="tag bg-broadcast text-sm text-ink">
						<span>Update {patch.version}</span>
					</span>
					<time
						className="text-sm text-ink-faint"
						dateTime={patch.date.toISOString()}
					>
						{formatDate(patch.date)}
					</time>
				</p>
				<h1 className="text-5xl leading-[0.9] md:text-7xl">
					{patch.title.split("|").at(-1)?.trim()}
				</h1>
				<p className="mt-4 max-w-2xl text-lg text-ink-soft">
					{patch.description}
				</p>
				<div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
					<PatchTally counts={countAdjustments(patch.patchNotes)} />
					<a
						className="flex items-center gap-1.5 text-sm font-semibold text-cashout hover:text-cashout-hover"
						href={patch.originalUrl}
						rel="noopener noreferrer"
						target="_blank"
					>
						Full notes from Embark{" "}
						<ArrowSquareOutIcon size={14} weight="bold" />
					</a>
				</div>
				{hasTemporary ? (
					<p className="mt-5 flex items-start gap-2 bg-cashout-soft px-3 py-2 text-sm text-ink-soft">
						<HourglassMediumIcon
							className="mt-0.5 shrink-0 text-cashout"
							size={16}
							weight="fill"
						/>
						Changes marked temporary were limited-time and have since expired.
						They don&apos;t count toward recent buff/nerf badges.
					</p>
				) : null}
			</header>

			{patch.patchNotes.length ? (
				<>
					{categoryCounts.length > 1 ? (
						<div className="mb-8">
							<FilterTabs
								label="Category"
								onChange={setCategory}
								options={[
									{
										count: patch.patchNotes.length,
										label: "All",
										value: "all" as CategoryFilter,
									},
									...categoryCounts,
								]}
								value={category}
							/>
						</div>
					) : null}

					<div className="space-y-12">
						{sections.map(({ section, targets }) => (
							<section aria-labelledby={`section-${section}`} key={section}>
								<h2
									className="mb-4 text-3xl leading-none"
									id={`section-${section}`}
								>
									{SECTION_LABEL[section]}
								</h2>
								<div className="grid gap-2">
									{targets.map(([target, notes]) => (
										<TargetCard key={target} notes={notes} target={target} />
									))}
								</div>
							</section>
						))}
					</div>
				</>
			) : (
				<div className="notch bg-arena-raised p-10 text-center">
					<p className="font-heading text-3xl font-extrabold uppercase italic">
						Quiet week
					</p>
					<p className="mt-1 text-ink-soft">
						No weapon, gadget, specialization or contestant changes in this one.
					</p>
				</div>
			)}

			<nav aria-label="Other patches" className="mt-16 grid grid-cols-2 gap-2">
				{older ? (
					<PatchNavLink
						direction="older"
						title={older.title}
						version={older.version}
					/>
				) : (
					<span />
				)}
				{newer ? (
					<PatchNavLink
						direction="newer"
						title={newer.title}
						version={newer.version}
					/>
				) : null}
			</nav>
		</article>
	);
}

const TargetCard = ({
	notes,
	target,
}: {
	readonly notes: PatchNote[];
	readonly target: string;
}) => {
	const item = target === "general" ? undefined : maybeGetItemById(target);
	const label = item?.label ?? (target === "general" ? "General" : target);

	return (
		<div className="notch flex gap-4 bg-arena-raised p-4">
			<div className="notch notch-sm spotlight flex size-16 shrink-0 items-center justify-center md:size-20">
				{item?.imageUrl ? (
					// biome-ignore lint/performance/noImgElement: static equipment renders
					<img
						alt=""
						className="equipment-render size-13 object-contain md:size-16"
						loading="lazy"
						src={item.imageUrl}
					/>
				) : (
					<span className="font-heading text-2xl font-extrabold italic text-ink-ghost">
						—
					</span>
				)}
			</div>
			<div className="min-w-0 grow">
				<h3 className="text-2xl leading-tight">{label}</h3>
				<ul className="mt-2 space-y-3">
					{notes.map((note) => (
						<li
							className={cn(
								"relative pl-4 before:absolute before:top-1 before:bottom-1 before:left-0 before:w-1 before:-skew-x-12",
								stripeTone[note.adjustmentType],
							)}
							key={note.note}
						>
							<p className="mb-1 flex flex-wrap items-center gap-1.5">
								<span
									className={cn(
										"tag text-xs",
										adjustmentTone({ type: note.adjustmentType }),
									)}
								>
									<span className="flex items-center gap-1">
										<AdjustmentIcon size={11} type={note.adjustmentType} />
										{ADJUSTMENT_LABEL[note.adjustmentType]}
									</span>
								</span>
								{note.temporary ? (
									<span className="tag bg-cashout-soft text-xs text-cashout">
										<span className="flex items-center gap-1">
											<HourglassMediumIcon size={11} weight="fill" />
											Temporary
										</span>
									</span>
								) : null}
							</p>
							<p className="text-ink">{note.note}</p>
							{note.devNote ? (
								<p className="mt-1.5 border-l border-line-strong pl-3 text-sm italic text-ink-faint">
									<span className="font-semibold not-italic text-ink-soft">
										Dev note:
									</span>{" "}
									{note.devNote}
								</p>
							) : null}
							{note.sassyNote ? (
								<p className="mt-1 text-sm italic text-cashout">
									{note.sassyNote}
								</p>
							) : null}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

const PatchNavLink = ({
	direction,
	title,
	version,
}: {
	readonly direction: "newer" | "older";
	readonly title: string;
	readonly version: string;
}) => (
	<Link
		className={cn(
			"notch notch-sm group flex flex-col gap-1 bg-arena-raised p-4 transition-colors hover:bg-arena-high",
			direction === "newer" && "items-end text-right",
		)}
		href={`/patches/${version.replaceAll(".", "")}`}
	>
		<span className="eyebrow flex items-center gap-1">
			{direction === "older" ? <ArrowLeftIcon size={12} weight="bold" /> : null}
			{direction === "older" ? "Older" : "Newer"}
			{direction === "newer" ? (
				<ArrowRightIcon size={12} weight="bold" />
			) : null}
		</span>
		<span className="font-heading text-2xl font-extrabold italic tabular-nums">
			{version}
		</span>
		<span className="truncate text-sm text-ink-faint">
			{title.split("|").at(-1)?.trim()}
		</span>
	</Link>
);

"use client";

import { ArrowCounterClockwiseIcon, WarningIcon } from "@phosphor-icons/react";
import type {
	ClassType,
	Settings as SettingsType,
} from "@repo/schema/roulette";
import { Switch } from "@repo/ui/switch";
import { useEffect, useState } from "react";
import { heavyClass } from "@/lib/contestants/heavy";
import { lightClass } from "@/lib/contestants/light";
import { mediumClass } from "@/lib/contestants/medium";
import { cn } from "@/lib/cvu";
import type { EquipmentItem } from "@/lib/equipment";
import { getContestantMeta } from "@/lib/get-random-items";
import { getSettings, saveSettings } from "@/lib/settings-storage";
import { useHydrated } from "@/lib/use-hydrated";
import { EquipmentTile } from "./equipment-tile";
import { FilterTabs, SearchField } from "./filter-controls";
import { PageHeading } from "./page-heading";

const CONTESTANTS = [lightClass, mediumClass, heavyClass];

type ClassFilter = "all" | ClassType;

const POOL = CONTESTANTS.map((contestant) => {
	const meta = getContestantMeta(contestant.type, {
		returnIfDisabledByEmbark: false,
		returnIfDisabledByUser: true,
	});
	return {
		contestant,
		groups: [
			{
				items: meta.weapons as EquipmentItem[],
				key: "weapons",
				label: "Weapons",
				minimum: 1,
			},
			{
				items: meta.specializations as EquipmentItem[],
				key: "specializations",
				label: "Specializations",
				minimum: 1,
			},
			{
				items: meta.gadgets as EquipmentItem[],
				key: "gadgets",
				label: "Gadgets",
				minimum: 3,
			},
		],
	};
});

const ALL_IDS = new Set(
	POOL.flatMap(({ contestant, groups }) => [
		contestant.id,
		...groups.flatMap((g) => g.items.map((i) => i.id)),
	]),
);

export const Settings = () => {
	const hydrated = useHydrated();
	const [settings, setSettings] = useState<SettingsType | null>(null);
	const [search, setSearch] = useState("");
	const [classFilter, setClassFilter] = useState<ClassFilter>("all");

	useEffect(() => {
		if (hydrated) setSettings(getSettings());
	}, [hydrated]);

	const update = (next: Partial<SettingsType>) => {
		setSettings((current) => {
			if (!current) return current;
			const merged = { ...current, ...next };
			saveSettings(merged);
			return merged;
		});
	};

	if (!settings) {
		return (
			<div className="mx-auto w-full max-w-6xl px-4 pt-6 md:px-8 md:pt-10">
				<PageHeading eyebrow="House rules" title="Settings" />
			</div>
		);
	}

	const disabled = new Set(settings.disabledEquipmentIds);
	const enabledCount = [...ALL_IDS].filter((id) => !disabled.has(id)).length;

	const setMany = (ids: string[], enable: boolean) => {
		const next = new Set(disabled);
		for (const id of ids) {
			if (enable) next.delete(id);
			else next.add(id);
		}
		update({ disabledEquipmentIds: [...next] });
	};

	const toggle = (id: string) => setMany([id], disabled.has(id));

	const matches = (item: EquipmentItem) => {
		if (!search) return true;
		const needle = search.toLowerCase();
		return (
			item.label.toLowerCase().includes(needle) ||
			item.description.toLowerCase().includes(needle)
		);
	};

	return (
		<div className="mx-auto w-full max-w-6xl px-4 pt-6 md:px-8 md:pt-10">
			<PageHeading eyebrow="House rules" title="Settings" />

			<section className="mb-12 grid gap-2 md:grid-cols-2">
				<div className="notch flex items-center justify-between gap-6 bg-arena-raised p-5">
					<span>
						<span className="block font-heading text-2xl font-extrabold uppercase italic leading-tight">
							Equipment descriptions
						</span>
						<span className="block text-sm text-ink-soft">
							Show the cheeky one-liners on loadout slots and equipment tiles.
						</span>
					</span>
					<Switch
						aria-label="Show equipment descriptions"
						checked={settings.showEquipmentDescriptions}
						onCheckedChange={(showEquipmentDescriptions) =>
							update({ showEquipmentDescriptions })
						}
					/>
				</div>
				<div className="notch flex items-center justify-between gap-6 bg-arena-raised p-5">
					<span>
						<span className="block font-heading text-2xl font-extrabold uppercase italic leading-tight">
							Roll pool
						</span>
						<span className="block text-sm text-ink-soft">
							<span className="font-semibold tabular-nums text-ink">
								{enabledCount}
							</span>{" "}
							of <span className="tabular-nums">{ALL_IDS.size}</span> items can
							be rolled.
						</span>
					</span>
					<button
						className="press flex h-10 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-semibold text-ink-soft transition-colors hover:bg-arena-top hover:text-ink disabled:opacity-40 disabled:hover:bg-transparent"
						disabled={!disabled.size}
						onClick={() => update({ disabledEquipmentIds: [] })}
						type="button"
					>
						<ArrowCounterClockwiseIcon size={16} weight="bold" />
						Enable all
					</button>
				</div>
			</section>

			<section aria-labelledby="pool-heading">
				<div className="mb-4 flex flex-wrap items-end justify-between gap-4">
					<div>
						<h2 className="text-4xl leading-none" id="pool-heading">
							Equipment pool
						</h2>
						<p className="mt-1 max-w-xl text-ink-soft">
							Tap to pull something out of rotation, like stuff you haven&apos;t
							unlocked yet or truly loathe.
						</p>
					</div>
					<SearchField
						onChange={setSearch}
						placeholder="Search equipment"
						value={search}
					/>
				</div>
				<div className="mb-8">
					<FilterTabs
						label="Class"
						onChange={setClassFilter}
						options={[
							{ label: "All classes", value: "all" },
							...CONTESTANTS.map((contestant) => ({
								label: contestant.label,
								value: contestant.type,
							})),
						]}
						value={classFilter}
					/>
				</div>

				<div className="space-y-12">
					{POOL.filter(
						({ contestant }) =>
							classFilter === "all" || contestant.type === classFilter,
					).map(({ contestant, groups }) => {
						const classDisabled = disabled.has(contestant.id);
						const visibleGroups = groups.map((group) => ({
							...group,
							visible: group.items.filter(matches),
						}));
						if (search && !visibleGroups.some((group) => group.visible.length))
							return null;

						return (
							<div key={contestant.id}>
								<div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
									<h3
										className={cn(
											"text-4xl leading-none",
											classDisabled && "text-ink-faint line-through",
										)}
									>
										{contestant.label}
									</h3>
									<label
										className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-ink-soft"
										htmlFor={`roll-${contestant.type}`}
									>
										Roll this class
										<Switch
											checked={!classDisabled}
											id={`roll-${contestant.type}`}
											onCheckedChange={() => toggle(contestant.id)}
										/>
									</label>
								</div>

								<div
									className={cn(
										"space-y-6 transition-opacity",
										classDisabled && "opacity-50",
									)}
								>
									{visibleGroups.map((group) => {
										if (!group.visible.length) return null;
										const ids = group.items.map((item) => item.id);
										const enabledInGroup = ids.filter(
											(id) => !disabled.has(id),
										).length;
										const tooFew =
											!classDisabled && enabledInGroup < group.minimum;

										return (
											<div key={group.key}>
												<div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
													<h4 className="eyebrow not-italic">
														{group.label}{" "}
														<span className="tabular-nums text-ink-ghost">
															{enabledInGroup}/{ids.length}
														</span>
													</h4>
													{tooFew ? (
														<span className="flex items-center gap-1 text-xs font-semibold text-cashout">
															<WarningIcon size={14} weight="fill" />
															Needs at least {group.minimum}. Rolls will fall
															back to defaults.
														</span>
													) : null}
													<span className="ml-auto flex gap-1">
														<BulkButton onClick={() => setMany(ids, true)}>
															All on
														</BulkButton>
														<BulkButton onClick={() => setMany(ids, false)}>
															All off
														</BulkButton>
													</span>
												</div>
												<div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
													{group.visible.map((item) => (
														<EquipmentTile
															excluded={disabled.has(item.id)}
															item={item}
															key={item.id}
															onToggle={() => toggle(item.id)}
														/>
													))}
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</section>
		</div>
	);
};

const BulkButton = ({
	children,
	onClick,
}: {
	readonly children: React.ReactNode;
	readonly onClick: () => void;
}) => (
	<button
		className="press rounded-sm px-2 py-1 text-xs font-semibold uppercase tracking-wider text-ink-faint transition-colors hover:bg-arena-high hover:text-ink"
		onClick={onClick}
		type="button"
	>
		{children}
	</button>
);

"use client";

import { maybeGetRecentAdjustmentForTarget } from "@repo/patch-notes/patches";
import type {
	ClassType,
	ContestantWeapon,
	WeaponType,
} from "@repo/schema/roulette";
import { useMemo, useState } from "react";
import { EquipmentTile } from "@/components/equipment-tile";
import { FilterTabs, SearchField } from "@/components/filter-controls";
import { PageHeading } from "@/components/page-heading";
import { heavyClass } from "@/lib/contestants/heavy";
import { lightClass } from "@/lib/contestants/light";
import { mediumClass } from "@/lib/contestants/medium";
import { type EquipmentItem, WEAPON_TYPE_LABEL } from "@/lib/equipment";
import { getContestantMeta } from "@/lib/get-random-items";
import { getSettings } from "@/lib/settings-storage";
import { useHydrated } from "@/lib/use-hydrated";

const CONTESTANTS = [lightClass, mediumClass, heavyClass];

type KindFilter = "all" | "gadgets" | "specializations" | "weapons";
type StatusFilter = "all" | "buff" | "disabled" | "nerf" | "recent";
type ClassFilter = "all" | ClassType;

const KIND_SECTIONS: Array<{ key: Exclude<KindFilter, "all">; label: string }> =
	[
		{ key: "weapons", label: "Weapons" },
		{ key: "specializations", label: "Specializations" },
		{ key: "gadgets", label: "Gadgets" },
	];

export const Page = () => {
	const hydrated = useHydrated();
	const disabledIds = hydrated ? getSettings().disabledEquipmentIds : [];
	const showDescription = hydrated
		? getSettings().showEquipmentDescriptions
		: true;

	const [classFilter, setClassFilter] = useState<ClassFilter>("all");
	const [kindFilter, setKindFilter] = useState<KindFilter>("all");
	const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
	const [weaponType, setWeaponType] = useState<"all" | WeaponType>("all");
	const [search, setSearch] = useState("");

	const metaByClass = useMemo(
		() =>
			CONTESTANTS.map((contestant) => ({
				contestant,
				meta: getContestantMeta(contestant.type, {
					returnIfDisabledByEmbark: true,
					returnIfDisabledByUser: true,
				}),
			})),
		[],
	);

	const matches = (item: EquipmentItem) => {
		if (search) {
			const needle = search.toLowerCase();
			if (
				!item.label.toLowerCase().includes(needle) &&
				!item.description.toLowerCase().includes(needle)
			)
				return false;
		}

		if (statusFilter === "disabled") {
			return (
				disabledIds.includes(item.id) ||
				Boolean("disabled" in item && item.disabled)
			);
		}

		if (statusFilter !== "all") {
			const adjustment = maybeGetRecentAdjustmentForTarget(
				item.id,
			)?.adjustmentType;
			if (statusFilter === "recent") return Boolean(adjustment);
			return adjustment === statusFilter;
		}

		return true;
	};

	const sections = metaByClass
		.filter(
			({ contestant }) =>
				classFilter === "all" || contestant.type === classFilter,
		)
		.map(({ contestant, meta }) => {
			const groups = {
				gadgets: meta.gadgets.filter(matches),
				specializations: meta.specializations.filter(matches),
				weapons: meta.weapons
					.filter(
						(weapon: ContestantWeapon) =>
							weaponType === "all" || weapon.type === weaponType,
					)
					.filter(matches),
			};
			return { contestant, groups };
		});

	const total = sections.reduce(
		(sum, { groups }) =>
			sum +
			KIND_SECTIONS.filter(
				({ key }) => kindFilter === "all" || kindFilter === key,
			).reduce((inner, { key }) => inner + groups[key].length, 0),
		0,
	);

	return (
		<div className="mx-auto w-full max-w-6xl px-4 pt-6 md:px-8 md:pt-10">
			<PageHeading count={total} eyebrow="The armory" title="Equipment">
				<SearchField
					onChange={setSearch}
					placeholder="Search equipment"
					value={search}
				/>
			</PageHeading>

			<div className="mb-8 flex flex-col gap-2 lg:flex-row lg:flex-wrap">
				<FilterTabs
					label="Class"
					onChange={setClassFilter}
					options={[
						{ label: "All classes", value: "all" },
						{ label: "Light", value: "light" },
						{ label: "Medium", value: "medium" },
						{ label: "Heavy", value: "heavy" },
					]}
					value={classFilter}
				/>
				<FilterTabs
					label="Equipment type"
					onChange={(value) => {
						setKindFilter(value);
						if (value !== "weapons") setWeaponType("all");
					}}
					options={[
						{ label: "Everything", value: "all" },
						...KIND_SECTIONS.map(({ key, label }) => ({ label, value: key })),
					]}
					value={kindFilter}
				/>
				<FilterTabs
					label="Status"
					onChange={setStatusFilter}
					options={[
						{ label: "Any status", value: "all" },
						{ label: "Recently changed", value: "recent" },
						{ label: "Buffed", value: "buff" },
						{ label: "Nerfed", value: "nerf" },
						{ label: "Disabled", value: "disabled" },
					]}
					value={statusFilter}
				/>
				{kindFilter === "weapons" ? (
					<FilterTabs
						label="Weapon type"
						onChange={setWeaponType}
						options={[
							{ label: "All types", value: "all" as const },
							...(
								Object.entries(WEAPON_TYPE_LABEL) as Array<[WeaponType, string]>
							).map(([value, label]) => ({
								label,
								value,
							})),
						]}
						value={weaponType}
					/>
				) : null}
			</div>

			{total === 0 ? (
				<div className="notch bg-arena-raised p-10 text-center">
					<p className="font-heading text-3xl font-extrabold uppercase italic">
						Nothing matches
					</p>
					<p className="mt-1 text-ink-soft">
						{statusFilter === "all"
							? "Try a different search or filter."
							: "No equipment has that status right now."}
					</p>
				</div>
			) : (
				<div className="space-y-12">
					{sections.map(({ contestant, groups }) => {
						const visibleKinds = KIND_SECTIONS.filter(
							({ key }) =>
								(kindFilter === "all" || kindFilter === key) &&
								groups[key].length,
						);
						if (!visibleKinds.length) return null;

						return (
							<section
								aria-labelledby={`class-${contestant.type}`}
								key={contestant.id}
							>
								<div className="mb-4 flex items-center gap-4 border-b border-line pb-3">
									{contestant.imageUrl ? (
										// biome-ignore lint/performance/noImgElement: static contestant art
										<img
											alt=""
											className="h-14 w-auto object-contain"
											src={contestant.imageUrl}
										/>
									) : null}
									<div>
										<h2
											className="text-4xl leading-none"
											id={`class-${contestant.type}`}
										>
											{contestant.label}
										</h2>
										<p className="text-sm text-ink-faint tabular-nums">
											{contestant.healthPoints} HP ·{" "}
											{contestant.regenerationSeconds}s regen delay
										</p>
									</div>
								</div>
								<div className="space-y-6">
									{visibleKinds.map(({ key, label }) => (
										<div key={key}>
											<h3 className="eyebrow mb-2 not-italic">
												{label}{" "}
												<span className="tabular-nums text-ink-ghost">
													{groups[key].length}
												</span>
											</h3>
											<div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
												{groups[key].map((item) => (
													<EquipmentTile
														excluded={
															disabledIds.includes(item.id) ||
															Boolean(item.disabled)
														}
														item={item}
														key={item.id}
														showDescription={showDescription}
													/>
												))}
											</div>
										</div>
									))}
								</div>
							</section>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Page;

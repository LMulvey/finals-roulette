"use client";

import {
	CheckIcon,
	DiceFiveIcon,
	PencilSimpleIcon,
	XIcon,
} from "@phosphor-icons/react";
import type { ContestantLoadout } from "@repo/schema/roulette";
import * as motion from "motion/react-client";
import {
	type Dispatch,
	type SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { CLASS_LABEL } from "@/lib/equipment";
import { rollLoadoutName } from "@/lib/generate-loadout-name";
import type { Locks } from "@/lib/get-random-items";
import { getSettings } from "@/lib/settings-storage";
import {
	getSwapOptions,
	type LoadoutSlot,
	rerollLoadoutSlot,
	swapLoadoutItem,
} from "@/lib/swap";
import { useHydrated } from "@/lib/use-hydrated";
import { SlotCard } from "./slot-card";

/** A custom name has no seed; a rolled name carries the seed that regenerates it. */
export type LoadoutNameUpdate = {
	loadoutName: string;
	loadoutNameSeed: null | number;
};

type LoadoutDisplayProps = {
	readonly loadout: ContestantLoadout;
	readonly locks?: Locks;
	/** Enables quick-switching. Receives the new loadout after a slot swap. */
	readonly onChangeLoadout?: (loadout: ContestantLoadout) => void;
	readonly onUpdateLoadoutName?: (name: LoadoutNameUpdate) => void;
	readonly setLocks?: Dispatch<SetStateAction<Locks>>;
};

/** Keeps locks pointing at whatever now occupies the slot the user changed. */
const reconcileLocks = (
	locks: Locks,
	previous: ContestantLoadout,
	next: ContestantLoadout,
	slot: LoadoutSlot,
): Locks => {
	if (slot.kind === "contestant") {
		return {
			contestant: locks.contestant ? next.contestant : undefined,
			gadgets: locks.gadgets?.filter(
				(locked) => next.gadgets[locked.position]?.id === locked.id,
			),
		};
	}

	if (slot.kind === "specialization") {
		return {
			...locks,
			specialization: locks.specialization ? next.specialization : undefined,
		};
	}

	if (slot.kind === "weapon") {
		return { ...locks, weapon: locks.weapon ? next.weapon : undefined };
	}

	const previousId = previous.gadgets[slot.index]?.id;
	const nextGadget = next.gadgets[slot.index];

	return {
		...locks,
		gadgets: locks.gadgets?.map((locked) =>
			locked.id === previousId && nextGadget
				? { ...nextGadget, position: slot.index }
				: locked,
		),
	};
};

export const LoadoutDisplay = ({
	loadout,
	locks,
	onChangeLoadout,
	onUpdateLoadoutName,
	setLocks,
}: LoadoutDisplayProps) => {
	const hydrated = useHydrated();
	const settings = hydrated ? getSettings() : null;
	const showDescription = settings?.showEquipmentDescriptions ?? true;
	const disabledIds = settings?.disabledEquipmentIds ?? [];

	const interactive = Boolean(onChangeLoadout);

	const applyChange = (slot: LoadoutSlot, next: ContestantLoadout) => {
		if (next === loadout) return;
		setLocks?.((current) => reconcileLocks(current, loadout, next, slot));
		onChangeLoadout?.(next);
	};

	const slotProps = (slot: LoadoutSlot) =>
		interactive
			? {
					getOptions: () => getSwapOptions(loadout, slot),
					onReroll: () => applyChange(slot, rerollLoadoutSlot(loadout, slot)),
					onSwap: (itemId: string) =>
						applyChange(slot, swapLoadoutItem(loadout, slot, itemId)),
				}
			: {};

	const contestantAutoLock =
		locks?.specialization || locks?.weapon
			? "Locking a weapon or specialization keeps this class too."
			: undefined;

	const toggle = (key: "contestant" | "specialization" | "weapon") =>
		setLocks
			? () =>
					setLocks((current) => ({
						...current,
						[key]: current[key] ? undefined : loadout[key],
					}))
			: undefined;

	return (
		<section aria-label="Current loadout" className="w-full">
			<LoadoutName
				classLabel={CLASS_LABEL[loadout.contestant.type]}
				loadout={loadout}
				onUpdateLoadoutName={onUpdateLoadoutName}
			/>

			<motion.div
				animate="animate"
				className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-12 lg:gap-3"
				initial="initial"
				variants={{ animate: { transition: { staggerChildren: 0.04 } } }}
			>
				<SlotCard
					className="lg:col-span-3"
					isDisabledInSettings={disabledIds.includes(loadout.contestant.id)}
					item={loadout.contestant}
					locked={Boolean(locks?.contestant || contestantAutoLock)}
					lockedReason={contestantAutoLock}
					onToggleLock={toggle("contestant")}
					showDescription={showDescription}
					slot={{ kind: "contestant" }}
					slotNumber={1}
					{...slotProps({ kind: "contestant" })}
				/>
				<SlotCard
					className="lg:col-span-3"
					isDisabledInSettings={disabledIds.includes(loadout.specialization.id)}
					item={loadout.specialization}
					locked={Boolean(locks?.specialization)}
					onToggleLock={toggle("specialization")}
					showDescription={showDescription}
					slot={{ kind: "specialization" }}
					slotNumber={2}
					{...slotProps({ kind: "specialization" })}
				/>
				<SlotCard
					className="sm:col-span-2 lg:col-span-6"
					isDisabledInSettings={disabledIds.includes(loadout.weapon.id)}
					item={loadout.weapon}
					locked={Boolean(locks?.weapon)}
					onToggleLock={toggle("weapon")}
					showDescription={showDescription}
					slot={{ kind: "weapon" }}
					slotNumber={3}
					{...slotProps({ kind: "weapon" })}
				/>
				{loadout.gadgets.map((gadget, index) => (
					<SlotCard
						className={
							index === 2 ? "sm:col-span-2 lg:col-span-4" : "lg:col-span-4"
						}
						isDisabledInSettings={disabledIds.includes(gadget.id)}
						item={gadget}
						// biome-ignore lint/suspicious/noArrayIndexKey: gadget slots are positional
						key={index}
						locked={Boolean(
							locks?.gadgets?.some(
								(locked) =>
									locked.position === index && locked.id === gadget.id,
							),
						)}
						onToggleLock={
							setLocks
								? () =>
										setLocks((current) => {
											const isLocked = current.gadgets?.some(
												(locked) => locked.position === index,
											);
											return {
												...current,
												gadgets: isLocked
													? current.gadgets?.filter(
															(locked) => locked.position !== index,
														)
													: [
															...(current.gadgets ?? []),
															{ ...gadget, position: index },
														],
											};
										})
								: undefined
						}
						showDescription={showDescription}
						slot={{ index, kind: "gadget" }}
						slotNumber={4 + index}
						{...slotProps({ index, kind: "gadget" })}
					/>
				))}
			</motion.div>
		</section>
	);
};

const LoadoutName = ({
	classLabel,
	loadout,
	onUpdateLoadoutName,
}: {
	readonly classLabel: string;
	readonly loadout: ContestantLoadout;
	readonly onUpdateLoadoutName?: (name: LoadoutNameUpdate) => void;
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [draft, setDraft] = useState(loadout.loadoutName ?? "");
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (isEditing) inputRef.current?.select();
	}, [isEditing]);

	useEffect(() => {
		setDraft(loadout.loadoutName ?? "");
		setIsEditing(false);
	}, [loadout.loadoutName]);

	const commit = () => {
		const trimmed = draft.trim();
		if (trimmed)
			onUpdateLoadoutName?.({ loadoutName: trimmed, loadoutNameSeed: null });
		setIsEditing(false);
	};

	return (
		<div className="mb-5 md:mb-7">
			<div className="mb-2 flex items-center gap-2">
				<span className="tag bg-broadcast text-sm text-ink">
					<span>{classLabel}</span>
				</span>
				<span className="eyebrow">Loadout</span>
			</div>
			{isEditing ? (
				<form
					className="flex items-center gap-2"
					onSubmit={(event) => {
						event.preventDefault();
						commit();
					}}
				>
					<label className="sr-only" htmlFor="loadout-name">
						Loadout name
					</label>
					<input
						className="min-w-0 grow border-b-2 border-cashout bg-transparent font-heading text-4xl font-extrabold uppercase italic leading-tight text-ink outline-none md:text-6xl"
						id="loadout-name"
						maxLength={80}
						onChange={(event) => setDraft(event.target.value)}
						ref={inputRef}
						onKeyDown={(event) => {
							if (event.key === "Escape") setIsEditing(false);
						}}
						value={draft}
					/>
					<IconButton label="Save name" type="submit">
						<CheckIcon size={20} weight="bold" />
					</IconButton>
					<IconButton label="Cancel" onClick={() => setIsEditing(false)}>
						<XIcon size={20} weight="bold" />
					</IconButton>
				</form>
			) : (
				<div className="flex items-start gap-3">
					<h1
						className="grow text-4xl leading-[0.95] select-none md:text-6xl"
						key={loadout.loadoutName}
					>
						<span className="inline-block animate-reel">
							{loadout.loadoutName ?? "Mystery Loadout"}
						</span>
					</h1>
					{onUpdateLoadoutName ? (
						<div className="flex shrink-0 gap-1 pt-1">
							<IconButton
								label="Rename loadout"
								onClick={() => setIsEditing(true)}
							>
								<PencilSimpleIcon size={20} weight="bold" />
							</IconButton>
							<IconButton
								label="Roll a new name"
								onClick={() => onUpdateLoadoutName(rollLoadoutName(loadout))}
							>
								<DiceFiveIcon size={20} weight="fill" />
							</IconButton>
						</div>
					) : null}
				</div>
			)}
		</div>
	);
};

const IconButton = ({
	children,
	label,
	onClick,
	type = "button",
}: {
	readonly children: React.ReactNode;
	readonly label: string;
	readonly onClick?: () => void;
	readonly type?: "button" | "submit";
}) => (
	<button
		aria-label={label}
		className="press flex size-10 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-arena-high hover:text-ink"
		onClick={onClick}
		title={label}
		type={type}
	>
		{children}
	</button>
);

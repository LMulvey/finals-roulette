"use client";

import {
	FloppyDiskIcon,
	LockSimpleIcon,
	ShareNetworkIcon,
	ShuffleIcon,
	XIcon,
} from "@phosphor-icons/react";
import type { ContestantLoadout } from "@repo/schema/roulette";
import { useToast } from "@repo/ui/use-toast";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { LoadoutDisplay } from "@/components/loadout-display";
import { RecentsToggle } from "@/components/recents-toggle";
import { cn } from "@/lib/cvu";
import { getRandomLoadout, type Locks } from "@/lib/get-random-items";
import { getRecentLoadoutKeys, saveRecentLoadout } from "@/lib/recents-storage";
import { addSavedLoadout, getSavedLoadoutKeys } from "@/lib/saved-loadouts";
import { deserializeLoadout, serializeLoadout } from "@/lib/serialize";
import { useHydrated } from "@/lib/use-hydrated";

const countLocks = (locks: Locks) =>
	(locks.contestant ? 1 : 0) +
	(locks.specialization ? 1 : 0) +
	(locks.weapon ? 1 : 0) +
	(locks.gadgets?.length ?? 0);

const isTypingTarget = (target: EventTarget | null) =>
	target instanceof HTMLElement &&
	(target.isContentEditable ||
		/^(INPUT|TEXTAREA|SELECT)$/u.test(target.tagName));

export const Page = () => {
	const params = useParams<{ loadout?: string }>();
	const { toast } = useToast();
	const hydrated = useHydrated();
	const topRef = useRef<HTMLDivElement | null>(null);
	const [loadout, setLoadout] = useState<ContestantLoadout | null>(null);
	const [locks, setLocks] = useState<Locks>({});
	const [savedKeys, setSavedKeys] = useState<string[]>([]);
	const [recentsVersion, setRecentsVersion] = useState(0);

	const loadoutKey = loadout ? serializeLoadout(loadout) : null;
	const isSaved = loadoutKey ? savedKeys.includes(loadoutKey) : false;
	const lockCount = countLocks(locks);

	const showLoadout = useCallback((next: ContestantLoadout) => {
		const nextKey = serializeLoadout(next);
		setLoadout(next);

		if (!getRecentLoadoutKeys().includes(nextKey)) {
			saveRecentLoadout(nextKey);
			setRecentsVersion((version) => version + 1);
		}

		// Native history keeps the URL shareable without re-mounting the route (which would drop locks).
		window.history.replaceState(null, "", `/${nextKey}`);
	}, []);

	const roll = useCallback(() => {
		showLoadout(getRandomLoadout({ locks }));

		const top = topRef.current?.getBoundingClientRect().top ?? 0;
		if (top < 0) {
			topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}, [locks, showLoadout]);

	// Sync from the URL (first load, back/forward); roll a fresh loadout if there isn't a valid one.
	// biome-ignore lint/correctness/useExhaustiveDependencies: keyed on the URL only
	useEffect(() => {
		if (!hydrated) return;
		setSavedKeys(getSavedLoadoutKeys());
		if (params.loadout && params.loadout === loadoutKey) return;
		const fromUrl = params.loadout ? deserializeLoadout(params.loadout) : null;
		if (fromUrl) {
			setLoadout(fromUrl);
		} else if (!loadout) {
			roll();
		}
	}, [hydrated, params.loadout]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (
				event.key.toLowerCase() !== "r" ||
				event.metaKey ||
				event.ctrlKey ||
				event.altKey
			)
				return;
			if (
				isTypingTarget(event.target) ||
				document.querySelector("[data-radix-popper-content-wrapper]")
			)
				return;
			event.preventDefault();
			roll();
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [roll]);

	const share = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			toast({
				description:
					"Post to Reddit, Discord, Friendster, Bluesky, whatever. I don't give a sh*t, I'm not your dad.",
				title: "Copied shareable URL to clipboard",
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error("Failed to copy URL:", error);
			toast({
				description: "Worked fine on my machine so I am blaming you.",
				title: "Failed to copy",
			});
		}
	};

	const save = () => {
		if (!loadoutKey || isSaved) return;
		addSavedLoadout(loadoutKey);
		setSavedKeys(getSavedLoadoutKeys());
		toast({
			description: (
				<>
					<strong>{loadout?.loadoutName ?? "Loadout"}</strong> is in your Saved
					tab.
				</>
			),
			title: "Loadout saved",
		});
	};

	return (
		<div
			className="mx-auto w-full max-w-6xl px-4 pt-6 md:px-8 md:pt-10"
			ref={topRef}
		>
			{loadout ? (
				<LoadoutDisplay
					loadout={loadout}
					locks={locks}
					onChangeLoadout={showLoadout}
					onUpdateLoadoutName={(name) => showLoadout({ ...loadout, ...name })}
					setLocks={setLocks}
				/>
			) : (
				<LoadoutSkeleton />
			)}

			<p className="mt-4 hidden text-sm text-ink-faint md:block">
				Click any slot to swap it. Lock slots to keep them through the next
				roll. Press{" "}
				<kbd className="rounded-sm bg-arena-high px-1.5 py-0.5 font-sans text-xs font-semibold text-ink-soft">
					R
				</kbd>{" "}
				to roll.
			</p>

			<div className="sticky bottom-0 z-20 -mx-4 mt-6 border-t border-line bg-arena/90 px-4 py-3 backdrop-blur-md md:-mx-8 md:px-8">
				<div className="mx-auto flex max-w-6xl items-center gap-2">
					<button
						className="press flex h-12 grow items-center justify-center gap-2 rounded-md bg-cashout px-6 font-heading text-xl font-extrabold uppercase italic text-arena transition-colors hover:bg-cashout-hover sm:grow-0 sm:px-10"
						onClick={roll}
						type="button"
					>
						<ShuffleIcon size={22} weight="bold" />
						{loadout ? "Roll again" : "Roll loadout"}
					</button>

					{lockCount ? (
						<button
							className="press flex h-12 items-center gap-2 rounded-md bg-cashout-soft px-3 text-sm font-semibold text-cashout transition-colors hover:bg-cashout/25"
							onClick={() => setLocks({})}
							title="Clear all locks"
							type="button"
						>
							<LockSimpleIcon size={16} weight="fill" />
							<span className="tabular-nums">{lockCount}</span>
							<span className="hidden sm:inline">locked</span>
							<XIcon size={14} weight="bold" />
						</button>
					) : null}

					<div className="ml-auto flex items-center gap-1">
						<ActionButton
							disabled={!loadout || isSaved}
							label={isSaved ? "Saved" : "Save loadout"}
							onClick={save}
						>
							<FloppyDiskIcon size={22} weight={isSaved ? "fill" : "duotone"} />
						</ActionButton>
						<ActionButton
							disabled={!loadout}
							label="Copy share link"
							onClick={share}
						>
							<ShareNetworkIcon size={22} weight="duotone" />
						</ActionButton>
						<RecentsToggle key={recentsVersion} />
					</div>
				</div>
			</div>
		</div>
	);
};

const ActionButton = ({
	children,
	disabled,
	label,
	onClick,
}: {
	readonly children: React.ReactNode;
	readonly disabled?: boolean;
	readonly label: string;
	readonly onClick: () => void;
}) => (
	<button
		aria-label={label}
		className={cn(
			"press flex size-12 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-arena-high hover:text-ink",
			"disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent",
		)}
		disabled={disabled}
		onClick={onClick}
		title={label}
		type="button"
	>
		{children}
	</button>
);

const SKELETON_SLOTS = [
	{ id: "contestant", span: "lg:col-span-3" },
	{ id: "specialization", span: "lg:col-span-3" },
	{ id: "weapon", span: "sm:col-span-2 lg:col-span-6" },
	{ id: "gadget-1", span: "lg:col-span-4" },
	{ id: "gadget-2", span: "lg:col-span-4" },
	{ id: "gadget-3", span: "sm:col-span-2 lg:col-span-4" },
];

const LoadoutSkeleton = () => (
	<div aria-hidden className="animate-pulse">
		<div className="mb-2 h-6 w-28 bg-arena-raised" />
		<div className="mb-7 h-14 w-3/4 bg-arena-raised" />
		<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-12 lg:gap-3">
			{SKELETON_SLOTS.map(({ id, span }) => (
				<div
					className={cn("notch h-36 bg-arena-raised md:h-52", span)}
					key={id}
				/>
			))}
		</div>
	</div>
);

export default Page;

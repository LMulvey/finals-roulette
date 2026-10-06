"use client";

import {
	heavyClass,
	heavySpecializations,
	heavyWeapons,
} from "@/lib/contestants/heavy";
import {
	lightClass,
	lightSpecializations,
	lightWeapons,
} from "@/lib/contestants/light";
import {
	mediumClass,
	mediumSpecializations,
	mediumWeapons,
} from "@/lib/contestants/medium";
import { cn } from "@/lib/cvu";
import { ALL_GADGETS } from "@/lib/gadgets";
import { useHydrated } from "@/lib/use-hydrated";
import versionData from "../version.json";

const ALL_ITEMS = [
	...heavyWeapons,
	...mediumWeapons,
	...lightWeapons,
	...heavySpecializations,
	...mediumSpecializations,
	...lightSpecializations,
	heavyClass,
	mediumClass,
	lightClass,
	...ALL_GADGETS,
];

const getItemBySeed = (seed: number) => {
	if (!ALL_ITEMS.length) {
		return null;
	}

	return ALL_ITEMS[seed % ALL_ITEMS.length] ?? null;
};

// Picked once per page load in the browser: stable across client-side navigation, new on refresh.
// Only read after hydration, since the server can't know it.
const FOOTER_SEED =
	typeof window === "undefined" ? 0 : Math.floor(Math.random() * 2 ** 31);

const generateBalanceRequest = (
	type: "BUFF" | "NERF",
	seed: number,
	seedOffset: number,
) => {
	const seededItem = getItemBySeed(seed + seedOffset);

	if (!seededItem) {
		return `Love the game Embark but PLEASE ${type.toLowerCase()} something.`;
	}

	return `Love the game Embark but PLEASE ${type.toLowerCase()} the ${seededItem.label}`;
};

export const Footer = () => {
	const hydrated = useHydrated();
	const seed = hydrated ? FOOTER_SEED : 0;

	const embarkRequests = [
		"Embark please add more dance emotes.",
		"Embark, please add an event that spawns a giant turtle that you can ride and flips over to reveal a whole island",
		"EMBARK, ICE ZONE WHEN?",
		generateBalanceRequest("BUFF", seed, 1),
		generateBalanceRequest("NERF", seed, 2),
	];

	const randomRequest = embarkRequests[seed % embarkRequests.length];

	return (
		<footer className="mt-16 border-t border-line bg-arena-sunken">
			<div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm md:flex-row md:items-end md:justify-between md:px-8">
				<div className="space-y-2">
					{/* Invisible until hydrated so the server's placeholder pick never flashes. */}
					<p
						className={cn(
							"font-heading text-lg font-bold uppercase italic leading-tight text-ink-soft transition-opacity",
							!hydrated && "opacity-0",
						)}
					>
						&ldquo;{randomRequest}&rdquo;
					</p>
					<p className="text-ink-faint">
						Equipment content and data from{" "}
						<a
							className="font-semibold text-ink-soft underline decoration-line-strong underline-offset-2 hover:text-ink"
							href="https://thefinals.wiki"
							rel="noopener noreferrer"
							target="_blank"
						>
							thefinals.wiki
						</a>
						. Not affiliated with Embark Studios.
					</p>
					<p className="text-ink-faint">
						Created by{" "}
						<span className="font-semibold text-ink-soft">jjjangus</span> +{" "}
						<span className="line-through decoration-broadcast decoration-2">
							yuri
						</span>{" "}
						<span className="font-semibold text-ink-soft">yiru</span>
					</p>
				</div>
				<p className="font-mono text-xs text-ink-ghost tabular-nums">
					build {versionData.commit.slice(0, 7)} ·{" "}
					{versionData.date.slice(0, 10)}
				</p>
			</div>
		</footer>
	);
};

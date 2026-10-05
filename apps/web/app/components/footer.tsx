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
import { ALL_GADGETS } from "@/lib/gadgets";
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

const hashString = (value: string) => {
	let hash = 0;

	for (let i = 0; i < value.length; i++) {
		hash = (hash << 5) - hash + value.charCodeAt(i);
		hash |= 0;
	}

	return Math.abs(hash);
};

const getItemBySeed = (seed: number) => {
	if (!ALL_ITEMS.length) {
		return null;
	}

	return ALL_ITEMS[seed % ALL_ITEMS.length] ?? null;
};

const FOOTER_SEED = hashString(`${versionData.commit}-${versionData.date}`);

const generateBalanceRequest = (type: "BUFF" | "NERF", seedOffset: number) => {
	const seededItem = getItemBySeed(FOOTER_SEED + seedOffset);

	if (!seededItem) {
		return `Love the game Embark but PLEASE ${type.toLowerCase()} something.`;
	}

	return `Love the game Embark but PLEASE ${type.toLowerCase()} the ${seededItem.label}`;
};

export const Footer = () => {
	const embarkRequests = [
		"Embark please add more dance emotes.",
		"Embark, please add an event that spawns a giant turtle that you can ride and flips over to reveal a whole island",
		"EMBARK, ICE ZONE WHEN?",
		generateBalanceRequest("BUFF", 1),
		generateBalanceRequest("NERF", 2),
	];

	const randomRequest = embarkRequests[FOOTER_SEED % embarkRequests.length];

	return (
		<footer className="mt-16 border-t border-line bg-arena-sunken">
			<div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm md:flex-row md:items-end md:justify-between md:px-8">
				<div className="space-y-2">
					<p className="font-heading text-lg font-bold uppercase italic leading-tight text-ink-soft">
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

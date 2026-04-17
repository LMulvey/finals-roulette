"use client";

import * as motion from "motion/react-client";
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
		<motion.footer
			animate="animate"
			className="w-full bg-black text-gray-300 py-4 align-end absolute bottom-0"
			initial="initial"
			transition={{ duration: 1 }}
			variants={{
				animate: { opacity: 1, y: 0 },
				initial: { opacity: 0, y: 100 },
			}}
		>
			<div className="container mx-auto px-4 text-sm">
				{versionData && (
					<p className="mb-2">
						Hash: {versionData.commit.slice(-8)}
						{new Date(versionData.date).getTime()}
					</p>
				)}
				<p className="mb-2">
					Thanks to{" "}
					<a
						className="text-gray-100 hover:text-white underline"
						href="https://thefinals.wiki"
						rel="noopener noreferrer"
						target="_blank"
					>
						thefinals.wiki
					</a>{" "}
					for equipment content and data
				</p>
				<p className="text-gray-400">{randomRequest}</p>
			</div>
		</motion.footer>
	);
};

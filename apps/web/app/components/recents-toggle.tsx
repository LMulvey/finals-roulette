"use client";

import { ClockCounterClockwiseIcon } from "@phosphor-icons/react";
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from "@repo/ui/popover";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CLASS_LABEL } from "@/lib/equipment";
import { getRecentLoadouts } from "@/lib/recents-storage";

export const RecentsToggle = () => {
	const [recents, setRecents] = useState<ReturnType<typeof getRecentLoadouts>>(
		[],
	);

	useEffect(() => {
		setRecents(getRecentLoadouts());
	}, []);

	return (
		<Popover>
			<PopoverTrigger
				aria-label="Recent rolls"
				className="press flex size-12 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-arena-high hover:text-ink disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent"
				disabled={recents.length < 2}
				title="Recent rolls"
			>
				<ClockCounterClockwiseIcon size={22} weight="duotone" />
			</PopoverTrigger>
			<PopoverContent
				align="end"
				className="w-80 p-1.5"
				collisionPadding={16}
				side="top"
				sideOffset={8}
			>
				<p className="eyebrow px-2 pt-1 pb-2">Recent rolls</p>
				<ol className="flex flex-col">
					{recents.map((recent, index) => (
						<li key={recent.loadoutKey}>
							<PopoverClose asChild>
								<Link
									className="flex items-baseline gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-arena-top"
									href={`/${recent.loadoutKey}`}
								>
									<span className="w-4 shrink-0 font-heading text-xs font-bold italic tabular-nums text-ink-ghost">
										{index + 1}
									</span>
									<span className="min-w-0 grow truncate text-sm text-ink">
										{recent.loadoutName ?? "Unnamed"}
									</span>
									<span className="shrink-0 text-xs text-ink-faint">
										{CLASS_LABEL[recent.contestant.type]} ·{" "}
										{recent.weapon.label}
									</span>
								</Link>
							</PopoverClose>
						</li>
					))}
				</ol>
			</PopoverContent>
		</Popover>
	);
};

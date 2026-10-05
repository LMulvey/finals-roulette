"use client";

import { ShareNetworkIcon, TrashIcon } from "@phosphor-icons/react";
import type { ContestantLoadout } from "@repo/schema/roulette";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@repo/ui/alert-dialog";
import { useToast } from "@repo/ui/use-toast";
import * as motion from "motion/react-client";
import Link from "next/link";
import { cn } from "@/lib/cvu";
import { CLASS_LABEL } from "@/lib/equipment";

const actionClass =
	"press relative z-10 flex size-9 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-arena-top hover:text-ink";

export const LoadoutCard = ({
	active,
	loadout,
	loadoutKey,
	onDelete,
}: {
	readonly active?: boolean;
	readonly loadout: ContestantLoadout;
	readonly loadoutKey: string;
	readonly onDelete: (loadoutKey: string) => void;
}) => {
	const { toast } = useToast();
	const thumbnails = [
		loadout.weapon,
		loadout.specialization,
		...loadout.gadgets,
	];

	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(
				`${window.location.origin}/${loadoutKey}`,
			);
			toast({
				description:
					"Post to Reddit, Discord, Friendster, Bluesky, whatever. I don't give a sh*t, I'm not your dad.",
				title: "Copied shareable URL to clipboard",
			});
		} catch {
			toast({
				description: "Worked fine on my machine so I am blaming you.",
				title: "Failed to copy",
			});
		}
	};

	return (
		<motion.article
			className={cn(
				"notch group relative flex flex-col gap-4 bg-arena-raised p-4 transition-colors hover:bg-arena-high",
				active && "bg-arena-high shadow-[inset_3px_0_0_var(--color-broadcast)]",
			)}
			layout
			variants={{
				animate: {
					opacity: 1,
					transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] },
					y: 0,
				},
				initial: { opacity: 0, y: 12 },
			}}
		>
			<Link
				aria-current={active ? "true" : undefined}
				aria-label={`View ${loadout.loadoutName ?? "saved loadout"}`}
				className="absolute inset-0"
				href={`/saved/${loadoutKey}`}
				scroll={false}
			/>
			<div className="pointer-events-none flex items-start justify-between gap-3">
				<div className="min-w-0">
					<span className="tag mb-2 bg-broadcast text-xs text-ink">
						<span>{CLASS_LABEL[loadout.contestant.type]}</span>
					</span>
					<h2 className="line-clamp-2 text-2xl leading-none">
						{loadout.loadoutName ?? "Saved loadout"}
					</h2>
				</div>
				<div className="pointer-events-auto -mt-1 -mr-1 flex shrink-0">
					<button
						aria-label="Copy share link"
						className={actionClass}
						onClick={copyLink}
						title="Copy share link"
						type="button"
					>
						<ShareNetworkIcon size={18} weight="bold" />
					</button>
					<AlertDialog>
						<AlertDialogTrigger
							aria-label="Delete loadout"
							className={cn(actionClass, "hover:text-nerf")}
							title="Delete"
						>
							<TrashIcon size={18} weight="bold" />
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Delete {loadout.loadoutName ?? "this loadout"}?
								</AlertDialogTitle>
								<AlertDialogDescription>
									It'll be gone from your Saved list. If you've got the share
									link you can still open it, otherwise you'll have to roll it
									again.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Keep it</AlertDialogCancel>
								<AlertDialogAction onClick={() => onDelete(loadoutKey)}>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>

			<ul
				aria-label="Equipment"
				className="pointer-events-none mt-auto flex gap-1"
			>
				{thumbnails.map((item, index) => (
					<li
						className="notch notch-sm spotlight flex size-11 items-center justify-center"
						key={`${item.id}-${index}`}
						title={item.label}
					>
						{item.imageUrl ? (
							// biome-ignore lint/performance/noImgElement: static equipment renders
							<img
								alt={item.label}
								className="equipment-render size-9 object-contain"
								draggable={false}
								src={item.imageUrl}
							/>
						) : null}
					</li>
				))}
			</ul>
			<p className="pointer-events-none -mt-2 truncate text-xs text-ink-faint">
				{loadout.weapon.label} · {loadout.specialization.label}
			</p>
		</motion.article>
	);
};

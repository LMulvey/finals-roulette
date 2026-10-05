"use client";

import {
	ArrowRightIcon,
	FloppyDiskBackIcon,
	XIcon,
} from "@phosphor-icons/react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadoutCard } from "@/components/loadout-card";
import { LoadoutDisplay } from "@/components/loadout-display";
import { PageHeading } from "@/components/page-heading";
import {
	type ContestantLoadoutWithKey,
	deleteSavedLoadout,
	getSavedLoadouts,
} from "@/lib/saved-loadouts";
import { deserializeLoadout } from "@/lib/serialize";
import { useHydrated } from "@/lib/use-hydrated";

export const Page = () => {
	const params = useParams<{ loadout?: string }>();
	const router = useRouter();
	const hydrated = useHydrated();
	const [saved, setSaved] = useState<ContestantLoadoutWithKey[]>([]);

	useEffect(() => {
		if (hydrated) setSaved(getSavedLoadouts());
	}, [hydrated]);

	const selectedKey = params.loadout;
	const selected =
		hydrated && selectedKey ? deserializeLoadout(selectedKey) : null;

	const onDelete = (loadoutKey: string) => {
		deleteSavedLoadout(loadoutKey);
		setSaved(getSavedLoadouts());
		if (loadoutKey === selectedKey) router.push("/saved", { scroll: false });
	};

	return (
		<div className="mx-auto w-full max-w-6xl px-4 pt-6 md:px-8 md:pt-10">
			<PageHeading
				count={hydrated ? saved.length : undefined}
				eyebrow="Your locker"
				title="Saved loadouts"
			/>

			{selected ? (
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="mb-10 border-b border-line pb-10"
					initial={{ opacity: 0, y: 8 }}
					key={selectedKey}
				>
					<div className="mb-4 flex flex-wrap items-center justify-end gap-2">
						<Link
							className="press flex h-10 items-center gap-2 rounded-md bg-cashout px-4 font-heading text-lg font-extrabold uppercase italic text-arena transition-colors hover:bg-cashout-hover"
							href={`/${selectedKey}`}
						>
							Open in roller
							<ArrowRightIcon size={18} weight="bold" />
						</Link>
						<Link
							aria-label="Close"
							className="press flex size-10 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-arena-high hover:text-ink"
							href="/saved"
							scroll={false}
						>
							<XIcon size={20} weight="bold" />
						</Link>
					</div>
					<LoadoutDisplay loadout={selected} />
				</motion.div>
			) : null}

			{!hydrated ? null : saved.length ? (
				<motion.div
					animate="animate"
					className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3"
					initial="initial"
					variants={{ animate: { transition: { staggerChildren: 0.03 } } }}
				>
					{saved.map((loadout) => (
						<LoadoutCard
							active={loadout.loadoutKey === selectedKey}
							key={loadout.loadoutKey}
							loadout={loadout}
							loadoutKey={loadout.loadoutKey}
							onDelete={onDelete}
						/>
					))}
				</motion.div>
			) : (
				<div className="notch flex flex-col items-start gap-4 bg-arena-raised p-8 md:p-12">
					<FloppyDiskBackIcon
						className="text-ink-ghost"
						size={40}
						weight="duotone"
					/>
					<div>
						<h2 className="text-3xl">Nothing in the locker</h2>
						<p className="mt-1 max-w-md text-ink-soft">
							Roll something you like, hit the save button, and it'll live here.
							Saved loadouts stay in this browser.
						</p>
					</div>
					<Link
						className="press flex h-11 items-center gap-2 rounded-md bg-cashout px-5 font-heading text-lg font-extrabold uppercase italic text-arena transition-colors hover:bg-cashout-hover"
						href="/"
					>
						Start rolling
						<ArrowRightIcon size={18} weight="bold" />
					</Link>
				</div>
			)}
		</div>
	);
};

export default Page;

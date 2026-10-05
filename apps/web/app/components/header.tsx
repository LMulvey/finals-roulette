"use client";

import {
	FloppyDiskBackIcon,
	GearSixIcon,
	type Icon,
	NotebookIcon,
	ShuffleIcon,
	SquaresFourIcon,
} from "@phosphor-icons/react";
import { getMostRecentPatch } from "@repo/patch-notes/patches";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cvu";

type NavItem = {
	href: string;
	icon: Icon;
	isActive: (pathname: string) => boolean;
	label: string;
};

const NAV_ITEMS: NavItem[] = [
	{
		href: "/",
		icon: ShuffleIcon,
		isActive: (pathname) =>
			!/^\/(all|settings|patches|saved)(\/|$)/u.test(pathname),
		label: "Roll",
	},
	{
		href: "/saved",
		icon: FloppyDiskBackIcon,
		isActive: (pathname) => pathname.startsWith("/saved"),
		label: "Saved",
	},
	{
		href: "/all",
		icon: SquaresFourIcon,
		isActive: (pathname) => pathname === "/all",
		label: "Equipment",
	},
	{
		href: "/patches",
		icon: NotebookIcon,
		isActive: (pathname) => pathname.startsWith("/patches"),
		label: "Patches",
	},
	{
		href: "/settings",
		icon: GearSixIcon,
		isActive: (pathname) => pathname === "/settings",
		label: "Settings",
	},
];

export const Header = () => {
	const pathname = usePathname();
	const latestPatch = getMostRecentPatch(true);

	return (
		<header className="border-b border-line">
			<div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 pt-4 md:flex-row md:items-end md:justify-between md:gap-6 md:px-8 md:pt-5">
				<div className="flex items-center gap-3 md:pb-4">
					<Link
						aria-label="THE FINALS Roulette home"
						className="shrink-0"
						href="/"
					>
						{/* biome-ignore lint/performance/noImgElement: static logo */}
						<img
							alt=""
							className="h-7 w-auto md:h-9"
							src="/images/logos/the-finals-logo-horizontal.crop.png"
						/>
					</Link>
					<div className="flex items-center gap-1.5">
						<span className="tag bg-broadcast text-sm text-ink">
							<span>Roulette</span>
						</span>
						{latestPatch ? (
							<Link
								className="tag bg-ink text-sm text-arena transition-colors hover:bg-cashout"
								href={`/patches/${latestPatch.version.replaceAll(".", "")}`}
								title={latestPatch.title}
							>
								<span>{latestPatch.updatedNote ?? latestPatch.version}</span>
							</Link>
						) : null}
					</div>
				</div>

				<nav
					aria-label="Main"
					className="-mx-4 -mb-px overflow-x-auto px-4 md:mx-0 md:px-0"
				>
					<ul className="flex min-w-max gap-1">
						{NAV_ITEMS.map(({ href, icon: NavIcon, isActive, label }) => {
							const active = isActive(pathname);

							return (
								<li key={href}>
									<Link
										aria-current={active ? "page" : undefined}
										className={cn(
											"group relative flex items-center gap-1.5 px-2.5 pt-2 pb-3 font-heading text-lg font-bold uppercase italic transition-colors md:pb-4 md:text-xl",
											active ? "text-ink" : "text-ink-faint hover:text-ink",
										)}
										href={href}
									>
										<NavIcon size={18} weight={active ? "fill" : "bold"} />
										{label}
										<span
											aria-hidden
											className={cn(
												"absolute inset-x-1 bottom-0 h-1 origin-left -skew-x-12 bg-broadcast transition-transform duration-200 ease-(--ease-snap)",
												active
													? "scale-x-100"
													: "scale-x-0 group-hover:scale-x-50",
											)}
										/>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
		</header>
	);
};

import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { ALL_PATCHES } from "@repo/patch-notes/patches";
import type { Patch } from "@repo/patch-notes/types";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { countAdjustments, PatchTally } from "@/components/patch-tally";

export const metadata: Metadata = { title: "Patch notes" };

const getSeason = (patch: Patch) => Number(patch.version.split(".")[0]);

const getSeasonName = (patches: Patch[]) => {
	const launch = patches.find((patch) => patch.version.endsWith(".0.0"));
	return launch?.title.split("|")[1]?.trim();
};

export default function Page() {
	const patches = [...ALL_PATCHES].sort(
		(a, b) => b.date.getTime() - a.date.getTime(),
	);
	const latestVersion = patches[0]?.version;

	const seasons = new Map<number, Patch[]>();
	for (const patch of patches) {
		const season = getSeason(patch);
		seasons.set(season, [...(seasons.get(season) ?? []), patch]);
	}

	return (
		<div className="mx-auto w-full max-w-4xl px-4 pt-6 md:px-8 md:pt-10">
			<PageHeading
				count={patches.length}
				eyebrow="From the booth"
				title="Patch notes"
			/>
			<p className="-mt-3 mb-10 max-w-2xl text-ink-soft">
				Only the changes that matter for rolling: weapons, gadgets,
				specializations and contestants. Recent changes show up as badges on
				your loadout.
			</p>

			<div className="space-y-12">
				{[...seasons.entries()].map(([season, seasonPatches]) => {
					const name = getSeasonName(seasonPatches);

					return (
						<section aria-labelledby={`season-${season}`} key={season}>
							<div className="mb-3 flex items-baseline gap-3">
								<h2 className="text-4xl leading-none" id={`season-${season}`}>
									Season {season}
								</h2>
								{name ? <span className="eyebrow">{name}</span> : null}
							</div>
							<ol className="space-y-1">
								{seasonPatches.map((patch) => (
									<li key={patch.version}>
										<Link
											className="notch notch-sm group flex flex-col gap-3 bg-arena-raised px-4 py-3 transition-colors hover:bg-arena-high sm:flex-row sm:items-center sm:gap-5"
											href={`/patches/${patch.version.replaceAll(".", "")}`}
										>
											<div className="flex min-w-0 grow items-center gap-4">
												<span className="w-20 shrink-0 font-heading text-3xl font-extrabold italic tabular-nums leading-none text-ink">
													{patch.version.replace(/\.0$/u, "")}
												</span>
												<span className="min-w-0">
													<span className="flex items-center gap-2">
														<span className="truncate font-semibold text-ink">
															{patch.title.split("|").at(-1)?.trim()}
														</span>
														{patch.version === latestVersion ? (
															<span className="tag bg-broadcast text-xs text-ink">
																<span>Latest</span>
															</span>
														) : null}
													</span>
													<time
														className="block text-sm text-ink-faint"
														dateTime={patch.date.toISOString()}
													>
														{patch.date.toLocaleDateString("en-US", {
															day: "numeric",
															month: "short",
															year: "numeric",
														})}
													</time>
												</span>
											</div>
											<div className="flex items-center justify-between gap-3 sm:justify-end">
												<PatchTally
													counts={countAdjustments(patch.patchNotes)}
												/>
												<ArrowRightIcon
													className="shrink-0 text-ink-ghost transition-transform group-hover:translate-x-0.5 group-hover:text-cashout"
													size={18}
													weight="bold"
												/>
											</div>
										</Link>
									</li>
								))}
							</ol>
						</section>
					);
				})}
			</div>
		</div>
	);
}

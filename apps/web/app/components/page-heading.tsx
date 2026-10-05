import type { ReactNode } from "react";

/** Broadcast-style page title: small eyebrow, big italic heading, optional tabular count. */
export const PageHeading = ({
	children,
	count,
	eyebrow,
	title,
}: {
	readonly children?: ReactNode;
	readonly count?: number;
	readonly eyebrow: string;
	readonly title: string;
}) => (
	<div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8">
		<div>
			<p className="eyebrow mb-1 text-broadcast">{eyebrow}</p>
			<h1 className="flex items-baseline gap-3 text-5xl leading-[0.9] md:text-6xl">
				{title}
				{count === undefined ? null : (
					<span className="font-heading text-2xl font-bold not-italic tabular-nums text-ink-ghost md:text-3xl">
						{String(count).padStart(2, "0")}
					</span>
				)}
			</h1>
		</div>
		{children}
	</div>
);

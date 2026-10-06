"use client";

import { ArrowFatDownIcon, ArrowFatUpIcon } from "@phosphor-icons/react";
import type { StatSeries } from "@repo/patch-notes/history";
import { STAT_DEFINITIONS } from "@repo/patch-notes/stats";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { cn } from "@/lib/cvu";
import {
	changeDirection,
	formatNumber,
	formatPatchDate,
	formatStatValue,
} from "@/lib/stat-format";

type ChartPoint = {
	date: Date | null;
	direction: "buff" | "nerf" | null;
	key: string;
	label: string;
	note: string | undefined;
	previous: number | undefined;
	value: number;
	version: string;
};

const DIRECTION_COLOR = {
	buff: "var(--color-buff)",
	nerf: "var(--color-nerf)",
} as const;

/**
 * Step chart for one stat: a value holds until the patch that changes it.
 * Points are evenly spaced per patch, not by date. Clicking a patch point jumps to its timeline entry.
 */
const StatTrendChart = ({
	notesByVersion,
	onSelectVersion,
	series,
}: {
	/** Note text for each patch that changed this stat, keyed by version. */
	readonly notesByVersion: ReadonlyMap<string, string>;
	readonly onSelectVersion: (version: string) => void;
	readonly series: StatSeries;
}) => {
	const { label, unit } = STAT_DEFINITIONS[series.stat];

	const data: ChartPoint[] = series.points.map((point, index) => {
		const previous = series.points[index - 1]?.value;
		return {
			date: point.date,
			direction:
				previous === undefined
					? null
					: changeDirection(series.stat, previous, point.value),
			key: `${index}`,
			label: point.label,
			note: point.date ? notesByVersion.get(point.version) : undefined,
			previous,
			value: point.value,
			version: point.version,
		};
	});

	const first = data[0];
	const last = data.at(-1);

	return (
		// No `notch` here: its clip-path would cut off the tooltip.
		<figure className="relative rounded-md bg-arena-raised px-3 pt-2 pb-1 focus-within:z-10 hover:z-10">
			<figcaption className="flex items-baseline justify-between gap-2">
				<span className="text-xs text-ink-faint">{label}</span>
				<span className="text-xs font-semibold text-ink tabular-nums">
					{formatStatValue(series.current, unit)}
				</span>
			</figcaption>
			<div className="h-24">
				<ResponsiveContainer height="100%" width="100%">
					<LineChart
						accessibilityLayer
						data={data}
						margin={{ bottom: 0, left: 0, right: 8, top: 8 }}
						onClick={(state) => {
							const point = data[Number(state.activeIndex)];
							if (point?.date) onSelectVersion(point.version);
						}}
						title={`${label} over patches`}
					>
						<CartesianGrid stroke="var(--color-line)" vertical={false} />
						<XAxis
							axisLine={false}
							dataKey="key"
							interval={0}
							tick={({ x, y, payload }) => {
								const isFirst = payload.value === first?.key;
								return (
									<text
										dy={10}
										fill="var(--color-ink-faint)"
										fontSize={10}
										textAnchor={isFirst ? "start" : "end"}
										x={x}
										y={y}
									>
										{data[Number(payload.value)]?.label}
									</text>
								);
							}}
							tickLine={false}
							ticks={first && last ? [first.key, last.key] : []}
						/>
						<YAxis
							axisLine={false}
							domain={["dataMin", "dataMax"]}
							tick={{ fill: "var(--color-ink-faint)", fontSize: 10 }}
							tickCount={3}
							tickFormatter={(value: number) => formatNumber(value)}
							tickLine={false}
							width={32}
						/>
						<Tooltip
							content={({ active, payload }) =>
								active ? (
									<TrendTooltip
										point={payload?.[0]?.payload as ChartPoint | undefined}
										unit={unit}
									/>
								) : null
							}
							allowEscapeViewBox={{ x: false, y: true }}
							cursor={{ stroke: "var(--color-line-strong)", strokeWidth: 1 }}
							wrapperStyle={{ zIndex: 20 }}
							isAnimationActive={false}
						/>
						<Line
							activeDot={({ cx, cy, payload }) => (
								<circle
									className="cursor-pointer"
									cx={cx}
									cy={cy}
									fill={
										payload.direction
											? DIRECTION_COLOR[payload.direction as "buff" | "nerf"]
											: "var(--color-ink)"
									}
									r={6}
									stroke="var(--color-arena-raised)"
									strokeWidth={2}
								/>
							)}
							dataKey="value"
							dot={({ cx, cy, payload, index }) => (
								<circle
									cx={cx}
									cy={cy}
									fill={
										payload.direction
											? DIRECTION_COLOR[payload.direction as "buff" | "nerf"]
											: "var(--color-ink-faint)"
									}
									key={index}
									r={4}
									stroke="var(--color-arena-raised)"
									strokeWidth={2}
								/>
							)}
							isAnimationActive={false}
							stroke="var(--color-ink-ghost)"
							strokeWidth={2}
							type="stepAfter"
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</figure>
	);
};

const TrendTooltip = ({
	point,
	unit,
}: {
	readonly point: ChartPoint | undefined;
	readonly unit: string;
}) => {
	if (!point) return null;

	const delta =
		point.previous === undefined ? null : point.value - point.previous;

	return (
		<div className="w-56 rounded-md border border-line-strong bg-arena-top px-3 py-2 text-sm text-ink shadow-[0_12px_32px_-12px_rgb(0_0_0/0.7)]">
			<p className="flex items-baseline gap-2">
				<span className="font-heading text-xl leading-none font-extrabold tabular-nums">
					{formatStatValue(point.value, unit)}
				</span>
				{delta !== null && delta !== 0 && point.direction ? (
					<span
						className={cn(
							"flex items-center gap-0.5 text-xs tabular-nums",
							point.direction === "buff" ? "text-buff" : "text-nerf",
						)}
					>
						{point.direction === "buff" ? (
							<ArrowFatUpIcon size={10} weight="fill" />
						) : (
							<ArrowFatDownIcon size={10} weight="fill" />
						)}
						<span className="text-ink-soft">
							{delta > 0 ? "+" : "−"}
							{formatStatValue(Math.abs(delta), unit === "×" ? "" : unit)}
						</span>
					</span>
				) : null}
			</p>
			<p className="mt-1 text-xs text-ink-faint">
				{point.label}
				{point.date ? ` · ${formatPatchDate(point.date)}` : null}
			</p>
			{point.note ? (
				<p className="mt-1.5 line-clamp-3 text-xs leading-snug text-ink-soft">
					{point.note}
				</p>
			) : null}
			{point.date ? (
				<p className="mt-1.5 text-[0.65rem] font-semibold tracking-wider text-cashout uppercase">
					Click to see in timeline
				</p>
			) : null}
		</div>
	);
};

export default StatTrendChart;

import { readFile } from "node:fs/promises";
import path from "node:path";
import { deserializeLoadout } from "@repo/roulette/serialize";
import { ImageResponse } from "next/og";
import type { CSSProperties } from "react";
import sharp from "sharp";
import {
	CLASS_LABEL,
	EQUIPMENT_KIND_LABEL,
	type EquipmentItem,
	getEquipmentKind,
	getEquipmentMeta,
} from "@/lib/equipment";

export const runtime = "nodejs";

// Mirrors the arena palette in globals.css.
const COLOR = {
	arena: "#1d1a20",
	arenaRaised: "#25212a",
	broadcast: "#d21f3c",
	ink: "#f1f2fa",
	inkFaint: "rgba(241, 242, 250, 0.48)",
	line: "rgba(241, 242, 250, 0.08)",
};

const HEADING: CSSProperties = {
	fontFamily: "Saira Extra Condensed",
	fontWeight: 800,
	textTransform: "uppercase",
};

const fromCwd = (...segments: string[]) =>
	readFile(path.join(/*turbopackIgnore: true*/ process.cwd(), ...segments));

const loadFonts = async () => {
	const [heading, semibold, bold] = await Promise.all([
		fromCwd("assets/fonts/SairaExtraCondensed-ExtraBold.ttf"),
		fromCwd("assets/fonts/SairaCondensed-SemiBold.ttf"),
		fromCwd("assets/fonts/SairaCondensed-Bold.ttf"),
	]);
	return [
		{ name: "Saira Extra Condensed", data: heading, weight: 800 as const },
		{ name: "Saira Condensed", data: semibold, weight: 600 as const },
		{ name: "Saira Condensed", data: bold, weight: 700 as const },
	];
};

const SLOT_HEIGHT = 160;

const asDataUrl = (png: Buffer) =>
	`data:image/png;base64,${png.toString("base64")}`;

/** Fades art out to the left, like the `.slot-art` and `.slot-stage` masks. */
const fadeLeft = (
	width: number,
	solidFrom: number,
	clearAt: number,
	opacity = 1,
) =>
	Buffer.from(
		`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${SLOT_HEIGHT}"><defs><linearGradient id="f" x1="1" x2="0"><stop offset="${solidFrom}" stop-color="#fff" stop-opacity="${opacity}"/><stop offset="${clearAt}" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#f)"/></svg>`,
	);

/**
 * Slot art as the site layers it, baked into one PNG because ImageResponse
 * can't read webp or apply masks, blend modes or filters.
 */
const slotArt = async (item: EquipmentItem, width: number) => {
	if (!item.imageUrl) return null;
	const source = await fromCwd("public", item.imageUrl);

	if (getEquipmentKind(item) === "contestant") {
		const png = await sharp(source)
			.resize(width, SLOT_HEIGHT, { fit: "cover", position: "top" })
			.grayscale()
			.ensureAlpha()
			.composite([{ input: fadeLeft(width, 0.3, 0.95, 0.5), blend: "dest-in" }])
			.png()
			.toBuffer();
		return asDataUrl(png);
	}

	// Equipment renders sit under a stage light in the panel's right side.
	const render = await sharp(source)
		.resize(Math.round(width * 0.82), Math.round(SLOT_HEIGHT * 0.72), {
			fit: "inside",
		})
		.modulate({ brightness: 1.15 })
		.png()
		.toBuffer();
	const stageLight = Buffer.from(
		`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${SLOT_HEIGHT}"><defs><radialGradient id="s" cx="0.55" cy="0.5" r="0.75" gradientTransform="translate(0.55 0.5) scale(0.55 0.5) translate(-0.55 -0.5)"><stop offset="0" stop-color="#f1f2fa" stop-opacity="0.14"/><stop offset="1" stop-color="#f1f2fa" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#s)"/></svg>`,
	);
	const png = await sharp({
		create: {
			width,
			height: SLOT_HEIGHT,
			channels: 4,
			background: { r: 0, g: 0, b: 0, alpha: 0 },
		},
	})
		.composite([
			{ input: stageLight },
			{ input: render, gravity: "center" },
			{ input: fadeLeft(width, 0.55, 1), blend: "dest-in" },
		])
		.png()
		.toBuffer();
	return asDataUrl(png);
};

/** Art covers the right ~60% of a slot, as on the site. */
const artWidth = (item: EquipmentItem, slotWidth: number) =>
	Math.round(
		slotWidth * (getEquipmentKind(item) === "contestant" ? 0.62 : 0.64),
	);

/** The `.notch` clipped corner from the site's equipment panels. */
const notch = (width: number, size: number) =>
	`polygon(0 0, ${width - size}px 0, ${width}px ${size}px, ${width}px 100%, 0 100%)`;

/** Broadcast lower-third tag: skewed block, upright text. */
const Tag = ({
	children,
	background,
	color,
}: {
	readonly children: string;
	readonly background: string;
	readonly color: string;
}) => (
	<div
		style={{
			display: "flex",
			padding: "0 12px",
			background,
			transform: "skewX(-10deg)",
		}}
	>
		<div
			style={{
				...HEADING,
				display: "flex",
				color,
				fontSize: 26,
				lineHeight: 1.25,
				transform: "skewX(10deg)",
			}}
		>
			{children}
		</div>
	</div>
);

const Slot = ({
	art,
	item,
	number,
	title,
	width,
}: {
	readonly art: string | null;
	readonly item: EquipmentItem;
	readonly number: number;
	readonly title: string;
	readonly width: number;
}) => {
	return (
		<div
			style={{
				position: "relative",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				width,
				height: SLOT_HEIGHT,
				padding: "16px 18px",
				background: COLOR.arenaRaised,
				clipPath: notch(width, 18),
				overflow: "hidden",
			}}
		>
			{art ? (
				// biome-ignore lint/performance/noImgElement: ImageResponse renders embedded assets
				<img
					alt=""
					src={art}
					width={artWidth(item, width)}
					height={SLOT_HEIGHT}
					style={{ position: "absolute", top: 0, right: 0 }}
				/>
			) : null}
			<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
				<div style={{ ...HEADING, color: COLOR.broadcast, fontSize: 20 }}>
					{String(number).padStart(2, "0")}
				</div>
				<div
					style={{
						...HEADING,
						color: COLOR.inkFaint,
						fontSize: 17,
						fontWeight: 700,
						fontFamily: "Saira Condensed",
						letterSpacing: 1.4,
					}}
				>
					{title}
				</div>
			</div>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					style={{
						color: COLOR.inkFaint,
						fontSize: 15,
						fontWeight: 600,
						letterSpacing: 1.5,
						textTransform: "uppercase",
					}}
				>
					{getEquipmentMeta(item)}
				</div>
				<div
					style={{
						...HEADING,
						color: COLOR.ink,
						fontSize: 40,
						lineHeight: 1,
						maxWidth: width - 36,
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{item.label}
				</div>
			</div>
		</div>
	);
};

const nameSize = (name: string) => {
	if (name.length <= 30) return 84;
	if (name.length <= 42) return 64;
	return 50;
};

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ loadout: string }> },
) {
	const { loadout: key } = await params;
	const loadout = deserializeLoadout(key);
	if (!loadout) return new Response("Invalid loadout", { status: 404 });

	const name = loadout.loadoutName ?? "Mystery Loadout";
	// Grid widths follow the 12-column desktop layout: 3/3/6, then 4/4/4.
	const slots = [
		{ item: loadout.contestant, title: "Contestant", width: 267 },
		{
			item: loadout.specialization,
			title: EQUIPMENT_KIND_LABEL.specialization,
			width: 267,
		},
		{ item: loadout.weapon, title: EQUIPMENT_KIND_LABEL.weapon, width: 546 },
		...loadout.gadgets.map((gadget, index) => ({
			item: gadget,
			title: `Gadget ${index + 1}`,
			width: 360,
		})),
	];

	const [fonts, logo, ...art] = await Promise.all([
		loadFonts(),
		fromCwd("public/images/logos/the-finals-logo-horizontal.crop.png").then(
			asDataUrl,
		),
		...slots.map(({ item, width }) => slotArt(item, artWidth(item, width))),
	]);

	return new ImageResponse(
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				height: "100%",
				padding: "36px 48px 44px",
				background: COLOR.arena,
				// A single stage light from above, as on the site.
				backgroundImage:
					"radial-gradient(120% 60% at 50% -10%, rgba(210, 31, 60, 0.16), transparent 60%)",
				color: COLOR.ink,
				fontFamily: "Saira Condensed",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 14,
					paddingBottom: 22,
					borderBottom: `1px solid ${COLOR.line}`,
				}}
			>
				{/* biome-ignore lint/performance/noImgElement: ImageResponse renders embedded assets */}
				<img alt="" src={logo} height={34} style={{ height: 34 }} />
				<Tag background={COLOR.broadcast} color={COLOR.ink}>
					Roulette
				</Tag>
			</div>

			<div style={{ display: "flex", flexDirection: "column", marginTop: 26 }}>
				<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
					<Tag background={COLOR.broadcast} color={COLOR.ink}>
						{CLASS_LABEL[loadout.contestant.type]}
					</Tag>
					<div
						style={{
							color: COLOR.inkFaint,
							fontSize: 20,
							fontWeight: 700,
							letterSpacing: 1.6,
							textTransform: "uppercase",
						}}
					>
						Loadout
					</div>
				</div>
				<div
					style={{
						...HEADING,
						display: "flex",
						alignItems: "center",
						height: 92,
						fontSize: nameSize(name),
						lineHeight: 0.95,
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{name}
				</div>
			</div>

			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: 12,
					marginTop: "auto",
				}}
			>
				{slots.map((slot, index) => (
					<Slot
						art={art[index] ?? null}
						item={slot.item}
						key={slot.title}
						number={index + 1}
						title={slot.title}
						width={slot.width}
					/>
				))}
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts,
			headers: { "Cache-Control": "public, max-age=86400, s-maxage=86400" },
		},
	);
}

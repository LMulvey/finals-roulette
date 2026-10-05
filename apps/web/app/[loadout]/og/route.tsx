import { readFile } from "node:fs/promises";
import path from "node:path";
import { deserializeLoadout } from "@repo/roulette/serialize";
import { ImageResponse } from "next/og";
import { getLoadoutPreview } from "@/lib/loadout-preview";

export const runtime = "nodejs";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ loadout: string }> },
) {
	const { loadout: key } = await params;
	const loadout = deserializeLoadout(key);
	if (!loadout) return new Response("Invalid loadout", { status: 404 });

	const { name, className } = getLoadoutPreview(loadout);
	const portrait = await readFile(
		path.join(
			process.cwd(),
			"public/images/contestants",
			`${loadout.contestant.type}.png`,
		),
	);
	const equipment = [
		{ label: "WEAPON", value: loadout.weapon.label },
		{ label: "SPECIALIZATION", value: loadout.specialization.label },
		...loadout.gadgets.map((gadget, index) => ({
			label: `GADGET ${index + 1}`,
			value: gadget.label,
		})),
	];

	return new ImageResponse(
		<div
			style={{
				display: "flex",
				width: "100%",
				height: "100%",
				background: "#1d1a20",
				color: "#f1f2fa",
				fontFamily: "sans-serif",
				padding: 44,
				borderTop: "12px solid #d21f3c",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column", width: 800 }}>
				<div
					style={{
						display: "flex",
						color: "#facc15",
						fontSize: 22,
						fontWeight: 700,
						letterSpacing: 3,
					}}
				>
					THE FINALS ROULETTE
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 22,
						fontSize: 24,
						color: "#f1f2fa",
					}}
				>
					{className.toUpperCase()} CONTESTANT
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 10,
						height: 122,
						overflow: "hidden",
						fontSize: name.length > 40 ? 40 : 54,
						fontWeight: 700,
						lineHeight: 1.1,
					}}
				>
					{name}
				</div>
				<div
					style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}
				>
					{equipment.map((item, index) => (
						<div
							key={item.label}
							style={{
								display: "flex",
								flexDirection: "column",
								width: index < 2 ? 380 : 249,
								height: 104,
								padding: 16,
								background: "#2f2a35",
								borderLeft: "3px solid #d21f3c",
							}}
						>
							<div
								style={{
									display: "flex",
									fontSize: 14,
									letterSpacing: 2,
									color: "#facc15",
								}}
							>
								{item.label}
							</div>
							<div
								style={{
									display: "flex",
									fontSize: 24,
									fontWeight: 700,
									marginTop: 8,
								}}
							>
								{item.value}
							</div>
						</div>
					))}
				</div>
			</div>
			{/* biome-ignore lint/performance/noImgElement: ImageResponse renders embedded assets */}
			<img
				alt=""
				src={`data:image/png;base64,${portrait.toString("base64")}`}
				width={280}
				height={460}
				style={{ objectFit: "contain", alignSelf: "flex-end" }}
			/>
		</div>,
		{
			width: 1200,
			height: 630,
			headers: { "Cache-Control": "public, max-age=86400, s-maxage=86400" },
		},
	);
}

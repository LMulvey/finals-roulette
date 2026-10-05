import { deserializeLoadout } from "@repo/roulette/serialize";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { getLoadoutPreview } from "@/lib/loadout-preview";

export { default } from "../page";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ loadout: string }>;
}): Promise<Metadata> {
	const { loadout: key } = await params;
	// Decode without browser settings so everyone sees the build in the shared URL.
	const loadout = deserializeLoadout(key);
	if (!loadout) return {};

	const { title, description } = getLoadoutPreview(loadout);
	const requestHeaders = await headers();
	const host =
		requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
	const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
	const origin = `${protocol}://${host}`;
	const url = new URL(`/${encodeURIComponent(key)}`, origin).href;
	const images = [
		{ url: `${url}/og`, width: 1200, height: 630, alt: description },
	];

	return {
		title: { absolute: title },
		description,
		openGraph: {
			type: "website",
			siteName: "THE FINALS Roulette",
			title,
			description,
			url,
			images,
		},
		twitter: { card: "summary_large_image", title, description, images },
	};
}

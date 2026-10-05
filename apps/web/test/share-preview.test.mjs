import assert from "node:assert/strict";
import { test } from "node:test";
import { heavyClass } from "@repo/roulette/contestants/heavy";
import { lightClass } from "@repo/roulette/contestants/light";
import { mediumClass } from "@repo/roulette/contestants/medium";
import { generateLoadoutNameFromSeed } from "@repo/roulette/generate-loadout-name";
import { getContestantMeta } from "@repo/roulette/get-random-items";
import { deserializeLoadout, serializeLoadout } from "@repo/roulette/serialize";

// Run against a built, running app: SHARE_TEST_URL=http://localhost:3015 pnpm test:share
const origin = process.env.SHARE_TEST_URL ?? "http://localhost:3000";
const escapeHtml = (text) =>
	text
		.replaceAll("&", "&amp;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#x27;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
const images = new Set();

for (const contestant of [lightClass, mediumClass, heavyClass]) {
	for (const format of ["seed", "custom", "legacy", "unnamed"]) {
		test(`${contestant.type} ${format} link has crawler metadata and a distinct PNG`, async () => {
			const meta = getContestantMeta(contestant.type);
			const loadout = {
				contestant,
				weapon: meta.weapons[0],
				specialization: meta.specializations[0],
				gadgets: meta.gadgets.slice(0, 3),
				loadoutName: null,
			};
			if (format === "seed") {
				loadout.loadoutNameSeed = 42;
				loadout.loadoutName = generateLoadoutNameFromSeed(loadout, 42);
			} else if (format === "legacy") {
				loadout.loadoutName = 'Legacy <42> & "friends"';
			} else if (format !== "unnamed") {
				loadout.loadoutName = 'Build <42> & "friends" — café';
			}
			const key =
				format === "legacy"
					? Buffer.from(
							[
								...loadout.gadgets.map((item) => item.id),
								contestant.id,
								loadout.specialization.id,
								loadout.weapon.id,
								`%name%:${loadout.loadoutName}`,
							].join(","),
							"binary",
						).toString("base64url")
					: serializeLoadout(loadout);
			const decoded = deserializeLoadout(key);
			assert.ok(decoded);
			const className =
				contestant.type[0].toUpperCase() + contestant.type.slice(1);
			const title = `${decoded.loadoutName ?? `${className} loadout`} · THE FINALS Roulette`;
			const description = `${className} contestant with ${decoded.weapon.label}, ${decoded.specialization.label}, and ${decoded.gadgets.map((item) => item.label).join(", ")}.`;
			const response = await fetch(`${origin}/${key}`, {
				headers: { "User-Agent": "Twitterbot/1.0" },
			});
			assert.equal(response.status, 200);
			const html = await response.text();
			const head = html.split("</head>")[0];
			assert.ok(
				head.includes(`<title>${escapeHtml(title)}</title>`),
				"title is delivered before the body",
			);
			for (const prefix of ["og", "twitter"]) {
				assert.ok(
					head.includes(`${prefix}:title" content="${escapeHtml(title)}"`),
				);
				assert.ok(
					head.includes(
						`${prefix}:description" content="${escapeHtml(description)}"`,
					),
				);
				assert.ok(
					head.includes(`${prefix}:image" content="${origin}/${key}/og"`),
				);
			}
			assert.ok(head.includes('twitter:card" content="summary_large_image"'));
			const image = await fetch(`${origin}/${key}/og`);
			assert.equal(image.status, 200);
			assert.equal(image.headers.get("content-type"), "image/png");
			const png = Buffer.from(await image.arrayBuffer());
			assert.equal(png.subarray(1, 4).toString(), "PNG");
			assert.equal(png.readUInt32BE(16), 1200);
			assert.equal(png.readUInt32BE(20), 630);
			if (format !== "legacy") {
				assert.ok(
					!images.has(png.toString("base64")),
					"different builds have different images",
				);
				images.add(png.toString("base64"));
			}
		});
	}
}

test("invalid link uses generic metadata and its OG endpoint returns 404", async () => {
	const response = await fetch(`${origin}/2invalid`, {
		headers: { "User-Agent": "Twitterbot/1.0" },
	});
	assert.equal(response.status, 200);
	const html = await response.text();
	assert.ok(html.includes("<title>THE FINALS Roulette</title>"));
	assert.ok(!html.includes('property="og:image"'));
	assert.equal((await fetch(`${origin}/2invalid/og`)).status, 404);
});

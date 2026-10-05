import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import * as codes from "../dist/codes.js";
import { ALL_GADGETS } from "../dist/gadgets.js";
import { ALL_SPECIALIZATIONS, ALL_WEAPONS } from "../dist/contestants/aggregate.js";
import { getRandomLoadout } from "../dist/get-random-items.js";
import { deserializeLoadout, serializeLoadout } from "../dist/serialize.js";

const pinned = JSON.parse(readFileSync(new URL("./pinned-codes.json", import.meta.url), "utf8"));

const sameItems = (a, b) =>
	a.contestant.id === b.contestant.id &&
	a.specialization.id === b.specialization.id &&
	a.weapon.id === b.weapon.id &&
	a.gadgets.map((g) => g.id).join() === b.gadgets.map((g) => g.id).join();

test("code tables are append-only (existing codes never move)", () => {
	for (const [table, pinnedIds] of Object.entries(pinned)) {
		const current = codes[table];
		assert.ok(current.length >= pinnedIds.length, `${table} shrank — never delete entries, use null`);
		pinnedIds.forEach((id, index) => {
			assert.ok(
				current[index] === id || current[index] === null,
				`${table}[${index}] changed from "${id}" to "${current[index]}" — this breaks existing share links`,
			);
		});
	}
});

test("code tables fit one base64url char and have no duplicates", () => {
	for (const table of ["CONTESTANT_CODES", "SPECIALIZATION_CODES", "WEAPON_CODES", "GADGET_CODES"]) {
		const ids = codes[table].filter(Boolean);
		assert.ok(codes[table].length <= 64, `${table} exceeds 64 entries`);
		assert.equal(new Set(ids).size, ids.length, `${table} has duplicate ids`);
	}
});

test("every item has a share code", () => {
	for (const item of ALL_WEAPONS) assert.ok(codes.WEAPON_CODES.includes(item.id), `add ${item.id} to WEAPON_CODES`);
	for (const item of ALL_SPECIALIZATIONS)
		assert.ok(codes.SPECIALIZATION_CODES.includes(item.id), `add ${item.id} to SPECIALIZATION_CODES`);
	for (const item of ALL_GADGETS) assert.ok(codes.GADGET_CODES.includes(item.id), `add ${item.id} to GADGET_CODES`);
});

test("rolled loadouts round-trip with a short seeded name", () => {
	for (let i = 0; i < 2000; i++) {
		const loadout = getRandomLoadout({ locks: {} });
		const key = serializeLoadout(loadout);
		assert.equal(key.length, 11, key);
		const decoded = deserializeLoadout(key);
		assert.ok(decoded && sameItems(decoded, loadout), key);
		assert.equal(decoded.loadoutName, loadout.loadoutName);
	}
});

test("custom and unicode names survive exactly", () => {
	const loadout = getRandomLoadout({ locks: {} });
	for (const loadoutName of ["My Sweaty Build", "Émile's 🔥 build, with commas", "x"]) {
		const key = serializeLoadout({ ...loadout, loadoutName, loadoutNameSeed: null });
		assert.equal(deserializeLoadout(key).loadoutName, loadoutName);
	}
});

test("a stale seed falls back to the exact name text", () => {
	const loadout = getRandomLoadout({ locks: {} });
	const swapped = { ...loadout, loadoutName: "Kept After A Swap", loadoutNameSeed: loadout.loadoutNameSeed };
	assert.equal(deserializeLoadout(serializeLoadout(swapped)).loadoutName, "Kept After A Swap");
});

test("legacy keys still decode", () => {
	const legacy = Buffer.from(
		"hover-pad,breach-drill,jump-pad,medium-contestant,healing-beam,p90,%name%:The Medic-Machine Breach Drill Tryhard-slayer",
	).toString("base64url");
	const decoded = deserializeLoadout(legacy);
	assert.equal(decoded.weapon.id, "p90");
	assert.equal(decoded.loadoutName, "The Medic-Machine Breach Drill Tryhard-slayer");
});

test("garbage and cross-class keys are rejected", () => {
	assert.equal(deserializeLoadout("2!!!!!!"), null);
	assert.equal(deserializeLoadout("2A"), null);
	// light contestant (A) with a heavy-only weapon code
	const heavyWeapon = codes.WEAPON_CODES.indexOf("sledgehammer");
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
	assert.equal(deserializeLoadout(`2AA${alphabet[heavyWeapon]}AAB`), null);
});

import assert from "node:assert/strict";
import { test } from "node:test";
import { compareVersions, getItemHistory } from "../dist/history.js";
import { validateStatHistory } from "../dist/validate.js";

const note = (target, changes, extra = {}) => ({
	adjustmentType: "buff",
	category: "weapons",
	changes,
	note: "",
	section: "balance",
	target,
	...extra,
});

const patch = (version, patchNotes) => ({
	date: new Date(`2026-01-${String(version.split(".")[1]).padStart(2, "0")}T00:00:00`),
	description: "",
	originalUrl: "",
	patchNotes,
	title: version,
	version,
});

const baseline = (items, exceptions = []) => ({ asOfVersion: "11.5.0", exceptions, items });

const PATCHES = [
	patch("11.7.0", [note("gun", [{ from: 50, stat: "damage", to: 52 }])]),
	patch("11.2.0", [note("gun", [{ from: 45, stat: "damage", to: 48 }])]),
	patch("11.4.0", [
		note("gun", [{ from: 48, stat: "damage", to: 50 }]),
		note("gun", [{ from: 50, stat: "damage", to: 99 }], { temporary: true }),
		note("gun", [{ from: 1, label: "Pull distance", stat: "other", to: 2, unit: "m" }]),
	]),
];

test("versions compare numerically", () => {
	assert.ok(compareVersions("11.10.0", "11.9.0") > 0);
	assert.ok(compareVersions("9.9.0", "10.0.0") < 0);
	assert.equal(compareVersions("8.0.1", "8.0.1"), 0);
});

test("series runs oldest to newest from the first change's `from`, skipping temporary notes", () => {
	const { stats } = getItemHistory("gun", PATCHES, baseline({ gun: { damage: 50 } }));
	const damage = stats.find((series) => series.stat === "damage");

	assert.deepEqual(
		damage.points.map((point) => [point.label, point.value]),
		[
			["Before 11.2.0", 45],
			["11.2.0", 48],
			["11.4.0", 50],
			["11.7.0", 52],
		],
	);
	assert.equal(damage.current, 52);
});

test("baseline-only stats get a single point; unknown stats are omitted", () => {
	const { stats } = getItemHistory("gun", PATCHES, baseline({ gun: { damage: 50, "fire-rate": 600 } }));

	assert.deepEqual(
		stats.map((series) => series.stat),
		["damage", "fire-rate"],
	);
	const fireRate = stats.find((series) => series.stat === "fire-rate");
	assert.deepEqual(fireRate.points, [{ date: null, label: "As of 11.5.0", value: 600, version: "11.5.0" }]);
});

test("timeline lists every touching patch newest first, temporary notes included", () => {
	const { entries, otherChanges } = getItemHistory("gun", PATCHES, baseline({}));

	assert.deepEqual(
		entries.map((entry) => entry.patch.version),
		["11.7.0", "11.4.0", "11.2.0"],
	);
	assert.equal(entries[1].notes.length, 3);
	assert.deepEqual(
		otherChanges.map((change) => [change.label, change.from, change.to]),
		[["Pull distance", 1, 2]],
	);
});

test("validation passes a continuous chain that meets the baseline", () => {
	const result = validateStatHistory({
		baseline: baseline({ gun: { damage: 50 } }),
		knownIds: new Set(["gun"]),
		patches: PATCHES,
	});
	assert.deepEqual(result.errors, []);
});

test("validation flags broken chains, baseline mismatches and unknown targets", () => {
	const broken = [
		...PATCHES,
		patch("11.8.0", [note("gun", [{ from: 60, stat: "damage", to: 61 }])]),
		patch("11.9.0", [note("ghost", [{ from: 1, stat: "damage", to: 2 }])]),
	];
	const { errors } = validateStatHistory({
		baseline: baseline({ gun: { damage: 49 } }),
		knownIds: new Set(["gun"]),
		patches: broken,
	});

	assert.ok(errors.some((error) => error.includes("baseline 11.5.0 is 49")));
	assert.ok(errors.some((error) => error.includes("11.8.0 changes from 60")));
	assert.ok(errors.some((error) => error.includes('unknown target "ghost"')));
});

test("exceptions let a known chain break pass", () => {
	const broken = [...PATCHES, patch("11.8.0", [note("gun", [{ from: 60, stat: "damage", to: 61 }])])];
	const { errors } = validateStatHistory({
		baseline: baseline({ gun: { damage: 50 } }, [
			{ itemId: "gun", reason: "unannounced change", stat: "damage", version: "11.8.0" },
		]),
		knownIds: new Set(["gun"]),
		patches: broken,
	});
	assert.deepEqual(errors, []);
});

test("numeric note text without structured changes is a warning", () => {
	const { errors, warnings } = validateStatHistory({
		baseline: baseline({}),
		knownIds: new Set(["gun"]),
		patches: [patch("11.1.0", [note("gun", undefined, { note: "Increased damage from 45 to 48." })])],
	});
	assert.deepEqual(errors, []);
	assert.equal(warnings.length, 1);
});

test("a baseline that disagrees with the chain adds a 'By' point and wins as current", () => {
	const { stats } = getItemHistory("gun", PATCHES, baseline({ gun: { damage: 47 } }));
	const damage = stats.find((series) => series.stat === "damage");

	assert.deepEqual(
		damage.points.map((point) => [point.label, point.value]),
		[
			["Before 11.2.0", 45],
			["11.2.0", 48],
			["11.4.0", 50],
			["By 11.5.0", 47],
			["11.7.0", 52],
		],
	);
	assert.equal(damage.current, 52);
});

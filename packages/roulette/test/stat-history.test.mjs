import assert from "node:assert/strict";
import { test } from "node:test";
import { validateStatHistory } from "@repo/patch-notes/validate";
import { ALL_ITEMS } from "../dist/contestants/aggregate.js";

test("patch-note stat changes chain cleanly into the baseline", () => {
	const { errors, warnings } = validateStatHistory({ knownIds: new Set(ALL_ITEMS.map((item) => item.id)) });

	for (const warning of warnings) console.warn(`warn: ${warning}`);
	assert.deepEqual(errors, [], `\n${errors.join("\n")}`);
});

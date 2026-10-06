# Equipment Patch History — Design

Date: 2026-10-06
Status: Approved in conversation, pending spec review

## Goal

Let players open any piece of equipment (weapon, gadget, specialization, contestant) and see how it has changed across patches: current stats, a trend for each numeric stat, and a dated timeline of every balance note. Stat data must be structured so that future patch-note scrapes keep it current without manual upkeep beyond the scrape itself.

## Decisions

| Question | Decision |
|---|---|
| What the snapshot shows | Timeline + accurate stat trends from structured data (option C) |
| How stats are named | Closed list of stat keys, plus `other` with a free-text label |
| Values that predate our patch data (pre-Season 5) | One-time dated baseline snapshot; history derived from baseline + change log |
| Where it opens | Equipment screen (tile click) and loadouts (info icon) |
| Presentation | Sheet: bottom sheet on mobile, right drawer from `md` up |
| Deep links | Out of scope for now |

## 1. Data model (`packages/patch-notes`)

### `src/stats.ts` — stat vocabulary

```ts
export const STAT_DEFINITIONS = {
  damage:                 { label: "Damage",         unit: "",    lowerIsBetter: false },
  "headshot-multiplier":  { label: "Headshot mult.", unit: "×",   lowerIsBetter: false },
  "fire-rate":            { label: "Fire rate",      unit: "RPM", lowerIsBetter: false },
  "magazine-size":        { label: "Magazine",       unit: "",    lowerIsBetter: false },
  "reload-time":          { label: "Reload",         unit: "s",   lowerIsBetter: true },
  "equip-time":           { label: "Equip time",     unit: "s",   lowerIsBetter: true },
  "unequip-time":         { label: "Unequip time",   unit: "s",   lowerIsBetter: true },
  "falloff-min-range":    { label: "Falloff start",  unit: "m",   lowerIsBetter: false },
  "falloff-max-range":    { label: "Falloff end",    unit: "m",   lowerIsBetter: false },
  "falloff-multiplier":   { label: "Falloff mult.",  unit: "×",   lowerIsBetter: false },
  cooldown:               { label: "Cooldown",       unit: "s",   lowerIsBetter: true },
  charges:                { label: "Charges",        unit: "",    lowerIsBetter: false },
  duration:               { label: "Duration",       unit: "s",   lowerIsBetter: false },
  radius:                 { label: "Radius",         unit: "m",   lowerIsBetter: false },
  range:                  { label: "Range",          unit: "m",   lowerIsBetter: false },
  health:                 { label: "Health",         unit: "HP",  lowerIsBetter: false },
  "environmental-damage": { label: "Env. damage",    unit: "",    lowerIsBetter: false },
} as const satisfies Record<string, StatDefinition>;

export type StatKey = keyof typeof STAT_DEFINITIONS;
```

- The list is finalised during backfill. Rule: a stat earns a key only if it is used by at least two items; otherwise it uses `other`.
- `lowerIsBetter` drives buff/nerf colouring in charts and deltas.

### `PatchNote.changes` — structured diff (in `src/types.ts`)

```ts
export type StatChange =
  | { stat: StatKey; from: number; to: number }
  | { stat: "other"; label: string; from: number; to: number; unit?: string };

export type PatchNote = {
  // ...existing fields unchanged
  changes?: StatChange[];
};
```

- `note` remains the human-readable source text; `changes` is its machine-readable mirror.
- A note covering several stats produces several entries.
- Optional, so all existing patch files remain valid; backfill adds it to every note with a numeric "from X to Y" change.

### `src/baseline.ts` — one-time snapshot

```ts
export type StatBaseline = {
  asOfVersion: string;
  items: Record<string, Partial<Record<StatKey, number>>>;
  exceptions: Array<{ itemId: string; stat: StatKey; version: string; reason: string }>;
};

export const STAT_BASELINE = {
  asOfVersion: "11.10.0",
  items: {
    "pike-556": { damage: 56, "headshot-multiplier": 1.75, /* ... */ },
    zipline: { cooldown: 30, range: 50 },
    // ...
  },
  exceptions: [],
} satisfies StatBaseline;
```

- Keyed by the same IDs used as `PatchNote.target` (weapon/gadget/specialization IDs; contestant classes by their ID).
- Core stats per kind: weapons — damage, fire rate, magazine size, headshot multiplier, falloff; gadgets/specializations — cooldown, charges, duration, radius/range where applicable; contestants — health.
- Sourced once from the community wiki / in-game values as of `asOfVersion`. Never edited by scrapes; changed only to correct an error the validation test surfaces.
- `exceptions` documents deliberate chain breaks (missing patch, unannounced change) so the test passes knowingly.

### Scrape template

`notes/patch-note-generator-template.md` (gitignored, main checkout) gains a section instructing the scrape to:
- emit `changes` for every note containing a numeric "from X to Y" change;
- use only keys from `STAT_DEFINITIONS`, falling back to `stat: "other"` with a `label`;
- never modify `baseline.ts`;
- run the patch-notes tests after adding a patch.

## 2. History derivation and validation

### `src/history.ts`

```ts
export type StatPoint = { version: string; date: Date | null; value: number; label?: string };

export type ItemHistory = {
  entries: Array<{ patch: Patch; notes: PatchNote[] }>; // newest first; all notes targeting the item
  stats: Array<{
    stat: StatKey;
    current: number | undefined;
    points: StatPoint[]; // oldest → newest
  }>;
  otherChanges: Array<{ version: string; label: string; from: number; to: number; unit?: string }>;
};

export const getItemHistory = (itemId: string): ItemHistory;
```

Series construction per stat (patches ordered by `date`):
1. Collect non-temporary changes for the item/stat.
2. If a baseline value exists: anchor at `asOfVersion`. Walk backward through changes at or before the baseline, emitting each change's `to` at that patch and finally the oldest change's `from` as a "before {first patch}" point (`date: null`). Walk forward through changes after the baseline, applying each `to`; `current` is the last value.
3. If no baseline value: build the series purely from changes (`from` of the oldest, then each `to`); `current` is the last `to`.
4. Baseline value with no changes: single point; UI shows it as unchanged since Season 5.
5. Temporary notes (`temporary: true`) appear in `entries` but are excluded from stat series.
6. Runtime never throws on inconsistent data; it trusts each change's own `from`/`to`.

### Validation test — `packages/patch-notes/test/history.test.mjs`

Run via `node --test` against built `dist/` output, matching the `packages/roulette` pattern (add `build` and `test` scripts to `packages/patch-notes/package.json` if missing).

Failing checks:
1. **Chain continuity:** for every item+stat, ordered oldest → newest, each change's `from` equals the previous change's `to`, unless covered by an `exceptions` entry.
2. **Baseline agreement:** the last change at or before `asOfVersion` has `to` equal to the baseline value (unless excepted).
3. **Known IDs and keys:** every `target` with `changes`, and every baseline item, is a known equipment/contestant ID; every stat key is in `STAT_DEFINITIONS` or is `other` with a `label`.

Non-failing check:
4. **Coverage warning:** notes whose text matches a numeric "from X to Y" pattern but whose numbers don't appear in `changes` are logged as warnings.

## 3. UI

### Sheet primitive — `packages/ui/src/components/ui/sheet.tsx`

- Built on `@radix-ui/react-dialog` (new dependency in `packages/ui`).
- Bottom sheet on mobile (max ~85vh, scrollable body); right-side drawer ~420px wide from `md`.
- Radix provides focus trap, Esc to close, scroll lock, labelled title; includes a close button. Styled with existing tokens (`notch`, `bg-arena-raised`, etc.), light/dark consistent with the rest of the app.

### `apps/web/app/components/equipment-history-sheet.tsx`

Props: `item: EquipmentItem`, `open`, `onOpenChange`. Content top to bottom:
1. **Header:** image, label, `getEquipmentMeta(item)`, current `AdjustmentBadge`.
2. **Current stats:** compact tiles (label, value + unit) with net delta since first point, coloured buff/nerf honouring `lowerIsBetter`.
3. **Trends:** one small inline-SVG step-line chart per stat with ≥2 points. Points are tappable/hoverable to show version and value. Step direction coloured via existing `buff`/`nerf` tokens. No chart library.
4. **Timeline:** newest first; each patch shows version, date, adjustment tag (reusing `ADJUSTMENT_LABEL`, `adjustmentTone`, `AdjustmentIcon`), note text, sassy note, "Limited-time" tag for temporary notes, link to `/patches/[version]`. `other` changes render inline as `label: from → to unit`.
5. **Empty state:** "No balance changes recorded since Season 5."

### Entry points

- **Equipment screen (`/all`):** non-toggle `EquipmentTile` becomes a button that opens the sheet. Settings' toggle tiles (`onToggle`) are unchanged.
- **Loadouts:** an ⓘ icon button in the `SlotCard` header beside the lock, visible at narrow widths; the loadout card's contestant also gets one (for HP history).
- Sheet state is local component state; no URL changes.

## Testing

- Unit: `history.test.mjs` validation suite above, plus focused tests for `getItemHistory` series construction (backward walk, forward walk, no-baseline, baseline-only, temporary exclusion) using small fixtures.
- Manual: run the app and check the sheet at phone and desktop widths for Pike-556 (heavily patched weapon), Zipline (gadget), and an item with no changes; check keyboard open/close and focus return.

## Out of scope

- Deep links / shareable URLs to an item's history.
- Patch history from before Season 5 beyond what the baseline + `from` values imply.
- Non-balance categories (maps, game modes, cosmetics).

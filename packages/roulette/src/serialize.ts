import { type ContestantGadget, type ContestantLoadout } from '@repo/schema/roulette';
import { CONTESTANT_CODES, GADGET_CODES, SPECIALIZATION_CODES, WEAPON_CODES } from './codes';
import { heavyClass } from './contestants/heavy';
import { lightClass } from './contestants/light';
import { mediumClass } from './contestants/medium';
import { generateLoadoutNameFromSeed, LOADOUT_NAME_SEED_MAX } from './generate-loadout-name';
import { getContestantMeta } from './get-random-items';

/*
 * Loadout keys (v2): `2` + six one-character item codes + optional name.
 *
 *   2 C H i a g V . x Y z      ← generated name, stored as an 18-bit seed
 *   │ │ │ │ └─┴─┴── gadgets 1-3 (order matters, locks are positional)
 *   │ │ │ └──────── weapon
 *   │ │ └────────── specialization
 *   │ └──────────── contestant
 *   └────────────── format version
 *
 * A custom (or no longer reproducible) name is stored as `~` + base64url UTF-8 text.
 * Codes come from the append-only tables in ./codes.ts.
 *
 * Legacy keys (base64url of comma-separated ids) always start with Y-e, never `2`,
 * so old share links, saved and recent loadouts keep decoding.
 */

export const LOADOUT_CODE_VERSION = '2';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const SEED_MARKER = '.';
const TEXT_MARKER = '~';
const SEED_CHARS = 3;
const ITEM_CHARS = 6;

const ALL_CONTESTANTS = [lightClass, mediumClass, heavyClass];

type DeserializeOptions = {
  disabledEquipmentIds?: string[];
};

const encodeBase64 = (value: string) => {
  if (typeof btoa === 'function') {
    return btoa(value);
  }

  return Buffer.from(value, 'utf8').toString('base64');
};

const decodeBase64 = (value: string) => {
  if (typeof atob === 'function') {
    return atob(value);
  }

  return Buffer.from(value, 'base64').toString('utf8');
};

const toBase64Url = (value: string) =>
  encodeBase64(value).replaceAll('+', '-').replaceAll('/', '_').replace(/[=]+$/u, '');

const fromBase64Url = (value: string) => {
  const padded = value.replaceAll('-', '+').replaceAll('_', '/');
  const padding = padded.length % 4;
  return decodeBase64(padding ? padded + '='.repeat(4 - padding) : padded);
};

/** UTF-8 safe text <-> base64url (btoa/atob only handle Latin-1). */
const textToBase64Url = (text: string) => {
  let binary = '';
  for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
  return toBase64Url(binary);
};

const base64UrlToText = (value: string) =>
  new TextDecoder().decode(Uint8Array.from(fromBase64Url(value), (char) => char.charCodeAt(0)));

const codeFor = (table: ReadonlyArray<null | string>, id: string) => {
  const index = table.indexOf(id);
  return index >= 0 && index < ALPHABET.length ? ALPHABET[index] : undefined;
};

const encodeSeed = (seed: number) =>
  Array.from({ length: SEED_CHARS }, (_, index) => ALPHABET[(seed >> (6 * (SEED_CHARS - 1 - index))) & 63]).join('');

const decodeSeed = (value: string) => {
  if (value.length !== SEED_CHARS) return null;
  let seed = 0;
  for (const char of value) {
    const index = ALPHABET.indexOf(char);
    if (index < 0) return null;
    seed = (seed << 6) | index;
  }
  return seed;
};

const encodeName = (loadout: ContestantLoadout) => {
  if (!loadout.loadoutName) return '';

  const seed = loadout.loadoutNameSeed;
  const isReproducible =
    typeof seed === 'number' &&
    seed >= 0 &&
    seed < LOADOUT_NAME_SEED_MAX &&
    generateLoadoutNameFromSeed(loadout, seed) === loadout.loadoutName;

  return isReproducible
    ? `${SEED_MARKER}${encodeSeed(seed)}`
    : `${TEXT_MARKER}${textToBase64Url(loadout.loadoutName)}`;
};

export const serializeLoadout = (loadout: ContestantLoadout) => {
  const codes = [
    codeFor(CONTESTANT_CODES, loadout.contestant.id),
    codeFor(SPECIALIZATION_CODES, loadout.specialization.id),
    codeFor(WEAPON_CODES, loadout.weapon.id),
    ...loadout.gadgets.map((gadget) => codeFor(GADGET_CODES, gadget.id)),
  ];

  if (codes.length !== ITEM_CHARS || codes.some((code) => code === undefined)) {
    // An item missing from ./codes.ts — keep working with the verbose format.
    return serializeLegacyLoadout(loadout);
  }

  return `${LOADOUT_CODE_VERSION}${codes.join('')}${encodeName(loadout)}`;
};

const deserializeCompactLoadout = (key: string, options?: DeserializeOptions): ContestantLoadout | null => {
  const items = key.slice(1, 1 + ITEM_CHARS);
  const nameSegment = key.slice(1 + ITEM_CHARS);
  if (items.length !== ITEM_CHARS) return null;

  const idAt = (table: ReadonlyArray<null | string>, position: number) => {
    const index = ALPHABET.indexOf(items[position] ?? '');
    return index >= 0 ? (table[index] ?? null) : null;
  };

  const contestant = ALL_CONTESTANTS.find((candidate) => candidate.id === idAt(CONTESTANT_CODES, 0));
  if (!contestant) return null;

  // Only accept items that are valid for this class (and not disabled by Embark).
  const meta = getContestantMeta(contestant.type, {
    disabledEquipmentIds: options?.disabledEquipmentIds,
    returnIfDisabledByUser: true,
  });

  const specialization = meta.specializations.find((candidate) => candidate.id === idAt(SPECIALIZATION_CODES, 1));
  const weapon = meta.weapons.find((candidate) => candidate.id === idAt(WEAPON_CODES, 2));
  const gadgets = [3, 4, 5]
    .map((position) => meta.gadgets.find((candidate) => candidate.id === idAt(GADGET_CODES, position)))
    .filter((gadget): gadget is ContestantGadget => Boolean(gadget));

  if (!specialization || !weapon || gadgets.length !== 3 || new Set(gadgets.map((gadget) => gadget.id)).size !== 3) {
    return null;
  }

  const loadout: ContestantLoadout = { contestant, gadgets, loadoutName: null, specialization, weapon };

  if (nameSegment.startsWith(SEED_MARKER)) {
    const seed = decodeSeed(nameSegment.slice(1));
    if (seed !== null) {
      loadout.loadoutName = generateLoadoutNameFromSeed(loadout, seed);
      loadout.loadoutNameSeed = seed;
    }
  } else if (nameSegment.startsWith(TEXT_MARKER)) {
    loadout.loadoutName = base64UrlToText(nameSegment.slice(1)) || null;
  }

  return loadout;
};

export const deserializeLoadout = (compressed: string, options?: DeserializeOptions) => {
  try {
    return compressed.startsWith(LOADOUT_CODE_VERSION)
      ? deserializeCompactLoadout(compressed, options)
      : deserializeLegacyLoadout(compressed, options);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to decompress loadout:', error);
    return null;
  }
};

/* ---------------------------------------------------------------------------
 * Legacy (v1) format: base64url("gadget,gadget,gadget,contestant,spec,weapon,%name%:Name").
 * Still decoded for old links and storage; only written if an item has no code.
 * ------------------------------------------------------------------------- */

const LOADOUT_NAME_TOKEN = '%name%:';

const serializeLegacyLoadout = (loadout: ContestantLoadout) => {
  const maybeLoadoutName = loadout.loadoutName ? [`${LOADOUT_NAME_TOKEN}${loadout.loadoutName}`] : [];
  const items = [...loadout.gadgets, loadout.contestant, loadout.specialization, loadout.weapon];
  const idString = [...items.map((item) => item.id), ...maybeLoadoutName].join(',');

  return toBase64Url(idString);
};

const deserializeLegacyLoadout = (compressed: string, options?: DeserializeOptions): ContestantLoadout | null => {
  const ids = fromBase64Url(compressed).split(',').filter(Boolean);

  const contestant = ALL_CONTESTANTS.find((maybeContestant) => ids.includes(maybeContestant.id));
  if (!contestant) return null;

  const meta = getContestantMeta(contestant.type, {
    disabledEquipmentIds: options?.disabledEquipmentIds,
    returnIfDisabledByUser: true,
  });

  const weapon = meta.weapons.find((maybeWeapon) => ids.includes(maybeWeapon.id));
  if (!weapon) return null;

  const specialization = meta.specializations.find((maybeSpecialization) => ids.includes(maybeSpecialization.id));
  if (!specialization) return null;

  const gadgets = meta.gadgets.filter((maybeGadget) => ids.includes(maybeGadget.id)).slice(0, 3);
  if (gadgets.length === 0) return null;

  const loadoutName =
    ids.find((maybeName) => maybeName.startsWith(LOADOUT_NAME_TOKEN))?.replace(LOADOUT_NAME_TOKEN, '') ?? null;

  return { contestant, gadgets, loadoutName, specialization, weapon };
};

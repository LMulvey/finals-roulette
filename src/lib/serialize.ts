import { heavyClass } from './contestants/heavy';
import { lightClass } from './contestants/light';
import { mediumClass } from './contestants/medium';
import { getContestantMeta } from './get-random-items';
import { type ContestantLoadout } from './schema';

const LOADOUT_NAME_TOKEN = '%name%:';

export const serializeLoadout = (loadout: ContestantLoadout) => {
  const maybeLoadoutName = loadout.loadoutName
    ? [`${LOADOUT_NAME_TOKEN}${loadout.loadoutName}`]
    : [];
  const items = [
    ...loadout.gadgets,
    loadout.contestant,
    loadout.specialization,
    loadout.weapon,
  ];
  const itemIds = items.map((item) => item.id);
  const idString = [...itemIds, ...maybeLoadoutName].join(',');

  // Convert to base64 and make it URL safe
  return btoa(`${idString}`)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/[=]+$/u, '');
};

export const deserializeLoadout = (compressed: string) => {
  try {
    // Restore base64 padding and characters
    const padded = compressed.replaceAll('-', '+').replaceAll('_', '/');

    // Add back padding if needed
    const padding = padded.length % 4;
    const withPadding = padding ? padded + '='.repeat(4 - padding) : padded;

    // Decode base64 and split into IDs
    const decoded = atob(withPadding);
    const ids = decoded.split(',').filter(Boolean);

    // Reference the contestant classes
    const allContestants = [lightClass, mediumClass, heavyClass];

    // Find the contestant class
    const contestant = allContestants.find((maybeContestant) =>
      ids.includes(maybeContestant.id),
    );
    if (!contestant) return null;

    // Get available items for this class type
    const meta = getContestantMeta(contestant.type);

    // Find matching weapon
    const weapon = meta.weapons.find((maybeWeapon) =>
      ids.includes(maybeWeapon.id),
    );
    if (!weapon) return null;

    // Find matching specialization
    const specialization = meta.specializations.find((maybeSpecialization) =>
      ids.includes(maybeSpecialization.id),
    );
    if (!specialization) return null;

    // Find matching gadgets (up to 3)
    const gadgets = meta.gadgets
      .filter((maybeGadget) => ids.includes(maybeGadget.id))
      .slice(0, 3);
    if (gadgets.length === 0) return null;

    const loadoutName =
      ids
        .find((maybeName) => maybeName.startsWith(LOADOUT_NAME_TOKEN))
        ?.replace(LOADOUT_NAME_TOKEN, '') ?? null;

    return {
      contestant,
      gadgets,
      loadoutName,
      specialization,
      weapon,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to decompress loadout:', error);
    return null;
  }
};

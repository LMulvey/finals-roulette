import {
  type ContestantClass,
  type ContestantGadget,
  type ContestantSpecialization,
  type ContestantWeapon,
} from './schema';

type Loadout = {
  contestant: ContestantClass;
  gadgets: ContestantGadget[];
  specialization: ContestantSpecialization;
  weapon: ContestantWeapon;
};

const adjectives = {
  aggressive: ['Reckless', 'Bloodthirsty', 'Unhinged', 'Chaotic', 'Savage'],
  defensive: [
    'Cautious',
    'Paranoid',
    'Turtle-like',
    'Cowardly',
    'Safety-First',
  ],
  sneaky: ['Sketchy', 'Sus', 'Backstabbing', 'Shadow-loving', 'Cheese-master'],
  technical: [
    'Over-engineered',
    'Galaxy-brain',
    'Try-hard',
    'Sweaty',
    '4000-IQ',
  ],
};

const patterns = {
  allRanged: (loadout: Loadout) =>
    loadout.weapon.id.includes('bow') ||
    loadout.weapon.type === 'marksman-rifle'
      ? ['Tent Erector', 'Chris Kyle At Home']
      : [],
  sword: (loadout: Loadout) =>
    loadout.weapon.type === 'melee' && loadout.weapon.id.includes('sword')
      ? ['Reddit Warrior', 'Bushido Bob', 'Tom Cruise in The Last Samurai']
      : [],
  tooManyGadgets: (loadout: Loadout) =>
    loadout.gadgets.length >= 3 ? ['Swiss Army', 'Min-Maxer'] : [],
};

const pickItemReference = (loadout: Loadout): string => {
  const items = [
    loadout.contestant,
    loadout.weapon,
    loadout.specialization,
    ...loadout.gadgets,
  ];

  const item = items[Math.floor(Math.random() * items.length)];

  const variations = [
    `${item.label}-enjoyer`,
    `${item.label}-enthusiast`,
    `${item.label} Shitter`,
    `${item.label} Moment`,
    `${item.label} Expert`,
  ];

  return variations[Math.floor(Math.random() * variations.length)];
};

const countItemsWithKeywords = (
  loadout: Loadout,
  keywords: string[],
): number => {
  let count = 0;
  const items = [
    loadout.contestant,
    loadout.weapon,
    loadout.specialization,
    ...loadout.gadgets,
  ];

  for (const item of items) {
    if (
      keywords.some(
        (keyword) =>
          item.id.toLowerCase().includes(keyword) ||
          item.label.toLowerCase().includes(keyword),
      )
    ) {
      count++;
    }
  }

  return count;
};

const determineLoadoutStyle = (loadout: Loadout): keyof typeof adjectives => {
  const defensiveItems = countItemsWithKeywords(loadout, [
    'shield',
    'armor',
    'block',
  ]);
  const aggressiveItems = countItemsWithKeywords(loadout, [
    'sword',
    'damage',
    'attack',
  ]);
  const sneakyItems = countItemsWithKeywords(loadout, [
    'stealth',
    'poison',
    'trap',
  ]);
  const technicalItems = countItemsWithKeywords(loadout, [
    'tech',
    'gadget',
    'hack',
  ]);

  const scores = {
    aggressive: aggressiveItems,
    defensive: defensiveItems,
    sneaky: sneakyItems,
    technical: technicalItems,
  };

  // eslint-disable-next-line unicorn/no-array-reduce
  return Object.entries(scores).reduce((a, b) =>
    a[1] > b[1] ? a : b,
  )[0] as keyof typeof adjectives;
};

const generateSassyName = (loadout: Loadout): string => {
  const namePool: string[] = [];

  const style = determineLoadoutStyle(loadout);
  namePool.push(...adjectives[style]);

  for (const pattern of Object.values(patterns)) {
    const matches = pattern(loadout);
    namePool.push(...matches);
  }

  const adjective = namePool[Math.floor(Math.random() * namePool.length)];

  const itemReference = pickItemReference(loadout);
  return `The ${adjective} ${itemReference}`;
};

export const generateLoadoutName = (loadout: Loadout): string => {
  // Generate 3 names and pick the funniest one (longest)
  const names = Array.from({ length: 3 })
    .fill(null)
    .map(() => generateSassyName(loadout))
    .sort((a, b) => b.length - a.length);

  return names[0];
};

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
  aggressive: [
    'Reckless',
    'Bloodthirsty',
    'Unhinged',
    'Chaotic',
    'Savage',
    'Angry',
    'Ferocious',
    'Raging',
    'UwU',
    'Sassy',
    'Furious',
    'Snarky',
    'Spiky',
    'Venomous',
    'Fiery',
    'Combative',
    'Grumpy',
    'Stompy',
    'Bossy',
    'Spicy',
    'Testy',
    'Stormy',
    'Belligerent',
    'Shouty',
    'Brash',
    'Frothy',
    'Surly',
    'Growly',
    'Crabby',
    'Prickly',
    'Cranky',
    'Feisty',
    'Snarly',
    'Snippy',
    'Snappy',
    'Fiery-Hot',
    'Melodramatic',
    'Barky',
    'Volatile',
    'Rabid',
    'Stomping-Mad',
    "Adderall'd",
    'Puffed-Up',
    'Thunderous',
    'Tantrum-Y',
    'Ornery',
    'Steam-Blowing',
    'Redditor',
    'Foot-Stomping',
    'Bristly',
    'Nitpicky',
    'Slap-Happy',
    'Fuming',
    'Hollering',
    'Explosive',
    'Boiling-Over',
    'Overly-Puffed',
    'Berserk',
    'Overdramatic',
    'Barky-Loud',
    'Red-Faced',
    'Stompy-Angry',
    'Claws-Out',
    'Huffy-Puffy',
    'Grumbly',
    'Bellowing',
    'Stompy-Clumsy',
    'Rant-Prone',
    'Furious-And-Flailing',
    'Drama-Laden',
    'Shouty-Overkill',
    'Melodramatically-Fuming',
    'Chaos-Driven',
    'Excessively-Prickly',
    'Over-The-Top-Huffy',
  ],
  defensive: [
    'Guarded',
    'Shielded',
    'Paranoid',
    'Cagey',
    'Overprotected',
    'Deflective',
    'Wary',
    'Skittish',
    'Jumpy',
    'Defensive',
    'Sensitive',
    'Over-reactive',
    'Touchy',
    'Prickly',
    'Hyper-vigilant',
    'Wall-Building',
    'Overcautious',
    'Fortified',
    'Retreating',
    'Literal Baby',
    'Protective',
    'Barricaded',
    'Armored',
    'Suspicious',
    'Huffy',
    'Overboard-Cautious',
    'Shell-Like',
    'Evasive',
    'Overthinking',
    'Hesitant',
    'Barbed',
    'Shield-Hugging',
    'Panic-Prone',
    'Backpedaling',
    'Guardrail-Heavy',
    'Boundary-Obsessed',
    'Walled-Off',
    'Flinchy',
    'Parry-Proficient',
    'Duck-And-Weaving',
    'Over-guarded',
    'Resistant',
    'Overly-Aware',
    'Quick-To-Retreat',
    'Barricade-Building',
    'Panic-Fortifying',
    'Spiky-Defensive',
    'Faint-Hearted',
    'Over-layered',
    'Bubble-Wrapped',
    'Hyper-Suspicious',
    'Armor-Clad',
    'Back-To-The-Wall',
    'Skittishly-Prepared',
    'Self-Insulated',
    'Cover-Seeking',
    'Over-Buffering',
    'Hyper-Fortified',
    'Flimsy-Fortress',
    'Boundary-Loving',
    'Fearfully-Spiny',
    'Guard-Heavy',
    'Crouched',
    'Dodge-And-Hope',
    'Paranoid-And-Protective',
    'Hyper-Sheltered',
    'Hedge-Prone',
    'Bubble-Hugging',
    'Shield-Facing',
    'Risk-Averse',
    'Cautionary',
    'Hyper-Sensitive',
    'Withdrawn',
    'Stiff-Backed',
    'Timidly-Holding',
    'Recoil-Ready',
    'Deflection-Prone',
  ],
  sneaky: [
    'Sketchy',
    'Sus',
    'Backstabbing',
    'Shadow-loving',
    'Cheese-master',
    'Sneaky',
    'Sly',
    'Tricky',
    'Cunning',
    'Devious',
    'Crafty',
    'Mischievous',
    'Underhanded',
    'Shifty',
    'Secretive',
    'Slippery',
    'Moist-like',
    'Covert',
    'Shadowy',
    'Stealthy',
    'Furtive',
    'Hush-Hush',
    'Cagey',
    'Discreet',
    'Dodgy',
    'Subtle',
    'Elusive',
    'Wily',
    'Slithery',
    'Cloaked',
    'Silent-Moving',
    'Low-Key',
    'Backdoor-Loving',
    'Tiptoeing',
    'Scheming',
    'Plotting',
    'Masked',
    'Undercover',
    'Hidden',
    'Obscure',
    'Camouflaged',
    'Tricksy',
    'Snake-Like',
    'Slinking',
    'Double-Dealing',
    'Fox-Like',
    'Evasive',
    'Unseen',
    'Spy-Like',
    'Shadow-Creeping',
    'Inconspicuous',
    'Roundabout',
    'Deceptive',
    'Hooded',
    'Out-Of-Sight',
    'Behind-The-Scenes',
    'Backstabbing',
    'Prowling',
    'Skulking',
    'Scurrying',
    'Slip-Sliding',
    'Darting',
    'Unassuming',
    'Blend-In-Master',
    'Cover-Seeking',
    'Misdirecting',
    'Creep-Like',
    'Silent-Sliding',
    'Tactically-Hidden',
    'Hidden-Agenda',
    'Masked-Intentions',
    'Eely',
    'Slither-Smooth',
    'Chameleonic',
    'Untraceable',
    'Wisp-Like',
    'Behind-The-Curtain',
    'Sidestepping',
    'Outfoxing',
    'Subversive',
    'Little Stinker',
  ],
  technical: [
    'Over-engineered',
    'Galaxy-brain',
    'Try-hard',
    'Streaming to 1 viewer',
    'Sweaty',
    '9001 IQ',
    'Technical',
    'Precise',
    'Efficient',
    'Streamlined',
    'Mechanized',
    'Automated',
    'Robust',
    'Systematic',
    'Advanced',
    'High-Tech',
    'Innovative',
    'Algorithmic',
    'Analytical',
    'Data-Driven',
    'Complex',
    'Intricate',
    'Configurable',
    'Programmable',
    'Functional',
    'Operational',
    'Engineered',
    'Specialized',
    'Optimized',
    'Scientific',
    'Structured',
    'Mathematical',
    'Synthetic',
    'Modular',
    'Logical',
    'Calculated',
    'Schematic',
    'Digital',
    'Mechanistic',
    'Fine-Tuned',
    'Industrial',
    'Dynamic',
    'Precoded',
    'Circuitous',
    'Algorithmically-Driven',
    'Customizable',
    'Formulaic',
    'Problem-Solving',
    'Precision-Based',
    'Tech-Laden',
    'Code-Heavy',
    'Digitized',
    'Innovative-Thinking',
    'Configurable-Driven',
    'Hardware-Like',
    'Networked',
    'Platform-Specific',
    'Processor-Powered',
    'Calibrated',
    'Integrated',
    'High-Fidelity',
    'Cutting-Edge',
    'Optimally-Designed',
    'Simulation-Ready',
    'Cross-Functional',
    'Iterative',
    'Prototype-Like',
    'Scalable',
    'Performance-Tuned',
    'Programmable-Heavy',
    'Execution-Focused',
    'Resource-Efficient',
    'Cloud-Based',
    'Augmented',
    'Virtualized',
    'Redundant-Safe',
    'Analytically-Powered',
    'Macro-Level',
    'Micro-Precise',
    'Utility-Focused',
    'Binary-Oriented',
    'Scalably-Architected',
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
  tooManyGrenades: (loadout: Loadout) => {
    const grenades = loadout.gadgets.filter((gadget) =>
      gadget.label.toLowerCase().includes('grenade'),
    );
    return grenades?.length >= 2
      ? [
          'Peter Pitcher',
          'Fraggy Frank',
          'Grenade Greg',
          'Hides-behind-wall-while-throwing-bombs',
        ]
      : [];
  },
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
    `${item.label} Sweat`,
    `${item.label} Moment`,
    `${item.label} Expert`,
    `${item.label} Tryhard`,
    `${item.label} Sweat`,
    `${item.label} Expert`,
    `${item.label} Shitter`,
    `${item.label} Haystack`,
    `${item.label} Carry`,
    `${item.label} Tank`,
    `${item.label} MetaChaser`,
    `${item.label} Nooblord`,
    `${item.label} Trashlord`,
    `${item.label} Sigma Simp`,
    `${item.label} Cringe`,
    `${item.label} Clutchyboy`,
    `${item.label} Feeder`,
    `${item.label} Sweatlord`,
    `${item.label} Bot`,
    `${item.label} AFK`,
    `${item.label} Clicker`,
    `${item.label} Backseater`,
    `${item.label} Gremlin`,
    `${item.label} Pogchamp`,
    `${item.label} Keyboard Warrior`,
    `${item.label} Mic Mutist`,
    `${item.label} Tiltmaster`,
    `${item.label} Blame God`,
    `${item.label} Overachiever`,
    `${item.label} Underdog`,
    `${item.label} Sandbagger`,
    `${item.label} Int Lord`,
    `${item.label} W Keyer`,
    `${item.label} Mouse1 Spammer`,
    `${item.label} Cheese Lover`,
    `${item.label} Spawn Camper`,
    `${item.label} Rage Quitter`,
    `${item.label} Tryhard-slayer`,
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
          item.label.toLowerCase().includes(keyword) ||
          item.description.toLowerCase().includes(keyword),
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
    'fire',
    'flame',
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

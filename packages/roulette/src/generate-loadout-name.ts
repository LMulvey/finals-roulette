import {
  type ContestantClass,
  type ContestantGadget,
  type ContestantSpecialization,
  type ContestantWeapon,
} from '@repo/schema/roulette';

type Random = () => number;

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
    'Over-Caffeinated',
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
    'Angry-Potato',
    'Rage-Noodle',
    'Frothing-Mad',
    'Yelling-Yeti',
    'Tantrum-Tornado',
    'Explosive-Pickle',
    'Shouty-Sprout',
    'Fuming-Ferret',
    'Stompy-Sasquatch',
    'Grumpy-Goose',
    'Unstoppable',
    'Full-Send',
    'No-Brakes',
    'Wall-Kicking',
    'Head-First',
    'Point-Blank',
    'Overcommitted',
    'Third-Partying',
    'Kamikaze',
    'Pushy',
    'Rampaging',
    'Trigger-Happy',
    'Bulldozing',
    'Door-Kicking',
    'Glass-Breaking',
    'Elbows-Out',
    'Mid-Fight-Reloading',
    'Zero-Patience',
    'Rush-B',
    'Hyper-Aggro',
    'Lead-Spitting',
    'Crowd-Surfing',
    'Never-Retreating',
    'Cash-Hungry',
    'Vault-Rushing',
  ],
  defensive: [
    'Skibidi',
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
    'Pillow-Fortified',
    'Turtle-Tastic',
    'Bubble-Buddy',
    'Shield-Snuggler',
    'Armor-Armadillo',
    'Cautious-Cucumber',
    'Hedgehog-Hero',
    'Paranoid-Penguin',
    'Barricade-Bear',
    'Retreating-Rabbit',
    'Corner-Camping',
    'Cashbox-Hugging',
    'Objective-Sitting',
    'Stall-Happy',
    'Door-Holding',
    'Overtime-Loving',
    'Shield-Stacking',
    'Turtle-Shelled',
    'Wall-Hugging',
    'Barricaded-In',
    'Fort-Building',
    'Anchor-Dropping',
    'Hold-The-Line',
    'Siege-Minded',
    'Last-Stand',
    'Clock-Running',
    'Cover-Crawling',
    'Bunkered',
    'Plate-Armored',
    'Statue-Still',
  ],
  explosive: [
    'Kaboom',
    'Boom-Happy',
    'Blast-Radius',
    'Demolition-Derby',
    'Splash-Damage',
    'Fuse-Lighting',
    'Short-Fused',
    'Detonating',
    'Shrapnel-Spraying',
    'Building-Deleting',
    'Floor-Removing',
    'Wall-Erasing',
    'Collateral-Damage',
    'Self-Damage-Enjoying',
    'Concussive',
    'Rubble-Making',
    'Structurally-Unsound',
    'Destruction-Loving',
    'Pyrotechnic',
    'Blast-Proof-Ish',
    'Crater-Making',
    'Earth-Shattering',
    'Ear-Ringing',
    'Ka-Blammo',
    'Overkill',
    'Explosive-Personality',
    'Remote-Detonated',
    'Sticky-Bomb',
    'Chain-Reaction',
    'Volatile-Cargo',
  ],
  healing: [
    'Heal-Bot',
    'Medic-Machine',
    'Health-Harvester',
    'Support-Specialist',
    'Nurse',
    'Doctor',
    'Healer',
    'Positive Aura',
    'Band-Aid',
    'First-Aid',
    'Medic-Bag',
    'Revive-Spamming',
    'Beam-Tethered',
    'Life-Support',
    'Pocket-Medic',
    'Triage-Ready',
    'Bedside-Manner',
    'Wholesome',
    'Patch-You-Up',
    'Clutch-Reviving',
    'Health-Topping',
    'Ambulance-Chasing',
    'Get-Well-Soon',
    'Hippocratic',
    'Overhealing',
    'Nurturing',
    'Caring',
    'Soothing',
    'Comfort-Food',
    'Emotional-Support',
    'Healing-Factor',
    'Second-Chance',
    'Defib-Happy',
    'Stretcher-Bearing',
  ],
  sneaky: [
    'Negative Aura',
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
    'Sneaky-Snake',
    'Shadow-Ferret',
    'Cloak-And-Dagger',
    'Tiptoe-Tiger',
    'Stealthy-Sloth',
    'Undercover-Unicorn',
    'Spy-Squirrel',
    'Devious-Duck',
    'Mischievous-Mongoose',
    'Cunning-Chameleon',
    'Flanking',
    'Rotating',
    'Back-Door',
    'Off-Angle',
    'Ninja-Mode',
    'Ghosting',
    'Vault-Snatching',
    'Steal-Happy',
    'Last-Second',
    'Cashout-Sniping',
    'Sleight-Of-Hand',
    'Smoke-And-Mirrors',
    'Pickpocketing',
    'Footstep-Muffled',
    'Invisible-Ish',
    'Peekaboo',
    'Wall-Phasing',
    'Window-Diving',
    'Rooftop-Lurking',
    'Shadow-Dancing',
  ],
  technical: [
    'Over-Engineered',
    'Galaxy-Brain',
    'Try-Hard',
    'Streaming To 1 Viewer',
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
    'Techno-Wizard',
    'Code-Cruncher',
    'Algorithm-Alpaca',
    'Processor-Panda',
    'Circuit-Slinger',
    'Data-Dolphin',
    'Binary-Buffalo',
    'Logic-Llama',
    'Tech-Tiger',
    'Gadget-Giraffe',
    'Frame-Perfect',
    'Pixel-Peeking',
    'Spreadsheet-Driven',
    'Min-Maxed',
    'Theorycrafted',
    'Patch-Note-Reading',
    'Meta-Slaving',
    'Tier-Listed',
    'Optimized-To-Death',
    'Calculated-Risk',
    'Overclocked',
    'Benchmark-Chasing',
    'Laser-Guided',
    'Gadget-Brained',
    'Diagram-Drawing',
    'Over-Planned',
    'Settings-Tweaking',
    'High-Refresh',
    'Latency-Obsessed',
    'Blueprint-Bound',
  ],
};

const patterns = {
  bow: (loadout: Loadout) =>
    loadout.weapon.label.toLowerCase().includes('bow')
      ? ['Bow-zo', 'Heavy Hunter', 'Strung-Out', 'Bow-man']
      : [],
  healer: (loadout: Loadout) =>
    loadout.gadgets.some(
      (gadget) =>
        gadget.label.toLowerCase().includes('heal') ||
        gadget.label.toLowerCase().includes('h+'),
    )
      ? ['EZ Healer', 'Heal Daddy', 'Healing Hero', 'Health-chunker']
      : [],
  leftClick: (loadout: Loadout) => {
    const weaponName = loadout.weapon.label.toLowerCase();

    if (
      weaponName.includes('m11') ||
      weaponName.includes('flamethrower') ||
      weaponName.includes('minigun') ||
      weaponName.includes('sledge') ||
      weaponName.includes('sword')
    ) {
      return ['Left Click Legend', 'EZ Mode', 'Button Masher'];
    }

    return [];
  },
  explosives: (loadout: Loadout) =>
    countItemsWithKeywords(loadout, ['c4', 'rpg', 'breach', 'mgl', 'cl-40', 'explosive-mine']) >= 2
      ? ['Demolition Expert', 'Bomb Squad Reject', 'Structural Engineer', 'Mr. Kaboom', 'Arena Remodeler']
      : [],
  invisible: (loadout: Loadout) =>
    loadout.specialization.id === 'cloaking-device' || loadout.gadgets.some((gadget) => gadget.id === 'vanishing-bomb')
      ? ['Now-You-See-Me', 'Peekaboo Pro', 'Professional Ghost', 'Invisible Menace']
      : [],
  melee: (loadout: Loadout) =>
    loadout.weapon.type === 'melee'
      ? ['Bring-A-Knife-To-A-Gunfight', 'Up Close And Personal', 'Personal Space Invader', 'Hug Enthusiast']
      : [],
  minigun: (loadout: Loadout) =>
    ['m134-minigun', 'lewis-gun', 'm60'].includes(loadout.weapon.id)
      ? ['Bullet Hose', 'Lead Sprinkler', 'Suppressing Fire Fan', 'Ammo Budget Destroyer']
      : [],
  mobility: (loadout: Loadout) =>
    ['grappling-hook', 'evasive-dash'].includes(loadout.specialization.id) ||
    loadout.gadgets.some((gadget) => ['jump-pad', 'zipline', 'gateway', 'hover-pad'].includes(gadget.id))
      ? ['Frequent Flyer', 'Parkour Prodigy', 'Never Touches Grass', 'Gravity Optional']
      : [],
  reviver: (loadout: Loadout) =>
    loadout.gadgets.some((gadget) => gadget.id === 'defibrillator')
      ? ['Clear!', 'Paddle Master', 'Second Chance Dealer', 'Resurrection Specialist']
      : [],
  shield: (loadout: Loadout) =>
    loadout.specialization.id === 'mesh-shield' || loadout.weapon.id === 'riot-shield'
      ? ['Human Wall', 'Mobile Fortress', 'Bullet Sponge', 'Shield Bearer']
      : [],
  shotgun: (loadout: Loadout) =>
    loadout.weapon.type === 'shotgun'
      ? ['Point-Blank Poet', 'Door Greeter', 'Close Quarters Connoisseur', 'Buckshot Barista']
      : [],
  sniper: (loadout: Loadout) =>
    loadout.weapon.type === 'marksman-rifle'
      ? [
          'Tent Erector',
          'Chris Kyle At Home',
          'Bush Wookie',
          'Inactive Participant',
          'Teabag Recipient',
          'Serial Disconnector',
        ]
      : [],
  sword: (loadout: Loadout) =>
    loadout.weapon.id.includes('sword')
      ? ['Reddit Warrior', 'Bushido Bob', 'Tom Cruise in The Last Samurai']
      : [],
  tooManyGrenades: (loadout: Loadout) => {
    const grenades = loadout.gadgets.filter((gadget) =>
      gadget.label.toLowerCase().includes('grenade'),
    );
    return grenades?.length >= 2
      ? ['Peter Pitcher', 'Fraggy Frank', 'Grenade Greg', 'Blind Bomb Lobber']
      : [];
  },
};

const pickItemReference = (loadout: Loadout, random: Random): string => {
  const items = [
    loadout.contestant,
    loadout.weapon,
    loadout.specialization,
    ...loadout.gadgets,
  ];

  const item = items[Math.floor(random() * items.length)] ?? loadout.weapon;

  const variations = [
    `${item.label}-enjoyer`,
    `${item.label}-enthusiast`,
    `${item.label} Goblin`,
    `${item.label} Sweat`,
    `${item.label} Expert`,
    `${item.label} Tryhard`,
    `${item.label} Menace`,
    `${item.label} Haystack`,
    `${item.label} Carry`,
    `${item.label} Tank`,
    `${item.label} Meta-chaser`,
    `${item.label} Nooblord`,
    `${item.label} Trashlord`,
    `${item.label} Simp`,
    `${item.label} Cringe`,
    `${item.label} Clutchyboy`,
    `${item.label} Feeder`,
    `${item.label} Sweatlord`,
    `${item.label} Bot`,
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
    `${item.label} Cheese`,
    `${item.label} Spawn Camper`,
    `${item.label} Rage Quitter`,
    `${item.label} Tryhard-slayer`,
    `${item.label} Main`,
    `${item.label} Specialist`,
    `${item.label} Connoisseur`,
    `${item.label} Apprentice`,
    `${item.label} Aficionado`,
    `${item.label} Merchant`,
    `${item.label} Fanatic`,
    `${item.label} Evangelist`,
    `${item.label} Truther`,
    `${item.label} Defender`,
    `${item.label} Hoarder`,
    `${item.label} Collector`,
    `${item.label} Whisperer`,
    `${item.label} Tourist`,
    `${item.label} Enjoyer`,
    `${item.label} Maximalist`,
    `${item.label} Purist`,
    `${item.label} Diehard`,
    `${item.label} Loyalist`,
    `${item.label} Scholar`,
    `${item.label} Professor`,
    `${item.label} Intern`,
    `${item.label} Rookie`,
    `${item.label} Veteran`,
    `${item.label} Prodigy`,
    `${item.label} Superfan`,
    `${item.label} Influencer`,
    `${item.label} Streamer`,
    `${item.label} Sponsor Darling`,
    `${item.label} Cashout Thief`,
    `${item.label} Vault Hoarder`,
    `${item.label} Highlight Reel`,
    `${item.label} Clip Farmer`,
    `${item.label} Ranked Refugee`,
    `${item.label} Quick Cash Regular`,
    `${item.label} World Tour Tourist`,
    `${item.label} Final Round Hero`,
    `${item.label} Last-Second Steal`,
    `${item.label} Arena Regular`,
    `${item.label} Fan Favorite`,
  ];

  return (
    variations[Math.floor(random() * variations.length)] ??
    `${item.label} Enthusiast`
  );
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

const STYLE_KEYWORDS: Record<keyof typeof adjectives, string[]> = {
  aggressive: ['sword', 'damage', 'attack', 'shotgun', 'melee', 'sledge', 'charge', 'dash'],
  defensive: ['shield', 'barricade', 'goo', 'dome', 'aps', 'mesh', 'block'],
  explosive: ['c4', 'rpg', 'explos', 'grenade', 'breach', 'launcher', 'boom'],
  healing: ['heal', 'h+', 'defib', 'revive', 'infuser'],
  sneaky: ['stealth', 'cloak', 'invisib', 'vanish', 'fire', 'pyro', 'trap', 'mine', 'gas', 'gateway'],
  technical: ['gadget', 'demat', 'reshape', 'turret', 'sensor', 'sonar', 'tracking', 'zipline', 'pad'],
};

const determineLoadoutStyle = (loadout: Loadout, random: Random): keyof typeof adjectives => {
  const scores = Object.entries(STYLE_KEYWORDS).map(
    ([style, keywords]) => [style as keyof typeof adjectives, countItemsWithKeywords(loadout, keywords)] as const,
  );
  const best = Math.max(...scores.map(([, score]) => score));
  const tied = scores.filter(([, score]) => score === best).map(([style]) => style);

  // Break ties with the (seeded) random source so it isn't always the same style.
  return tied[Math.floor(random() * tied.length)] ?? 'aggressive';
};

const generateSassyName = (loadout: Loadout, random: Random): string => {
  const namePool: string[] = [];

  const style = determineLoadoutStyle(loadout, random);
  namePool.push(...adjectives[style]);

  for (const pattern of Object.values(patterns)) {
    const matches = pattern(loadout);
    namePool.push(...matches);
  }

  const adjective = namePool[Math.floor(random() * namePool.length)];

  const itemReference = pickItemReference(loadout, random);
  return `The ${adjective} ${itemReference}`;
};

export const generateLoadoutName = (loadout: Loadout, random: Random = Math.random): string => {
  // Generate 3 names and pick the funniest one (longest)
  const names = Array.from({ length: 3 })
    .fill(null)
    .map(() => generateSassyName(loadout, random))
    .sort((a, b) => b.length - a.length);

  return names[0] ?? 'Mystery Loadout';
};

/** 18 bits: fits in three base64url characters in a share URL. */
export const LOADOUT_NAME_SEED_MAX = 2 ** 18;

/** Small deterministic PRNG (mulberry32) so a seed always produces the same name. */
export const createSeededRandom = (seed: number): Random => {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d_2b_79_f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
};

export const generateLoadoutNameFromSeed = (loadout: Loadout, seed: number): string =>
  generateLoadoutName(loadout, createSeededRandom(seed));

/** Rolls a fresh name along with the seed that reproduces it. */
export const rollLoadoutName = (loadout: Loadout) => {
  const loadoutNameSeed = Math.floor(Math.random() * LOADOUT_NAME_SEED_MAX);
  return { loadoutName: generateLoadoutNameFromSeed(loadout, loadoutNameSeed), loadoutNameSeed };
};

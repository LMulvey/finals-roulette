import { type Patch } from '../types';

export const patch800: Patch = {
  date: new Date('2025-09-10T11:00:00'),
  description: `Season 8 brings the grandest gameshow on Earth back for another round! Featuring Instant Replay Beta, new weapons, map upgrades, playstyles, and a host of improvements and fixes. Flags will fly, cultures will shine, and Contestants from all over the globe will step into the spotlight for a showdown of epic proportions!`,
  originalUrl: 'https://www.reachthefinals.com/patchnotes/800',
  patchNotes: [
    // Gadgets
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: 'Added in-world grenade indicator for Frag Grenades.',
      section: 'balance',
      target: 'frag-grenade',
    },
    {
      adjustmentType: 'nerf',
      category: 'gadget',
      devNote:
        'The Infuser was still slightly outperforming other healing items, this change is made to address that.',
      note: 'H+ Infuser: Decreased healing per shot from 15 to 14.',
      section: 'balance',
      target: 'h-plus-infuser',
    },
    {
      adjustmentType: 'removal',
      category: 'gadget',
      devNote:
        'Thermal Vision has struggled with a considerable number of bugs and issues for some time now. We’ll re-work it over the next few seasons, at which point it will return to the roster.',
      note: 'Temporarily disabled Thermal Vision due to ongoing bugs and unintended advantages.',
      section: 'balance',
      target: 'thermal-vision',
    },
    {
      adjustmentType: 'buff',
      category: 'general',
      note: 'Increased the damage done by the crane’s wrecking ball from 10 to 75.',
      section: 'balance',
      target: 'crane-wrecking-ball',
    },

    // Specializations
    {
      adjustmentType: 'nerf',
      category: 'specializations',
      devNote:
        'Our intent has been to reduce the number of charges available, to throttle the usage rate, but we felt we couldn’t make that change until we fixed how unreliable opening and closing wall segments could be.',
      note: 'Dematerializer: Decreased the number of charges from 3 to 2.',
      section: 'balance',
      target: 'dematerializer',
    },
    {
      adjustmentType: 'addition',
      category: 'specializations',
      note: 'Dematerializer: Now remembers which wall segments were dematerialized with a charge; rematerializing one will rematerialize all in the group.',
      section: 'balance',
      target: 'dematerializer',
    },
    {
      adjustmentType: 'addition',
      category: 'specializations',
      note: 'Dematerializer: Added vignette effect when a wall segment is dematerialized near the player, just outside their field of view.',
      section: 'balance',
      target: 'dematerializer',
    },
    {
      adjustmentType: 'addition',
      category: 'specializations',
      note: 'Dematerializer: Updated effect on walls when activated, adding a slight delay before the wall segment becomes fully transparent.',
      section: 'balance',
      target: 'dematerializer',
    },
    {
      adjustmentType: 'addition',
      category: 'specializations',
      note: 'Dematerializer: Added new vibration effect to dematerialized wall segments before they rematerialize.',
      section: 'balance',
      target: 'dematerializer',
    },
    {
      adjustmentType: 'buff',
      category: 'specializations',
      devNote:
        'We want to increase its desirability without making it too frustrating. This change will buff its availability in-match.',
      note: 'Guardian Turret: Decreased cooldown from 40s to 35s; cooldown when retrieving turret from 20s to 17.5s.',
      section: 'balance',
      target: 'guardian-turret',
    },
    {
      adjustmentType: 'buff',
      category: 'specializations',
      devNote:
        'This change allows the Healing Beam to go from 220 to 253 healing before overheating, which should buff it to where it should be.',
      note: 'Healing Beam: Increased healing rate from 40/s to 46/s.',
      section: 'balance',
      target: 'healing-beam',
    },
    {
      adjustmentType: 'nerf',
      category: 'specializations',
      devNote:
        'The power and impact of the Winch Claw is out of line with some of the other Heavy Specializations and that is reflected in the data.',
      note: 'Winch Claw: Increased cooldown when missing a target from 7s to 10s; hitting Cashout Station/Contestant from 14s to 18s; all other objects from 7s to 14s.',
      section: 'balance',
      target: 'winch-claw',
    },

    // Weapons
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      devNote:
        'We feel the akimbo pistols are performing slightly too well at longer ranges, so this is a small nudge to bring them more into their intended niche.',
      note: '.50 Akimbo: Decreased damage falloff minimum range from 35m to 32m; max range from 42.5m to 39m.',
      section: 'balance',
      target: '50-akimbo',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      devNote:
        'The CB-01 has struggled to perform well across most modes and sees a very low pick rate. This change is intended to improve viability.',
      note: 'CB-01: Increased damage from 84 to 88.',
      section: 'balance',
      target: 'cb-01-repeater',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      devNote:
        'This change is mostly to correct some inconsistencies between attacks.',
      note: 'Dual Blades: Increased how quickly sprinting is re-enabled after the second attack animation by 25% and third by 15%.',
      section: 'balance',
      target: 'dual-blades',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      devNote:
        'We’re still trying to get the LH1 to a place where it’s viable but not dominant.',
      note: 'LH1: Increased damage from 42 to 44.',
      section: 'balance',
      target: 'lh1',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      devNote:
        'We feel the Pike currently has too much utility, being both good at long range but also very viable at close range.',
      note: 'Pike-556: Decreased damage from 50 to 48; decreased damage falloff min range from 45m to 40m; increased falloff multiplier from 0.75 to 0.8; increased bullet dispersion when firing from hip, especially while crouching.',
      section: 'balance',
      target: 'pike-556',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      devNote:
        "These changes should address the Riot Shield's ability to too reliably keep attackers on top of enemies once they reached them.",
      note: 'Riot Shield: Decreased max lunge speed from 10m/s to 7m/s; min speed from 7m/s to 5.5m/s; trigger range from 4m to 2.5m.',
      section: 'balance',
      target: 'riot-shield',
    },

    // New Weapons
    {
      adjustmentType: 'addition',
      category: 'weapons',
      note: 'Added BFR Titan (Heavy): High caliber, manual action revolver with immense damage.',
      section: 'balance',
      target: 'bfr-titan',
    },
    {
      adjustmentType: 'addition',
      category: 'weapons',
      note: 'Added P90 (Medium): Submachine gun with compact design and high capacity magazine.',
      section: 'balance',
      target: 'p90',
    },

    // General Features
    {
      adjustmentType: 'addition',
      category: 'ui',
      note: 'Instant Replay Beta: See your elimination moments played back live.',
      section: 'additions',
      target: 'instant-replay',
    },
    {
      adjustmentType: 'addition',
      category: 'ui',
      note: 'Match Recap: New summary screen for World Tour, Ranked, and QuickCash with timeline graph and personal breakdown.',
      section: 'additions',
      target: 'match-recap',
    },
    {
      adjustmentType: 'addition',
      category: 'general',
      note: 'Smooth Destruction: Collapsing structures now cause cascading damage and chain reactions.',
      section: 'additions',
      target: 'smooth-destruction',
    },
    {
      adjustmentType: 'addition',
      category: 'general',
      note: 'Playstyles: Pre-made Contestant templates for new players, faster unlocks.',
      section: 'additions',
      target: 'playstyles',
    },
    {
      adjustmentType: 'addition',
      category: 'general',
      note: 'Mouse and Keyboard support added for Console.',
      section: 'additions',
      target: 'console',
    },

    // Game Modes
    {
      adjustmentType: 'addition',
      category: 'game-mode',
      note: 'Head2Head is now a permanent Quick Play mode.',
      section: 'additions',
      target: 'head2head',
    },
    {
      adjustmentType: 'addition',
      category: 'game-mode',
      note: 'Team Deathmatch added to Bernal map.',
      section: 'additions',
      target: 'tdm-bernal',
    },
    {
      adjustmentType: 'removal',
      category: 'game-mode',
      note: 'Removed Terminal Attack from Quickplay and Private Matches.',
      section: 'removals',
      target: 'terminal-attack',
    },

    // Cosmetics
    {
      adjustmentType: 'addition',
      category: 'cosmetics',
      note: 'Added Earring category and 4 more Outfit slots.',
      section: 'additions',
      target: 'earrings',
    },
    {
      adjustmentType: 'addition',
      category: 'cosmetics',
      note: 'Character effects split from headwear into its own customization slot.',
      section: 'additions',
      target: 'character-effects',
    },

    // Maps
    {
      adjustmentType: 'buff',
      category: 'maps',
      note: 'Kyoto: Buildings now collapse into connected debris, layouts simplified, more jump pads and cover added.',
      section: 'balance',
      target: 'kyoto',
    },
    {
      adjustmentType: 'buff',
      category: 'maps',
      note: 'Monaco: Suspended structures reworked for better accessibility and gameplay flow.',
      section: 'balance',
      target: 'monaco',
    },
    {
      adjustmentType: 'buff',
      category: 'maps',
      note: 'Bernal: Added ladders, fixed movement issues, and improved collision.',
      section: 'balance',
      target: 'bernal',
    },
    {
      adjustmentType: 'buff',
      category: 'maps',
      note: 'General: All suspended structures now use Smooth Destruction.',
      section: 'balance',
      target: 'general',
    },

    // Audio
    {
      adjustmentType: 'addition',
      category: 'audio',
      note: 'New Season 8 soundtrack inspired by Olympic grandness and previous seasons.',
      section: 'additions',
      target: 'soundtrack',
    },
  ],
  title: 'Season 8 Update 8.0.0',
  version: '8.0.0',
};

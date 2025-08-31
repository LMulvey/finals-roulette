import { type Patch } from '../types';

export const patch760: Patch = {
  date: new Date('2025-07-24T11:00:00'),
  description: `This update features major loadout changes for all archetypes, gadget and weapon balance, melee improvements, and a wide range of bug fixes and quality-of-life updates across maps, UI, and more.`,
  originalUrl: 'https://www.reachthefinals.com/patchnotes/760',
  patchNotes: [
    // Archetypes - Light
    {
      adjustmentType: 'removal',
      category: 'contestants',
      note: 'Replaced the Grapple Hook with the Evasive Dash in the default Light Loadout. Grapple Hook must now be unlocked for VRs if not already owned.',
      section: 'balance',
      target: 'light',
    },
    {
      adjustmentType: 'removal',
      category: 'weapons',
      note: 'Replaced the M11 with the XP-54 in the default Light Loadout. M11 must now be unlocked for VRs if not already owned.',
      section: 'balance',
      target: 'light',
    },
    {
      adjustmentType: 'addition',
      category: 'gadget',
      note: 'Moved the Frag Grenade and Sonar Grenade from Reserve into the default Light Loadout.',
      section: 'balance',
      target: 'light',
    },
    {
      adjustmentType: 'removal',
      category: 'gadget',
      note: 'Moved the Flashbang and Smoke Grenade from the default Light Loadout into the Reserve.',
      section: 'balance',
      target: 'light',
    },

    // Archetypes - Medium
    {
      adjustmentType: 'removal',
      category: 'gadget',
      note: 'Moved the Goo Grenade from the default Medium Loadout into the Reserve.',
      section: 'balance',
      target: 'medium',
    },
    {
      adjustmentType: 'addition',
      category: 'gadget',
      note: 'Moved the Frag Grenade from Reserve into the default Medium Loadout.',
      section: 'balance',
      target: 'medium',
    },
    {
      adjustmentType: 'removal',
      category: 'gadget',
      note: 'Replaced the Glitch Trap with the Explosive Mine in the default Medium Loadout. Glitch Trap must now be unlocked for VRs if not already owned.',
      section: 'balance',
      target: 'medium',
    },
    {
      adjustmentType: 'addition',
      category: 'weapons',
      note: 'Added the Compact Reflector sight to the default AKM and R .357 in the default Medium Loadout.',
      section: 'balance',
      target: 'medium',
    },

    // Archetypes - Heavy
    {
      adjustmentType: 'addition',
      category: 'weapons',
      note: 'Added the Compact Reflector Sight to the M60 in the default Heavy Loadout.',
      section: 'balance',
      target: 'heavy',
    },

    // Gadgets
    {
      adjustmentType: 'nerf',
      category: 'gadget',
      devNote:
        'This nudge should encourage players to find a safe spot to defib more often, moving more risk onto the reviving player.',
      note: 'Defibrillator: Increased charge time from 0.8s to 1s.',
      section: 'balance',
      target: 'defibrillator',
    },
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: 'H+ Infuser and Healing Emitter VFX now use team colors, making it easier to tell who is healing who.',
      section: 'balance',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      devNote: 'Projectiles will be addressed in a future update.',
      note: 'Nullifier: Bullets will now pass through Nullified players (hitscan only for now).',
      section: 'balance',
      target: 'stun-gun',
    },

    // Maps
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'SYS$Horizon: Rebalanced destruction for the Campus, Workspace, and Art Gallery buildings.',
      section: 'balance',
      target: 'sys-horizon',
    },

    // Mode - Cashout
    {
      adjustmentType: 'removal',
      category: 'game-mode',
      devNote:
        'This change is a test to reduce “double stacking” frustration and will be re-assessed after 7.9.',
      note: 'Any Vaults/Cash Boxes not delivered to a Cashout Station by overtime are now despawned and removed from the match.',
      section: 'balance',
      target: 'cashout',
    },

    // Private Matches
    {
      adjustmentType: 'addition',
      category: 'game-mode',
      devNote:
        'Known issues: players get four respawn tokens instead of two, and can swap items from Reserve between lives. Fixes coming soon.',
      note: 'Added the Ranked Cashout ruleset from Ranked Tournaments to Private Matches.',
      section: 'balance',
      target: 'private-matches',
    },

    // Specializations
    {
      adjustmentType: 'neutral',
      category: 'specializations',
      note: 'Healing Beam VFX now use team colors, making it easier to tell who is healing who.',
      section: 'balance',
      target: 'healing-beam',
    },

    // Weapons - Melee
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Dagger: Increased outer width of hit sweeps by ~40%, decreased inner width near camera, increased sweep duration from 0.07s to 0.1s for more reliable hits.',
      section: 'balance',
      target: 'dagger',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Dual Blades: Increased hit sweep range by ~40cm and height by ~5cm, decreased inner width near camera for more reliable hits.',
      section: 'balance',
      target: 'dual-blades',
    },
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      devNote: 'Should make KS-23 more reliable at intended ranges.',
      note: 'KS-23: Converted to hybrid hitscan-projectile weapon. Hitscan up to 25m, projectile after 25m. Projectile velocity reduced from 300m/s to 280m/s.',
      section: 'balance',
      target: 'ks-23',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Riot Shield: Updated hit sweeps for better reliability and animation match. Increased sweep range by ~50cm, lifetime from 0.04s to 0.12s, outer width by ~70%. Decreased inner width near camera and attack duration from 0.9s to 0.81s (10% faster).',
      section: 'balance',
      target: 'riot-shield',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Sledgehammer: Increased outer width of primary attack’s hit sweeps by ~80%, decreased inner width near camera for more reliable hits.',
      section: 'balance',
      target: 'sledgehammer',
    },
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      note: 'Spear: Decreased inner width of hit sweep near camera for more reliable hits.',
      section: 'balance',
      target: 'spear',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Sword (Primary): Increased damage from 74 to 88, attack duration from 0.55s to 0.6s, sweep height by ~5cm, decreased inner width near camera, and improved sweep alignment.',
      section: 'balance',
      target: 'sword',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      devNote:
        'These changes make the lunge more intuitive and powerful, while controlling momentum exploits.',
      note: 'Sword (Secondary): Increased damage from 105 to 120, decreased attack duration from 1s to 0.75s (faster), added rotation clamping to 40 degrees during lunge, increased lunge speed from 1500 to 1750, range from 5.5m to 7m, and improved “Super Dash” system.',
      section: 'balance',
      target: 'sword',
    },

    // Content and Bug Fixes - Animation
    {
      adjustmentType: 'neutral',
      category: 'animation',
      note: 'Fixed a broken third person animation when reloading an empty CL-40.',
      section: 'content-and-bug-fixes',
      target: 'cl-40',
    },
    {
      adjustmentType: 'neutral',
      category: 'animation',
      note: 'Fixed an issue where players could end up stuck in a corpse pose.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Characters
    {
      adjustmentType: 'neutral',
      category: 'characters',
      note: 'Fixed an issue where certain lower body cosmetics could cause very thin legs when combined with low heels.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'buff',
      category: 'characters',
      note: 'Improved appearance of Chromatique Dress for Heavy contestants.',
      section: 'content-and-bug-fixes',
      target: 'heavy',
    },
    {
      adjustmentType: 'neutral',
      category: 'characters',
      note: 'Fixed an issue where the Wise Wing Jumper would float when jumping and crouching.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'characters',
      note: 'Fixed Medium and Light builds looking overly muscular when equipping a custom outfit using heavy muscular body types.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Controller
    {
      adjustmentType: 'neutral',
      category: 'controller',
      note: 'Fixed an issue where the text chat menu would sometimes not open when using a controller.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Gadgets
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: 'Barricade: Ruby Barricade skin now correctly references Season 6 instead of Season 5.',
      section: 'content-and-bug-fixes',
      target: 'barricade',
    },

    // Game Modes
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Cashout: Fixed an issue where players could incorrectly receive an abandon penalty, even when it appeared safe to leave due to a teammate never connecting.',
      section: 'content-and-bug-fixes',
      target: 'cashout',
    },

    // Private Matches
    {
      adjustmentType: 'addition',
      category: 'game-mode',
      note: 'Enabled Super Cashball for the duration of the event in Private Matches.',
      section: 'content-and-bug-fixes',
      target: 'private-matches',
    },

    // Gameplay
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Speculative fix for an issue where players could sometimes end up in the wrong body when revived.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Maps
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Fixed an issue where pre-placed Ziplines in maps could become partially invisible.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Adjusted health values of various open and closed fences for consistency.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Fixed a small number of lighting issues.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Bernal: Fixed ladders and ziplines not having appropriate sponsor colors.',
      section: 'content-and-bug-fixes',
      target: 'bernal',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Kyoto: Fixed an issue where Arena Carriables could be thrown through paper walls without breaking them. Made texture optimizations and fixed small collision issues.',
      section: 'content-and-bug-fixes',
      target: 'kyoto',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Las Vegas Stadium: Fixed a bug that triggered the “Hackout” Game Show Event outside of the World Tour event.',
      section: 'content-and-bug-fixes',
      target: 'las-vegas-stadium',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Monaco: Fixed a collision issue that allowed players to get underneath the ground mesh and fixed a zipline hovering above the ground.',
      section: 'content-and-bug-fixes',
      target: 'monaco',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: "Skyway Stadium: Adjusted aircon vent path so they don't break when the wall next to them is dematerialized.",
      section: 'content-and-bug-fixes',
      target: 'skyway-stadium',
    },

    // Rendering
    {
      adjustmentType: 'neutral',
      category: 'rendering',
      note: 'NVIDIA DLSS 4 Transformer model now uses the newer “K" preset instead of "J". Updated DLSS version from 4.0.0 to 4.0.2.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Settings
    {
      adjustmentType: 'neutral',
      category: 'settings',
      note: 'Fixed an issue where the Push to Talk button would not be correctly shown the first time the player loads the Settings screen.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Specializations
    {
      adjustmentType: 'buff',
      category: 'specializations',
      note: 'Improved hit detection of the Winch Claw when using it while interacting with a Zipline.',
      section: 'content-and-bug-fixes',
      target: 'winch-claw',
    },

    // UI
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed sprays overlapping with UI in customization screen when previewing.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed rarity display issue for the Off the Grid and Silent March outfits in the Sponsorship menu.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed gamepad navigation sometimes breaking when backing out of the Contestant menu or getting stuck in Style and Appearance customization menus.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed an issue where Quickplay Points could be missing from the end of round progression screens after a match.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed an issue where previously earned Recruit & Rise rewards could appear in the end of round summary.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed issue where the respawn timer could continue to count down after the team disconnected.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'buff',
      category: 'ui',
      note: 'Made improvements to player card rendering when viewed in-match.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed an issue where character particle effects could remain visible after navigating to the Career screen.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed an issue where props used during emotes would not drop to the floor correctly in the Contestant screen.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // VFX
    {
      adjustmentType: 'buff',
      category: 'vfx',
      note: 'Improved visibility of firework VFX in the Fourth of Mayhem RPG Skin to match Rocket Resolution RPG Skin.',
      section: 'content-and-bug-fixes',
      target: 'rpg',
    },

    // Weapons
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      note: 'Melee attacks will no longer move the player towards targets that are currently invulnerable.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Increased the rarity to Epic and introduced animated effects to the Buffer Overflow Weapon skins.',
      section: 'content-and-bug-fixes',
      target: 'buffer-overflow-skins',
    },
  ],
  title: 'Season 7 Update 7.6.0',
  version: '7.6.0',
};

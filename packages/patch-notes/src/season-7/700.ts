import { type Patch } from '../types';

export const patch700: Patch = {
  date: new Date('2025-06-12T11:00:00'),
  description: `A new season brings a fresh round of balance changes, quality-of-life improvements, and bug fixes. This update focuses on tuning carriables, gadgets, weapons, and progression, while also addressing player feedback and improving the overall experience.`,
  originalUrl: 'https://www.reachthefinals.com/patchnotes/700',
  patchNotes: [
    // Balance Changes - Arena Carriables
    {
      adjustmentType: 'buff',
      category: 'general',
      note: 'Gas Canisters no longer require instant damage to trigger, making them easier to activate.',
      section: 'balance',
      target: 'gas-canister',
    },
    {
      adjustmentType: 'nerf',
      category: 'general',
      note: 'Glitch Barrel health decreased from 75 to 50.',
      section: 'balance',
      target: 'glitch-barrel',
    },
    {
      adjustmentType: 'nerf',
      category: 'general',
      note: 'Goo Barrel health decreased from 75 to 50.',
      section: 'balance',
      target: 'goo-barrel',
    },
    {
      adjustmentType: 'nerf',
      category: 'general',
      note: 'Goo Barrel blob health decreased from 300 to 240.',
      section: 'balance',
      target: 'goo-barrel',
    },
    {
      adjustmentType: 'nerf',
      category: 'general',
      note: 'Healing Barrel health decreased from 50 to 15.',
      section: 'balance',
      target: 'healing-barrel',
    },
    {
      adjustmentType: 'buff',
      category: 'general',
      note: 'Healing Barrels no longer require instant damage to trigger, making them easier to activate.',
      section: 'balance',
      target: 'healing-barrel',
    },
    {
      adjustmentType: 'nerf',
      category: 'general',
      note: 'Powder Canister health decreased from 50 to 15.',
      section: 'balance',
      target: 'powder-canister',
    },
    {
      adjustmentType: 'buff',
      category: 'general',
      note: 'Powder Canisters no longer require instant damage to trigger, making them easier to activate.',
      section: 'balance',
      target: 'powder-canister',
    },

    // Gadgets
    {
      adjustmentType: 'addition',
      category: 'gadget',
      note: 'Added controller aim assistance support to deployable Gadgets such as Turrets, APS, Explosive Mines, etc. These objects should be much less frustrating to aim at for controller users.',
      section: 'balance',
      target: 'general',
    },
    {
      adjustmentType: 'buff',
      category: 'gadget',
      changes: [{ from: 35, stat: 'cooldown', to: 28 }],
      devNote:
        'This small adjustment should make the Cube more appealing given its lower usage despite strong impact.',
      note: 'Anti-Gravity Cube cooldown decreased from 35s to 28s.',
      section: 'balance',
      target: 'anti-gravity-cube',
    },
    {
      adjustmentType: 'buff',
      category: 'gadget',
      devNote:
        'APS Turret usage has gradually dropped over time, as players have found more reliable ways to counter it. This adjustment aims to give the APS a little more power and hopefully make it slightly more useful to players.',
      note: 'APS Turret health consumed per projectile decreased to 20%, allowing a full health APS to block 5 projectiles instead of 4.',
      section: 'balance',
      target: 'aps-turret',
    },
    {
      adjustmentType: 'nerf',
      category: 'gadget',
      changes: [{ from: 3, label: 'Radial check', stat: 'other', to: 1, unit: 'm' }],
      devNote:
        'These changes hopefully make the Flashbang less punishing for players who actively countered it by looking away, and should reduce Flashbang spam in TDM.',
      note: 'Flashbang: Increased view angle falloff and decreased radial check from 3m to 1m, making players much less likely to be flashed when looking away.',
      section: 'balance',
      target: 'flashbang',
    },
    {
      adjustmentType: 'nerf',
      category: 'gadget',
      note: 'Goo Grenade wall size decreased from 2x6 to 2x5.',
      section: 'balance',
      target: 'goo-grenade',
    },
    {
      adjustmentType: 'nerf',
      category: 'gadget',
      changes: [{ from: 300, label: 'Blob health', stat: 'other', to: 240 }],
      devNote:
        'These changes should tone down goo power slightly, making it easier to counter goo while still allowing defenders to slow attackers.',
      note: 'Goo Grenade blob health decreased from 300 to 240.',
      section: 'balance',
      target: 'goo-grenade',
    },
    {
      adjustmentType: 'buff',
      category: 'gadget',
      changes: [{ from: 24, stat: 'cooldown', to: 20 }],
      note: 'Gravity Vortex cooldown decreased from 24s to 20s.',
      section: 'balance',
      target: 'gravity-vortex',
    },

    // Game Modes
    {
      adjustmentType: 'buff',
      category: 'game-mode',
      note: 'Cashout (Ranked Tournaments): Decreased size of various spawn negation zones, making more respawn locations eligible.',
      section: 'balance',
      target: 'cashout',
    },
    {
      adjustmentType: 'buff',
      category: 'game-mode',
      devNote:
        'This change makes the reconnect window more forgiving for full parties.',
      note: 'Cashout (Ranked Tournaments): Increased reconnect window for parties of three from 210 seconds to match end.',
      section: 'balance',
      target: 'cashout',
    },
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      devNote:
        'This aims to reduce the negative impact of teammates disconnecting and not returning.',
      note: 'Updated Ranked Score penalty system: Only the first player to abandon a match takes a fixed penalty; subsequent leavers only get a score update based on placement.',
      section: 'balance',
      target: 'cashout',
    },
    {
      adjustmentType: 'buff',
      category: 'game-mode',
      devNote:
        'This is to reduce negative consequences of teammates disconnecting in ranked matches, while avoiding exploits.',
      note: 'Introduced Ranked Score penalty reduction: Reductions for elimination are reduced by ~30% if a teammate abandoned (not applied if the missing player was in your party).',
      section: 'balance',
      target: 'cashout',
    },
    {
      adjustmentType: 'buff',
      category: 'game-mode',
      note: 'Cashout (World Tour): Decreased size of various spawn negation zones, making more respawn locations eligible.',
      section: 'balance',
      target: 'cashout',
    },
    {
      adjustmentType: 'buff',
      category: 'game-mode',
      note: 'Cashout (World Tour): Increased reconnect window for parties of three from 210 seconds to match end.',
      section: 'balance',
      target: 'cashout',
    },
    {
      adjustmentType: 'addition',
      category: 'game-mode',
      devNote:
        'We believe enabling the whole map pool at all times gives World Tour players the best experience and variety.',
      note: 'World Tour map pool now includes all maps for the whole season, rather than weekly rotations.',
      section: 'balance',
      target: 'cashout',
    },
    {
      adjustmentType: 'buff',
      category: 'game-mode',
      note: 'Terminal Attack: Increased reconnect window for parties of five from 210 seconds to match end.',
      section: 'balance',
      target: 'terminal-attack',
    },

    // Progression Points
    {
      adjustmentType: 'buff',
      category: 'general',
      devNote:
        'These changes should make the journey to Gold 1 and Emerald tiers faster and more rewarding.',
      note: 'Quick Play Points: Increased points for finishing 1st/2nd/3rd in Quick Cash and for wins/losses in Power Shift, Terminal Attack, or TDM.',
      section: 'balance',
      target: 'general',
    },
    {
      adjustmentType: 'buff',
      category: 'general',
      devNote:
        'These changes should make it easier for new players to unlock and use items.',
      note: 'VRs: Decreased VR cost of all items from Seasons 1-6 to 500 VRs; Season 7 items set to 2,200 VRs. New players now get 5,000 VRs after three rounds.',
      section: 'balance',
      target: 'general',
    },
    {
      adjustmentType: 'buff',
      category: 'general',
      devNote:
        'This guarantees two Win Points for every match played, speeding up the journey to Emerald.',
      note: 'Win Points: Increased points for losing in the first round of World Tour matches from 0 to 2.',
      section: 'balance',
      target: 'general',
    },

    // Specializations
    {
      adjustmentType: 'nerf',
      category: 'specializations',
      changes: [{ from: 300, label: 'Blob health', stat: 'other', to: 240 }],
      note: 'Goo Gun blob health decreased from 300 to 240.',
      section: 'balance',
      target: 'goo-gun',
    },

    // Gadget Additions
    {
      adjustmentType: 'addition',
      category: 'gadget',
      note: 'Breach Drill: A deployable gadget that creates a tunnel through walls.',
      section: 'balance',
      target: 'breach-drill',
    },
    {
      adjustmentType: 'addition',
      category: 'gadget',
      note: 'Healing Emitter: A deployable gadget that heals nearby allies.',
      section: 'balance',
      target: 'healing-emitter',
    },
    {
      adjustmentType: 'addition',
      category: 'gadget',
      note: 'H+ Infuser: A lil gun that sprays your fellow contestants with healing.',
      section: 'balance',
      target: 'h-plus-infuser',
    },

    // Weapons
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      note: 'Rebalanced environmental damage values across multiple weapons for more consistency when damaging/destroying props (no change to building damage).',
      section: 'balance',
      target: 'general',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      changes: [{ from: 21, stat: 'magazine-size', to: 24 }],
      note: '93R magazine size increased from 21 to 24.',
      section: 'balance',
      target: '93r',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      changes: [
        { from: 10, stat: 'damage', to: 9 },
        { from: 110, label: 'Full shot damage', stat: 'other', to: 99 },
      ],
      devNote:
        'This nudge should bring Cerberus more in line with other Medium weapons.',
      note: 'Cerberus: Damage per pellet decreased from 10 to 9 (full shot damage from 110 to 99).',
      section: 'balance',
      target: 'cerberus',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      changes: [{ from: 700, stat: 'environmental-damage', to: 1000 }],
      devNote:
        'This increases the viability of the KS-23 while retaining its unique character.',
      note: 'KS-23: Environmental damage increased from 700 to 1000, making it easier to fracture wall segments.',
      section: 'balance',
      target: 'ks-23',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      changes: [{ from: 40, stat: 'damage', to: 42 }],
      devNote:
        'This buff should move LH1 back into a more viable tier for Light, without returning to its previous overwhelming state.',
      note: 'LH1: Damage increased from 40 to 42.',
      section: 'balance',
      target: 'lh1',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      changes: [{ from: 25, stat: 'environmental-damage', to: 30 }],
      note: 'M134 Minigun: Environmental damage increased from 25 to 30, allowing it to remove three wall segments per full magazine.',
      section: 'balance',
      target: 'm134-minigun',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      changes: [
        { from: 115, stat: 'damage', to: 100 },
        { from: 200, label: 'Secondary damage', stat: 'other', to: 154 },
      ],
      devNote:
        'These targeted changes reduce the Sledgehammer’s dominance while keeping melee viable.',
      note: 'Sledgehammer: Primary attack damage decreased from 115 to 100; secondary attack damage decreased from 200 to 154.',
      section: 'balance',
      target: 'sledgehammer',
    },

    // Content and Bug Fixes (examples, not exhaustive)
    {
      adjustmentType: 'neutral',
      category: 'animation',
      note: 'Fixed an issue where characters sometimes looked broken when picking up items while inspecting their weapon.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'audio',
      devNote:
        'This ensures players using custom playlists get a fresh intro to the Season 7 Soundtrack.',
      note: 'Improved randomization of music playlists to prefer songs from the latest season.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'controller',
      note: 'Aim Assist: Added camera magnetism and aim snapping for Deployables.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'cosmetics',
      note: "Fixed an issue causing 'Stream Circuit' skins to lose their glow when viewed from a distance.",
      section: 'content-and-bug-fixes',
      target: 'stream-circuit',
    },
    {
      adjustmentType: 'neutral',
      category: 'settings',
      note: 'Players can now change their Player numbers through the Settings menu.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Remaining ammo now blinks when low, instead of changing to a solid red color.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      devNote:
        'As Season 7 progresses, more weapon types will be moved to this system. Please report any issues you find!',
      note: 'Moved most of the game’s automatic weapons to a new underlying weapon system to address “I can’t shoot” and “I can’t ADS” bugs.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      note: 'You can no longer backstab inanimate objects, only Contestants.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      note: 'CB-01 Repeater: Fixed an issue where the default iron sight had more magnification than intended. Can now equip the Reflector Sight.',
      section: 'content-and-bug-fixes',
      target: 'cb-01-repeater',
    },
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      note: 'Sight rebalance: Compact Reflector, Adder Reflex, and Holographic Sights now have consistent magnification across all guns.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      note: 'Reflector Sight: Decreased magnification from High to Medium.',
      section: 'content-and-bug-fixes',
      target: 'reflector-sight',
    },
  ],
  title: 'Season 7 Update 7.0.0',
  version: '7.0.0',
};

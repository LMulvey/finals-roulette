import { type Patch } from '../types';

export const patch630: Patch = {
  date: new Date('2025-04-10 11:00:00'),
  description: `This update brings light balance changes, bug fixes, and improvements to enhance gameplay and address community feedback. Dive into the patch notes below for all the details.`,
  originalUrl: 'https://www.reachthefinals.com/patchnotes/630',
  patchNotes: [
    // Balance Changes
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      devNote: `The Sword has increasingly become a source of frustration for many players, especially Light players, due to its one-shot potential when combined with Quick Melee. This change removes the one-shot potential of the Sword. Longer term, we’ll monitor its performance and explore alternative changes.`,
      note: 'Decreased secondary attack damage from 140 to 105',
      section: 'balance',
      target: 'sword',
    },

    // Animation
    {
      adjustmentType: 'neutral',
      category: 'animation',
      note: 'Fixed an issue on the standard reload for the AKM where the magazine was flicked in the wrong direction.',
      section: 'content-and-bug-fixes',
      target: 'akm',
    },
    {
      adjustmentType: 'neutral',
      category: 'animation',
      note: 'Fixed an animation issue where the Haptic Reload animation for .50 Akimbo looked broken from another player’s perspective.',
      section: 'content-and-bug-fixes',
      target: '50-akimbo',
    },
    {
      adjustmentType: 'neutral',
      category: 'animation',
      note: 'Added missing shell eject for the CB-01 Repeater lever action animation.',
      section: 'content-and-bug-fixes',
      target: 'cb-01-repeater',
    },
    {
      adjustmentType: 'neutral',
      category: 'animation',
      note: 'Updated the M26 Matter reload animations to move the reticle less when aiming down sights.',
      section: 'content-and-bug-fixes',
      target: 'm26-matter',
    },

    // Badges
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Removed faulty tier indicator number from the Ruby Badge.',
      section: 'content-and-bug-fixes',
      target: 'ruby-badge',
    },

    // Characters & Customization
    {
      adjustmentType: 'neutral',
      category: 'characters',
      note: 'Fixed a lighting issue on the contestant cards.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'characters',
      note: 'Reduced the frequency of Moolah charm mooing, with a lower chance of the sounds playing on eliminating an enemy.',
      section: 'content-and-bug-fixes',
      target: 'moolah-charm',
    },

    // Clubs
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Browse Clubs screen now hides full clubs by default. Added a filter toggle to include full clubs.',
      section: 'content-and-bug-fixes',
      target: 'clubs',
    },

    // Controller
    {
      adjustmentType: 'neutral',
      category: 'controller',
      note: 'Fixed an issue where the controller rumble was turned on when spectating other players.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Game Modes
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Fixed an issue that would previously lead to incomplete information when inspecting your team’s loadout at the start of the match.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Cashboxes that are hidden, due to being carried, are now briefly visible when a contestant spawns.',
      section: 'content-and-bug-fixes',
      target: 'cashout',
    },
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Fixed a rare issue where the wrong loadout was selected in TDM when entering the round.',
      section: 'content-and-bug-fixes',
      target: 'tdm',
    },

    // Arenas
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Fixed a staircase in the Hotels (ISEUL-T) area in Bernal being slightly too steep, causing odd movement behavior.',
      section: 'content-and-bug-fixes',
      target: 'bernal',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'General polish on collision, materials, and destruction in Monaco.',
      section: 'content-and-bug-fixes',
      target: 'monaco',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Fixed an issue with decals on Las Vegas Stadium that covered jump pads.',
      section: 'content-and-bug-fixes',
      target: 'las-vegas-stadium',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Fixed an issue where paper walls in Kyoto would sometimes not get destroyed right away.',
      section: 'content-and-bug-fixes',
      target: 'kyoto',
    },

    // Performance & Stability
    {
      adjustmentType: 'neutral',
      category: 'stability-and-performance',
      note: 'Optimized GPU performance in high-load destruction scenarios.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'stability-and-performance',
      note: 'Fixed some of our more common crashes.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Private Matches & Spectator
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Added global kill-feed to spectator slots.',
      section: 'content-and-bug-fixes',
      target: 'private-matches',
    },
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Fixed distant outlines not showing up in spectator mode.',
      section: 'content-and-bug-fixes',
      target: 'private-matches',
    },

    // Rendering
    {
      adjustmentType: 'neutral',
      category: 'rendering',
      note: 'Fixed an issue where volumetric effects appeared black on lower quality settings.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Settings
    {
      adjustmentType: 'neutral',
      category: 'settings',
      note: 'Added support for NVIDIA DLSS 4, including multi-frame generation and the latest SuperResolution models.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // UI
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed a rare issue where the scoreboard could be viewed in an incomplete state at the start of the match.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Improved the frontend equipping functionality to ensure the correct parts are selected and equipped when purchasing a bundle.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Weapons
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      note: 'Winding up the Minigun no longer uses the secondary fire input action. Instead, it uses the same keybind as aim down sight.',
      section: 'content-and-bug-fixes',
      target: 'minigun',
    },
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      note: 'The scope movement when aiming down the scope on the SR-84 is now toned down to more accurately reflect where shots will land.',
      section: 'content-and-bug-fixes',
      target: 'sr-84',
    },

    // Security and Anti-Cheat
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Improved messaging for forbidden tools.',
      section: 'security-and-anti-cheat',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Refined detection systems.',
      section: 'security-and-anti-cheat',
      target: 'general',
    },
  ],
  title: 'Season 6 Update 6.3.0',
  updatedNote: '6.3.0 is HERE',
  version: '6.3.0',
};

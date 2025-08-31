import { type Patch } from '../types';

export const patch790: Patch = {
  date: new Date('2025-08-14T11:00:00'),
  description: `This update delivers targeted balance changes to gadgets and weapons, mode adjustments, and a wide range of bug fixes and improvements across animation, audio, maps, UI, and more.`,
  originalUrl: 'https://www.reachthefinals.com/patchnotes/790',
  patchNotes: [
    // Balance Changes - Gadgets
    {
      adjustmentType: 'nerf',
      category: 'gadget',
      devNote:
        'Goo prevalence has increased to the point of being disruptive. This change should reduce goo usage frequency.',
      note: 'Goo Grenade: Cooldown increased from 20s to 30s.',
      section: 'balance',
      target: 'goo-grenade',
    },

    // Balance Changes - Modes
    {
      adjustmentType: 'removal',
      category: 'game-mode',
      devNote:
        'The despawn rule is more disruptive in World Tour, so it is now disabled there but remains in Ranked for further review.',
      note: 'Cashout (World Tour): Vaults/Cash Boxes that have not been delivered to a Cashout Station by overtime will no longer despawn, reverting the 7.6 change. In Ranked, undelivered Vaults/Cash Boxes will continue to despawn at overtime.',
      section: 'balance',
      target: 'cashout',
    },

    // Balance Changes - Weapons
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      devNote:
        'The previous buff made the 93R a bit too strong. This change better aligns it with other Light weapons.',
      note: '93R: Decreased rate of fire from 220 to 210.',
      section: 'balance',
      target: '93r',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      devNote:
        'These changes should buff Cerberus viability without returning it to an overpowered state.',
      note: 'Cerberus 12GA: Decreased pellet distribution radius by ~10% (more accurate). Increased heat applied to world objects from 2.5 to 7.5, igniting toxic gas clouds in a single shot.',
      section: 'balance',
      target: 'cerberus',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      devNote: 'A subtle buff to improve Model 1887 viability.',
      note: 'Model 1887: Increased maximum ammo capacity from 6 to 7.',
      section: 'balance',
      target: 'model-1887',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      devNote:
        'This buff boosts the value of the Sledgehammer’s secondary attack. Hit registration issues are under investigation.',
      note: 'Sledgehammer: Secondary attack damage increased from 154 to 175.',
      section: 'balance',
      target: 'sledgehammer',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      devNote:
        'This should make the lunge feel better and less restrictive for vertical movements.',
      note: 'Sword: Increased vertical component of secondary attack rotation clamping from 40° to 90°, making lunges less constrained when aiming up or down.',
      section: 'balance',
      target: 'sword',
    },

    // Content and Bug Fixes - Animation
    {
      adjustmentType: 'neutral',
      category: 'animation',
      note: 'Fixed melee swings sometimes not playing when viewing other Contestants.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'animation',
      note: 'Fixed an issue where sprint animations would not play correctly after inspecting with certain skins.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'animation',
      note: 'Fixed an issue where jumping with the Throwing Knives, while using the secondary attack, could cover the center of the screen.',
      section: 'content-and-bug-fixes',
      target: 'throwing-knives',
    },
    {
      adjustmentType: 'neutral',
      category: 'animation',
      devNote:
        'This is the first of several fixes for Riot Shield issues, addressing animation clarity and desyncs.',
      note: 'Fixed a case where the Riot Shield could desync in third person, not correctly showing the protected state.',
      section: 'content-and-bug-fixes',
      target: 'riot-shield',
    },

    // Audio
    {
      adjustmentType: 'buff',
      category: 'audio',
      note: 'Improved the quality of Announcer voice lines and made them less repetitive.',
      section: 'content-and-bug-fixes',
      target: 'announcer',
    },

    // Contracts
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Fixed issue where some damage types were not considered for Contracts involving damage on/from the Power Shift platform.',
      section: 'content-and-bug-fixes',
      target: 'contracts',
    },

    // Customization
    {
      adjustmentType: 'neutral',
      category: 'cosmetics',
      note: 'Fixed The Devourer eyes showing up on top of glasses.',
      section: 'content-and-bug-fixes',
      target: 'the-devourer',
    },
    {
      adjustmentType: 'neutral',
      category: 'cosmetics',
      note: 'Fixed an issue that caused some older CNS items to have incorrectly displayed prints.',
      section: 'content-and-bug-fixes',
      target: 'cns-items',
    },

    // Esports
    {
      adjustmentType: 'addition',
      category: 'general',
      devNote: 'Check out more on the esports format and sign up to compete!',
      note: 'Updated the Esports section to accommodate new information and registration for the Open Qualifiers.',
      section: 'content-and-bug-fixes',
      target: 'esports',
    },

    // Gadgets
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: 'H+ Infuser: Fixed an issue where getting eliminated while ADS could result in a broken weapon model.',
      section: 'content-and-bug-fixes',
      target: 'hplus-infuser',
    },
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: 'Healing Emitter: Fixed an issue where Contestants were not healed by their team’s Healing Emitter while holding an enemy team’s Healing Emitter.',
      section: 'content-and-bug-fixes',
      target: 'healing-emitter',
    },
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: 'Nullifier: Fixed an issue where nullified opponents could deal quick melee damage.',
      section: 'content-and-bug-fixes',
      target: 'stun-gun',
    },

    // Gameplay
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Fixed an issue that caused kill hitmarkers to be missing in certain situations.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Fixed a hit registration issue with KS-23 and SR-84.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Updated respawn statue collision to behave more predictably and reduce rolling on sloped surfaces.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Maps
    {
      adjustmentType: 'buff',
      category: 'maps',
      note: 'Larger trees now have sturdier trunks that require more bullets to destroy, making them more reliable for cover and line of sight blocking.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Practice Range: Fixed an issue where the trophy leaderboard text could be difficult to read when picked up. Added Blast Off and Super Cashball trophies.',
      section: 'content-and-bug-fixes',
      target: 'practice-range',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Bernal: Fixed a zipline on top of the Chapel that floated after the geometry beneath it was destroyed. Updated collision on corrugated metal modules and fixed railing movement issues.',
      section: 'content-and-bug-fixes',
      target: 'bernal',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Monaco: Fixed some visual gaps in ground meshes.',
      section: 'content-and-bug-fixes',
      target: 'monaco',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Seoul: Slightly raised the vent path on the outside of Apartments for smoother movement.',
      section: 'content-and-bug-fixes',
      target: 'seoul',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Skyway Stadium: Fixed an issue where grenades and bullets could pass through a narrow part of the back of the Office building.',
      section: 'content-and-bug-fixes',
      target: 'skyway-stadium',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'SYS$Horizon: Updated the Library building with the latest destruction systems. Fixed a step being too high on the voxel bridge next to campus.',
      section: 'content-and-bug-fixes',
      target: 'sys-horizon',
    },
    {
      adjustmentType: 'addition',
      category: 'maps',
      note: 'Nozomi/Citadel: Added trees at the edges around the Cybercafe to block sightlines towards the corner next to Apartments. Fixed a duplicate desk in the Operations Center.',
      section: 'content-and-bug-fixes',
      target: 'nozomi-citadel',
    },

    // Private Matches & Spectator
    {
      adjustmentType: 'buff',
      category: 'game-mode',
      note: 'Improved layout and visuals for the match building screen in Private Matches.',
      section: 'content-and-bug-fixes',
      target: 'private-matches',
    },
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Fixed an issue where you could end up in a corrupted private match lobby.',
      section: 'content-and-bug-fixes',
      target: 'private-matches',
    },

    // Rendering
    {
      adjustmentType: 'addition',
      category: 'rendering',
      note: 'Added support for AMD FSR 3 Frame Generation. Pause DLSS Frame Generation in fullscreen menus (except Video Settings) to avoid UI artifacts. Updated AMD FSR version from 3.1.3 to 3.1.4.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'rendering',
      note: 'Fixed an issue causing light leaking in fog. Optimized GPU performance with many visual effects active. Removed a command line that could give unfair advantages by lowering graphical fidelity.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Settings
    {
      adjustmentType: 'neutral',
      category: 'settings',
      note: 'Fixed an issue that prevented gamepads/controllers from working when Steam Input is enabled.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Social
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Fixed mouse scroll wheel functioning poorly with the text chat window.',
      section: 'content-and-bug-fixes',
      target: 'chat',
    },
    {
      adjustmentType: 'addition',
      category: 'general',
      devNote: 'Long requested and finally in THE FINALS!',
      note: 'Added "Stay as a Party" functionality to the end of round screen, allowing you to form a party with your last team.',
      section: 'content-and-bug-fixes',
      target: 'party',
    },

    // UI
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'XBOX platform avatars are now properly shown as your profile image where applicable.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed an issue where only item names were shown instead of descriptions in outfit customization.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed incorrect game mode name being shown in the tab scoreboard when reconnecting after shutting down the game.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Resolved issue causing new markers to appear on other outfits after deleting an outfit.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'The Contracts screen now properly retains the selected tab when navigating back from other pages.',
      section: 'content-and-bug-fixes',
      target: 'contracts',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fix rewards flow screen getting into a blank state when hitting next/skip too quickly.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fix text chat sometimes staying on-screen after being closed during gameplay.',
      section: 'content-and-bug-fixes',
      target: 'chat',
    },
  ],
  title: 'Season 7 Update 7.9.0',
  version: '7.9.0',
};

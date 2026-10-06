import { type Patch } from '../types';

export const patch610: Patch = {
  date: new Date('2025-03-27 11:00:00'),
  description: `This update brings balance changes, bug fixes, and improvements to enhance gameplay and address community feedback. Dive into the patch notes below for all the details.`,
  originalUrl: 'https://www.reachthefinals.com/patchnotes/610',
  patchNotes: [
    // Weapons
    {
      adjustmentType: 'buff',
      category: 'weapons',
      changes: [{ from: 15, stat: 'damage', to: 17 }],
      devNote:
        'The ARN has not performed as well as we initially expected since its release, so this change is a small nudge to make it more effective. We’re not 100% sure this solves its effectiveness, but it should help while we dig further into the performance data and figure out how else we might want to improve it.',
      note: 'Increased damage from 15 to 17',
      section: 'balance',
      target: 'arn-220',
    },
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      devNote:
        'We’ve seen mixed initial feedback on both the CB-01 and M134 Minigun. Current performance data suggests both weapons are performing somewhat ‘in the middle of the pack.’ Because of this, we’re not rushing out any changes in 6.1. Instead, we’ll give them more time to settle into the meta and check again after players have had more time to adapt.',
      note: '',
      section: 'balance',
      target: 'general',
    },

    // Characters & Customization
    {
      adjustmentType: 'neutral',
      category: 'characters',
      devNote:
        'We still see that duplicates can appear after creating outfits inside the game. We have fixed one potential cause and will be on the lookout for more.',
      note: 'Fixed an issue where current outfits created prior to Season 6 could get duplicated when the game was updated to Version 6.0.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'characters',
      note: 'Fixed an issue where certain combinations of cosmetics could render them invisible.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'characters',
      note: 'Fixed an issue where the deletion of a created outfit could lead to unexpected results.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'characters',
      note: 'Fixed an issue where billboards showing off contestants would not have the correct outfit if it was changed in the lobby prior to the round starting.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'characters',
      devNote:
        'This means that if you were part of the players who got the badge while it was bugged, you will no longer have it.',
      note: "Fixed the requirement for the Amethyst 'Cash Earned' player card badge as it was being handed out incorrectly.",
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Controller
    {
      adjustmentType: 'neutral',
      category: 'controller',
      note: 'Fixed an issue where you could not navigate away from the “feedback sent” screen with a controller.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Gameplay
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      devNote:
        "We believe that we have found and fixed one of the more common 'can’t shoot bugs.' We are still hard at work fixing any remaining cases as we might not have caught them all just yet.",
      note: 'Fixed an issue where contestants were not able to shoot after respawning.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Fixed an issue where sights attached to a weapon would get a faulty texture if combined with certain skins.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Fixed an issue where weapons could get offset in aim down sight, obscuring the screen.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Maps
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Updated practice range trophy with S5 leaderboards.',
      section: 'content-and-bug-fixes',
      target: 'practice-range',
    },

    // Private Matches
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Cleaned up Game Mode Information screen to only show relevant information.',
      section: 'content-and-bug-fixes',
      target: 'private-matches',
    },
    {
      adjustmentType: 'neutral',
      category: 'game-mode',
      note: 'Cleaned up Lobby Creation screen to only show relevant fields.',
      section: 'content-and-bug-fixes',
      target: 'private-matches',
    },

    // Rendering
    {
      adjustmentType: 'neutral',
      category: 'stability-and-performance',
      note: 'Fixed motion blur-sm artifacts for some Intel and AMD GPUs.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Social
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Fixed support for anonymous and streamer mode in World Tour and Ranked Tournaments.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // UI
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed background images looking stretched in some screens.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Weapons
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      note: 'Fixed the missing aim assist when using a controller.',
      section: 'content-and-bug-fixes',
      target: 'm134-minigun',
    },

    // Security and Anti-Cheat
    {
      adjustmentType: 'neutral',
      category: 'general',
      devNote:
        'More information here: https://id.embark.games/the-finals/support/faq/105-hardware-tester-window',
      note: 'Added Hardware Tester.',
      section: 'security-and-anti-cheat',
      target: 'general',
    },
  ],
  title: 'Season 6 Update 6.1.0',
  updatedNote: 'Caught up again with 6.10',
  version: '6.1.0',
};

import { type Patch } from '../types';

export const patch710: Patch = {
  date: new Date('2025-06-19T11:00:00'),
  description: `This update delivers fixes and improvements for animation, gadgets, gameplay, performance, social features, and the store. Thank you for your continued feedback!`,
  originalUrl: 'https://www.reachthefinals.com/patchnotes/710',
  patchNotes: [
    // Animation
    {
      adjustmentType: 'neutral',
      category: 'animation',
      devNote:
        'Those of you who lost this item while it was being repaired will have it back now.',
      note: "Fixed animation issue for Ditch & Switch reload animation for the SA1216. It's now moved to be a Reload Empty animation and it's playing the correct asset.",
      section: 'content-and-bug-fixes',
      target: 'sa1216',
    },

    // Gadgets
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: 'Fixed the issue where the animation when placing the Breach Drill would not play correctly.',
      section: 'content-and-bug-fixes',
      target: 'breaching-drill',
    },
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: 'Fixed an issue where the Healing Emitter could heal through barricades.',
      section: 'content-and-bug-fixes',
      target: 'healing-emitter',
    },

    // Practice Range
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Updated Trophy showcase to display the Season 6 trophies.',
      section: 'content-and-bug-fixes',
      target: 'practice-range',
    },

    // Gameplay
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      devNote:
        'When this issue came up we disabled our new weapon system until we had time to fix the issue. With that done, we’re turning it back on again. If you notice any new or different issues, please let us know, we really appreciate your help :)',
      note: 'Fixed an issue that could cause weapon dispersion to break when in certain stances following a death and respawn, for example after jumping and then firing while standing still.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Performance & Stability
    {
      adjustmentType: 'neutral',
      category: 'stability-and-performance',
      note: 'Fixed an issue where a severe performance drop could occur while emoting with a linked Gateway while using some specific weapon skins or the Anti-Gravity Cube.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'buff',
      category: 'stability-and-performance',
      note: 'Improved performance on PS4 by reducing memory usage.',
      section: 'content-and-bug-fixes',
      target: 'ps4',
    },

    // Social
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Fixed an issue where text chat could not be accessed during parts of the end of round.',
      section: 'content-and-bug-fixes',
      target: 'chat',
    },
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Fixed an issue where partying up after having switched party leader could fail for parties over 3 contestants.',
      section: 'content-and-bug-fixes',
      target: 'party',
    },
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Fixed an issue where clubchat messages did not show properly when sent.',
      section: 'content-and-bug-fixes',
      target: 'clubchat',
    },
  ],
  title: 'Season 7 Update 7.1.0',
  version: '7.1.0',
};

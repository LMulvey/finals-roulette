import { type Patch } from '../types';

export const patch701: Patch = {
  date: new Date('2025-06-13T11:00:00'),
  description: `Season 7 is off to a great start, but with just a few bumps along the way! Here we have a Hotfix (no update needed) to help smooth things out a bit. 

We intended to have NOZOMI/CITADEL cranked up to 11 in terms of map picks, but thanks to the community we found that that was not the case. This should be fixed, and you should now be fighting across the Rift much more frequently. 

We have temporarily disabled the new weapon system that went live for all automatic weapons yesterday after finding a couple issues with it. As hard as we try to test things, nothing beats thousands of players across hundreds of devices going hands on - thank you all so much for calling out the issues you found so we can act on them swiftly!

We have loaded in your Seasonal rewards, including the ENGIMO prize given to everyone based on the results of the S6 Sponsor Showdown. We also delivered a small gift to honor the players of Season 1 who bought the very first Battle Pass, thank you for being here since the very beginning!  `,
  originalUrl: 'https://www.reachthefinals.com/patchnotes/701',
  patchNotes: [
    // Battle Pass
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Resolved an issue where players who bought the Premium Battle Pass followed by the Ultimate Battle Pass did not receive their proper refund of 1150 Multibucks. Missing Multibucks have now been refunded.',
      section: 'content-and-bug-fixes',
      target: 'battle-pass',
    },

    // Customization
    {
      adjustmentType: 'neutral',
      category: 'cosmetics',
      note: 'Returned missing store items. About ten bundles that were missing are now back in the store.',
      section: 'content-and-bug-fixes',
      target: 'store',
    },
    {
      adjustmentType: 'removal',
      category: 'cosmetics',
      devNote:
        'If you already bought it, don’t worry, you’ll have your properly working animation very soon!',
      note: 'Removed the Standard Show and Ditch and Switch weapon bundles due to incorrectly shown animations. They will return in Update 7.1.',
      section: 'content-and-bug-fixes',
      target: 'store',
    },

    // Gadgets
    {
      adjustmentType: 'neutral',
      category: 'specializations',
      note: 'Fixed an issue where goo blobs from the Goo Gun hitting players stealing a Cashout would not interrupt the steal interaction as intended.',
      section: 'content-and-bug-fixes',
      target: 'goo-gun',
    },

    // Maps
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Fixed an issue where Nozomi/Citadel was being selected from the map pool less often than it should in some modes.',
      section: 'content-and-bug-fixes',
      target: 'nozomi-citadel',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Fixed an issue where Nozomi/Citadel was not being selected from the map pool at all in TDM mode.',
      section: 'content-and-bug-fixes',
      target: 'nozomi-citadel',
    },

    // Performance & Stability
    {
      adjustmentType: 'neutral',
      category: 'stability-and-performance',
      note: 'Fixed an issue causing game servers to occasionally crash.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // UI
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed an issue where some circuit rewards were being displayed in the customization menu too early or incorrectly.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },

    // Weapons
    {
      adjustmentType: 'removal',
      category: 'weapons',
      devNote:
        'The new system will return in a future update once fixed. Thank you to the community for quickly identifying and reporting the issue!',
      note: 'Temporarily disabled the new weapon system for all automatic weapons due to an issue causing players to be placed in an uncontrolled movement state, increasing recoil and bullet dispersion. Weapons are back on the old system for now.',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
  ],
  title: 'Hotfix 7.0.1',
  version: '7.0.1',
};

import { type Patch } from '../types';

export const patch5120: Patch = {
  date: new Date('2025-03-02 11:00:00'),
  description:
    'It’s time to say goodbye to the TDM event but today we say hello to the Bonus XP Fiesta! From now until the end of the season, you’ll rack up 200% XP for Daily Contracts and up to 150% XP and Fans earned for gameplay!\nThis week we have a few balance changes and bug fixes to check out below! Finally, the store has a fresh new update:',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/5120',
  patchNotes: [
    // Model 1887 BUFF!
    {
      adjustmentType: 'buff',
      category: 'weapons',
      changes: [{ from: 11, stat: 'damage', to: 12 }],
      note: 'Increased damage from 11 to 12 per pellet',
      section: 'balance',
      target: 'model-1887',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      changes: [
        { from: 0.85, label: 'Lever-action duration', stat: 'other', to: 0.8, unit: 's' },
        { from: 70, stat: 'fire-rate', to: 75 },
      ],
      devNote:
        'Having now had time to analyse the Model’s performance on live, following our last round of balance changes, we feel we’ve maybe weakened the weapon a little too much. These changes should nudge it back to a better place.',
      note: 'Decreased the duration of the lever-action animation from 0.85s to 0.8s, effectively increasing the weapon’s fire rate from 70RPM to 75RPM',
      section: 'balance',
      target: 'model-1887',
    },

    // Bow buff... for some reason but ok
    {
      adjustmentType: 'buff',
      category: 'weapons',
      changes: [{ from: 120, stat: 'damage', to: 124 }],
      note: 'Increased damage per shot, when the bow is at max draw, from 120 to 124. The base damage per shot remains at 60 damage',
      sassyNote: "IT'S BOWZO TIME, BABY",
      section: 'balance',
      target: 'recurve-bow',
    },

    // Animation
    {
      adjustmentType: 'neutral',
      category: 'animation',
      note: 'Fixed an issue where the Spear’s secondary animation wouldn’t play if activated right after using up all the charges of the previously equipped item',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'animation',
      note: 'Fixed an issue where the impact animation would continuously play after blocking a shot with the Riot Shield',
      section: 'content-and-bug-fixes',
    },

    // COSMETICS: Victory Shade Set
    {
      adjustmentType: 'neutral',
      category: 'cosmetics',
      note: 'Now loops and overwrites colors continuously instead of stopping after 10 eliminations',
      section: 'content-and-bug-fixes',
      target: 'Victory Shade Set',
    },
    {
      adjustmentType: 'neutral',
      category: 'cosmetics',
      note: 'Fixed an issue where team colors wouldn’t update when changing colorblindness settings or toggling Use Enemy Color',
      section: 'content-and-bug-fixes',
      target: 'Victory Shade Set',
    },
    // COSMETICS: Concrete Smoke Model 1887 Skin
    {
      adjustmentType: 'neutral',
      category: 'cosmetics',
      note: 'Fixed an issue where the left hand would remain static in mid-air when playing the Prairie Twirl Deploy Animation',
      section: 'content-and-bug-fixes',
      target: 'Concrete Smoke Model 1887 Skin ',
    },
    // Gameplay
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Fixed an issue that could cause objects to have collision and be invisible if they were destroyed and dematerialized during the same frame',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Fixed a bug where the wrong item would be equipped after getting glitched and the item would be unusable',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Fixed an issue where attempting to use a Weapon or Gadget immediately after swapping could activate the previously equipped item instead',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Fixed an issue where swapping to your Specialization would immediately switch back to your Weapon',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'gameplay',
      note: 'Fixed issue where ADS would stop working',
      section: 'content-and-bug-fixes',
    },
    // Maps
    {
      adjustmentType: 'buff',
      category: 'maps',
      note: 'Small Kyoto destruction tweak to enhance server performance',
      section: 'content-and-bug-fixes',
      target: 'Kyoto',
    },
    {
      adjustmentType: 'buff',
      category: 'maps',
      note: 'Lowered bamboo stump heights when broken to help with traversal',
      section: 'content-and-bug-fixes',
      target: 'Kyoto',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Fixed an issue where vaults could continuously fall through floor due to the inability to find a solid surface to rest on',
      section: 'content-and-bug-fixes',
      target: 'Kyoto',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Updated the thickness of cinder block walls for smoother traversal',
      section: 'content-and-bug-fixes',
      target: 'Beral',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Adjusted collision on beams in the Mall to prevent players from getting stuck in wedge-shaped collisions',
      section: 'content-and-bug-fixes',
      target: 'Fortune Stadium',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Fixed an issue where the trophies were incorrectly labeled',
      section: 'content-and-bug-fixes',
      target: 'Practice Range',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Fixed an issue where all bots could incorrectly appear as friendlies or enemies',
      section: 'content-and-bug-fixes',
      target: 'Practice Range',
    },
    {
      adjustmentType: 'neutral',
      category: 'maps',
      note: 'Slightly adjusted the jump pad and a player spawn between Glamora and Eastwood casinos for improved flow',
      section: 'content-and-bug-fixes',
      target: 'Las Vegas',
    },
    {
      adjustmentType: 'neutral',
      category: 'stability-and-performance',
      note: 'Fixed a rare crash in the animation system',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'stability-and-performance',
      note: 'Added support for AMD Anti-Lag 2',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'stability-and-performance',
      note: 'Improved performance for players experiencing issues due to large friend lists',
      sassyNote: "Oscar's stream performance fix",
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'rendering',
      note: 'Enhanced high and epic-quality reflections in game intro sequences',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'rendering',
      note: 'Fixed an issue where an unintended post-process effect could sometimes appear on player cards',
      section: 'content-and-bug-fixes',
    },
    // Settings
    {
      adjustmentType: 'neutral',
      category: 'settings',
      note: 'Added a "No AA" resolution scaling option that completely disables anti-aliasing and temporal resolution scaling',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'settings',
      note: 'Fixed an issue where certain video options, including 120Hz mode, would reset to default on Xbox after restarting the game',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'settings',
      note: 'Fixed an issue where certain input devices or buttons could cause duplicated inputs, preventing players from equipping their specialization by triggering the swap function twice',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'ui',
      note: 'Fixed a rare issue where squad members would sometimes not appear in the bottom-left widget and scoreboard during a match',
      section: 'content-and-bug-fixes',
    },
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: 'Improved detections',
      section: 'security-and-anti-cheat',
    },
    {
      adjustmentType: 'neutral',
      category: 'general',
      note: "In addition to this week's store rotation, we’ve added a .50 Akimbo skin, Monochrome Edge, to the customization menu",
      section: 'store',
    },
  ],
  title: 'Update 5.12.0',
  updatedNote: 'Off the shelf with 5.12.0',
  version: '5.12.0',
};

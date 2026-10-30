import { type Patch } from '../types';

export const patch1210: Patch = {
  date: new Date('2026-10-29T11:00:00'),
  description:
    'Update 12.1.0 cut the Translocator\'s range, toned down the CB-01 Repeater and Pike-556 after their Season 12 buffs, and fixed several Mimic Device exploits.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/12-10',
  patchNotes: [
    {
      adjustmentType: 'nerf',
      category: 'gadget',
      changes: [{ from: 70, stat: 'range', to: 50 }],
      devNote:
        'Higher impact than expected, and enemies rapidly vanishing feels frustrating. More changes are planned through the season.',
      note: 'Decreased max range from 70m to 50m.',
      section: 'balance',
      target: 'translocator',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      changes: [{ from: 88, stat: 'damage', to: 85 }],
      devNote: 'Early Season 12 data shows the CB-01 was slightly over-tuned.',
      note: 'Decreased damage from 88 to 85.',
      section: 'balance',
      target: 'cb-01-repeater',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      changes: [{ from: 1.75, stat: 'headshot-multiplier', to: 1.5 }],
      devNote:
        'The Pike jumped significantly in usage, damage and kill rates after 12.0, becoming one of the most dominant weapons. It needed help, but the changes went too far.',
      note: 'Decreased headshot multiplier from 1.75 to 1.5.',
      section: 'balance',
      target: 'pike-556',
    },
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: "Fixed the disguise showing a Contestant-shaped shadow alongside the prop's, invisible collision left behind after an explosive elimination, momentum carrying over after dashing, and passing through Cashout Stations and Grand Vaults.",
      section: 'content-and-bug-fixes',
      target: 'mimic-device',
    },
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: 'Fixed the Tracking Dart sometimes making your weapon fire after its ammo ran out.',
      section: 'content-and-bug-fixes',
      target: 'tracking-dart',
    },
  ],
  title: 'UPDATE 12.1.0',
  version: '12.1.0',
};

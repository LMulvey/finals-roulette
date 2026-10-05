import { type Patch } from '../types';

export const patch1130: Patch = {
  date: new Date('2026-07-30T11:00:00'),
  description:
    'Update 11.3.0 walked back some of the harsher 11.0 melee changes and nudged a handful of Heavy and Light equipment.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/11-30',
  patchNotes: [
    {
      adjustmentType: 'nerf',
      category: 'gadget',
      devNote:
        'C4 has been an outlier in win rate and usage for Heavy for quite some time.',
      note: 'Increased cooldown from 30s to 45s.',
      section: 'balance',
      target: 'c4',
    },
    {
      adjustmentType: 'buff',
      category: 'specializations',
      note: 'Decreased cooldown from 7s to 6s.',
      section: 'balance',
      target: 'grappling-hook',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Increased damage from 88 to 90.',
      section: 'balance',
      target: 'bfr-titan',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Increased primary and secondary lunge distance from 4.5m to 5m, slightly increased max lunge speed, and increased secondary sweep time.',
      section: 'balance',
      target: 'dagger',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Increased precision zone from 8 to 9 degrees and lunge distance from 4.5m to 5m. Cross Slash now lunges from a standstill at full Stamina, and movement speed while deflecting increased by 25%.',
      section: 'balance',
      target: 'dual-blades',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Increased damage from 23 to 24.',
      section: 'balance',
      target: 'famas',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      devNote: '110 damage was too much.',
      note: 'Decreased damage from 110 to 104 and increased damage falloff multiplier from 0.64 to 0.675.',
      section: 'balance',
      target: 'ks-23',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Increased precision zone from 9 to 10 degrees, lunge distance from 4.25m to 5m, and precise damage from 82 to 83. Shield Bash now lunges from a standstill at full Stamina.',
      section: 'balance',
      target: 'riot-shield',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      devNote:
        'The 11.0 Spear damage adjustments proved more severe than intended.',
      note: 'Increased precise damage from 74 to 82, base damage from 55 to 57, and spin sequence damage from 75/100/125 to 75/125/150.',
      section: 'balance',
      target: 'spear',
    },
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: 'Fixed friendly melee attacks damaging your own Dome Shield.',
      section: 'content-and-bug-fixes',
      target: 'dome-shield',
    },
  ],
  title: 'UPDATE 11.3.0',
  version: '11.3.0',
};

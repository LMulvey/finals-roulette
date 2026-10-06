import { type Patch } from '../types';

export const patch970: Patch = {
  date: new Date('2026-01-29T11:00:00'),
  description:
    'Update 9.7.0 adjusted utility item pacing and buffed multiple automatic weapons for better archetype parity.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/970',
  patchNotes: [
    {
      adjustmentType: 'nerf',
      category: 'gadget',
      changes: [{ from: 300, stat: 'health', to: 250 }],
      note: 'Decreased health from 300 to 250.',
      section: 'balance',
      target: 'dome-shield',
    },
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      changes: [
        { from: 1, stat: 'charges', to: 2 },
        { from: 12, stat: 'cooldown', to: 25 },
      ],
      note: 'Increased ammo from 1 to 2 while increasing cooldown from 12s to 25s.',
      section: 'balance',
      target: 'glitch-grenade',
    },
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      changes: [
        { from: 22, stat: 'damage', to: 23 },
        { from: 540, stat: 'fire-rate', to: 520 },
      ],
      note: 'Increased damage from 22 to 23 while reducing fire rate from 540 to 520 RPM.',
      section: 'balance',
      target: 'fcar',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Reduced ADS and hip-fire dispersion in key stances for better consistency.',
      section: 'balance',
      target: 'm60',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      changes: [
        { from: 16, stat: 'falloff-min-range', to: 18 },
        { from: 22, stat: 'falloff-max-range', to: 24 },
      ],
      note: 'Increased damage falloff ranges (18m/24m from 16m/22m).',
      section: 'balance',
      target: 'p90',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      changes: [{ from: 48, stat: 'damage', to: 49 }],
      note: 'Increased damage from 48 to 49.',
      section: 'balance',
      target: 'pike-556',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      changes: [{ from: 860, stat: 'fire-rate', to: 880 }],
      note: 'Increased rate of fire from 860 to 880 RPM.',
      section: 'balance',
      target: 'xp-54',
    },
  ],
  title: 'UPDATE 9.7.0',
  version: '9.7.0',
};

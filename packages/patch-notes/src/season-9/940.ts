import { type Patch } from '../types';

export const patch940: Patch = {
  date: new Date('2026-01-08T11:00:00'),
  description: 'Update 9.4.0 delivered a focused balance pass on selected gadgets and weapons.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/940',
  patchNotes: [
    {
      adjustmentType: 'buff',
      category: 'gadget',
      note: 'Increased drill length from 83cm to 108cm to improve deep-wall drilling reliability.',
      section: 'balance',
      target: 'breach-drill',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'Increased ADS time and reduced close-range accuracy with broader crouched/standing dispersion.',
      section: 'balance',
      target: 'cb-01-repeater',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'Recoil and dispersion increased for close-range pressure, with recovery tuning to reward burst control.',
      section: 'balance',
      target: 'famas',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Increased rate of fire (98 to 103 RPM) and reduced minimum draw time (0.15s to 0.08s).',
      section: 'balance',
      target: 'recurve-bow',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'Reduced damage falloff end range from 25m to 20m.',
      section: 'balance',
      target: 'v9s',
    },
  ],
  title: 'UPDATE 9.4.0',
  version: '9.4.0',
};

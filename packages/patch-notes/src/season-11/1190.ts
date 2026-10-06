import { type Patch } from '../types';

export const patch1190: Patch = {
  date: new Date('2026-09-10T11:00:00'),
  description:
    'Update 11.9.0 made Zipline relevant again, sped up Evasive Dash, and made cloaked Lights easier to spot.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/11-90',
  patchNotes: [
    {
      adjustmentType: 'buff',
      category: 'gadget',
      changes: [{ from: 37, stat: 'cooldown', to: 30 }, { from: 40, stat: 'range', to: 50 }],
      note: 'Decreased cooldown from 37s to 30s and increased max placement distance from 40m to 50m.',
      section: 'balance',
      target: 'zipline',
    },
    {
      adjustmentType: 'buff',
      category: 'specializations',
      changes: [{ from: 6, stat: 'cooldown', to: 5 }],
      note: 'Decreased cooldown per charge from 6s to 5s.',
      section: 'balance',
      target: 'evasive-dash',
    },
    {
      adjustmentType: 'nerf',
      category: 'specializations',
      note: 'Cloaked players blend into the environment less while stationary.',
      section: 'balance',
      target: 'cloaking-device',
    },
  ],
  title: 'UPDATE 11.9.0',
  version: '11.9.0',
};

import { type Patch } from '../types';

export const patch910: Patch = {
  date: new Date('2025-12-18T11:00:00'),
  description: 'Update 9.1.0 included a targeted V9S tuning pass after the Season 9 launch changes.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/910',
  patchNotes: [
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      changes: [{ from: 40, stat: 'damage', to: 38 }],
      note: 'Decreased damage from 40 to 38.',
      section: 'balance',
      target: 'v9s',
    },
  ],
  title: 'UPDATE 9.1.0',
  version: '9.1.0',
};

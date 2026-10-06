import { type Patch } from '../types';

export const patch990: Patch = {
  date: new Date('2026-02-12T11:00:00'),
  description:
    'Update 9.9.0 focused on long-range poke reduction and selected viability buffs across multiple weapon classes.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/990',
  patchNotes: [
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      changes: [{ from: 90, stat: 'damage', to: 88 }],
      note: 'Reduced base damage (90 to 88), fire rate, and effective long-range profile.',
      section: 'balance',
      target: 'bfr-titan',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      changes: [{ from: 88, stat: 'damage', to: 84 }],
      note: 'Reduced damage (88 to 84), fire rate, and long-range effectiveness.',
      section: 'balance',
      target: 'cb-01-repeater',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Increased pellet count and overall per-shot potential while normalizing spread consistency.',
      section: 'balance',
      target: 'cerberus',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Reduced camera shake from firing by approximately 50%.',
      section: 'balance',
      target: 'lh1',
    },
  ],
  title: 'UPDATE 9.9.0',
  version: '9.9.0',
};

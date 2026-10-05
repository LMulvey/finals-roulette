import { type Patch } from '../types';

export const patch1170: Patch = {
  date: new Date('2026-08-27T11:00:00'),
  description:
    'Update 11.7.0 gave Shockwave a glitch effect to make it a real counter-pick for Medium.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/11-70',
  patchNotes: [
    {
      adjustmentType: 'buff',
      category: 'specializations',
      devNote:
        'Shockwave has been the least used Medium specialization. A glitch micro-stun gives Mediums a skill-based counter to Mesh Shield, Cloaking Device and Evasive Dash.',
      note: 'Now applies a 2s glitch effect to enemies it hits.',
      section: 'balance',
      target: 'shockwave',
    },
  ],
  title: 'UPDATE 11.7.0',
  version: '11.7.0',
};

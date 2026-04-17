import { type Patch } from '../types';

export const patch950: Patch = {
  date: new Date('2026-01-15T11:00:00'),
  description: 'Update 9.5.0 was mostly stability and bug fixes, including a FAMAS behavior correction.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/950',
  patchNotes: [
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      note: 'Fixed a bug that could make it behave as fully automatic after switching from Healing Beam.',
      section: 'content-and-bug-fixes',
      target: 'famas',
    },
  ],
  title: 'UPDATE 9.5.0',
  version: '9.5.0',
};

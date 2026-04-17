import { type Patch } from '../types';

export const patch831: Patch = {
  date: new Date('2025-10-03T11:00:00'),
  description: 'Hotfix 8.3.1 addressed post-update issues, including a BFR behavior fix.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/831',
  patchNotes: [
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Fixed a bug where it was not using hitscan, reducing long-range effectiveness.',
      section: 'content-and-bug-fixes',
      target: 'bfr-titan',
    },
  ],
  title: 'HOTFIX 8.3.1',
  version: '8.3.1',
};

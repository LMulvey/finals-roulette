import { type Patch } from '../types';

export const patch581: Patch = {
  date: new Date('2025-02-07'),
  description:
    "We've just pushed a hotfix in order to correct an error in the Wheel of Love daily contracts, which were not giving the same amount of daily XP.",
  originalUrl: 'https://www.reachthefinals.com/patchnotes/591',
  patchNotes: [
    {
      adjustmentType: 'buff',
      category: 'gameplay',
      note: 'Increased XP given for daily contracts from 2500 to 5000 for the remainder of the Wheel of Love event',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
    {
      adjustmentType: 'neutral',
      category: 'stability-and-performance',
      note: 'Fixed a bug where players would sometimes end up in the wrong server region',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
  ],
  title: 'Stupid Cupid!',
  version: '5.8.1',
};

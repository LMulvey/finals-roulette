import { type Patch } from '../types';

export const patch1201: Patch = {
  date: new Date('2026-10-21T11:00:00'),
  description:
    'Hotfix 12.0.1 fixed frequent console crashes and Guardian Turret targeting, and stopped the Grappling Hook firing before its cooldown reset.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/12-01',
  patchNotes: [
    {
      adjustmentType: 'neutral',
      category: 'specializations',
      note: 'Fixed the Guardian Turret not correctly detecting targets.',
      section: 'content-and-bug-fixes',
      target: 'guardian-turret',
    },
    {
      adjustmentType: 'neutral',
      category: 'specializations',
      note: 'Fixed the Grappling Hook being usable before its cooldown fully reset.',
      section: 'content-and-bug-fixes',
      target: 'grappling-hook',
    },
  ],
  title: 'HOTFIX 12.0.1',
  version: '12.0.1',
};

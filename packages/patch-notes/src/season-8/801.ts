import { type Patch } from '../types';

export const patch801: Patch = {
  date: new Date('2025-09-12T11:00:00'),
  description:
    'Hotfix 8.0.1 focused on gameplay regressions from 8.0, including targeted gadget, specialization, and weapon fixes.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/801',
  patchNotes: [
    {
      adjustmentType: 'neutral',
      category: 'gadget',
      note: 'Fixed an issue where projectiles could be blocked by friendly Dome Shields.',
      section: 'content-and-bug-fixes',
      target: 'h-plus-infuser',
    },
    {
      adjustmentType: 'nerf',
      category: 'specializations',
      note: 'Fixed super-dash behavior triggered by jump input immediately after dashing.',
      section: 'content-and-bug-fixes',
      target: 'evasive-dash',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Corrected headshot bonus to x1.5 damage.',
      section: 'content-and-bug-fixes',
      target: 'pike-556',
    },
  ],
  title: 'HOTFIX 8.0.1',
  version: '8.0.1',
};

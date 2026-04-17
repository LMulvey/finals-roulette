import { type Patch } from '../types';

export const patch860: Patch = {
  date: new Date('2025-10-23T11:00:00'),
  description:
    'Midseason Update 8.6.0 delivered major content and bug fixes, including targeted specialization and weapon behavior fixes.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/860',
  patchNotes: [
    {
      adjustmentType: 'neutral',
      category: 'specializations',
      note: 'Activating Grappling Hook now cancels ongoing interactions.',
      section: 'content-and-bug-fixes',
      target: 'grappling-hook',
    },
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      note: 'Fixed a manual/lever-action swap exploit that could artificially increase fire rate (BFR Titan, CB-01 Repeater, M26 Matter, Model 1887, SA1216).',
      section: 'content-and-bug-fixes',
      target: 'general',
    },
  ],
  title: 'MIDSEASON UPDATE 8.6.0',
  version: '8.6.0',
};

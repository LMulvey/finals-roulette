import { type Patch } from '../types';

export const patch840: Patch = {
  date: new Date('2025-10-09T11:00:00'),
  description: 'Update 8.4.0 included a targeted Riot Shield rollback while further fixes were investigated.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/840',
  patchNotes: [
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      note: 'Reverted the latest collision update while preserving the recent steal-blocking behavior fix.',
      section: 'balance',
      target: 'riot-shield',
    },
  ],
  title: 'UPDATE 8.4.0',
  version: '8.4.0',
};

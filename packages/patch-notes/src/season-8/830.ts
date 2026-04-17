import { type Patch } from '../types';

export const patch830: Patch = {
  date: new Date('2025-10-02T11:00:00'),
  description:
    'Update 8.3.0 introduced targeted balance adjustments for selected gadgets and weapons.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/830',
  patchNotes: [
    {
      adjustmentType: 'buff',
      category: 'gadget',
      note: 'Reduced activation sequence from 3s to 2.5s and cooldown from 25s to 20s.',
      section: 'balance',
      target: 'breach-drill',
    },
    {
      adjustmentType: 'nerf',
      category: 'gadget',
      note: 'Reduced smoke duration from 15s to 9s and ammo from 3 to 2.',
      section: 'balance',
      target: 'smoke-grenade',
    },
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      note: 'Reduced damage from 98 to 90.',
      section: 'balance',
      target: 'bfr-titan',
    },
  ],
  title: 'UPDATE 8.3.0',
  version: '8.3.0',
};

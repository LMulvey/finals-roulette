import { type Patch } from '../types';

export const patch1030: Patch = {
  date: new Date('2026-04-16T11:00:00'),
  description:
    'Update 10.3.0 included targeted balance changes for gadgets and weapons, plus a temporary contestant archetype ruleset experiment in World Tour.',
  originalUrl: 'https://www.reachthefinals.com/patchnotes/10-30',
  patchNotes: [
    {
      adjustmentType: 'nerf',
      category: 'gadget',
      note: 'Increased delay before ammo regeneration from 8s to 10s.',
      section: 'balance',
      target: 'h-plus-infuser',
    },
    {
      adjustmentType: 'addition',
      category: 'gadget',
      note: 'Can now be deployed in the air and will fall to the ground after deployment.',
      section: 'balance',
      target: 'healing-emitter',
    },
    {
      adjustmentType: 'buff',
      category: 'gadget',
      note: 'Increased health from 300 to 350.',
      section: 'balance',
      target: 'hover-pad',
    },
    {
      adjustmentType: 'neutral',
      category: 'weapons',
      note: 'Increased damage from 24 to 25 while reducing ammo from 24 to 21.',
      section: 'balance',
      target: '93r',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Reduced ADS recoil to improve ranged accuracy.',
      section: 'balance',
      target: 'famas',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Increased ammo count from 34 to 36.',
      section: 'balance',
      target: 'xp-54',
    },
    {
      adjustmentType: 'nerf',
      category: 'contestants',
      note: 'Heavy health decreased from 350 to 325.',
      section: 'balance',
      target: 'general',
    },
    {
      adjustmentType: 'buff',
      category: 'contestants',
      note: 'Light health increased from 150 to 175.',
      section: 'balance',
      target: 'general',
    },
  ],
  title: 'UPDATE 10.3.0',
  version: '10.3.0',
};

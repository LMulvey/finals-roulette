import { type Patch } from '../types';

export const patch640: Patch = {
  date: new Date('2025-04-17 11:00:00'),
  description: `This week’s update is all about controlled chaos. Tuning weapons for precision, flipping the switch on full-blown gameshow madness, and suiting up in some of our most stylish sets yet.

Gameplay-wise, we’re making targeted balance changes to two of the Arena’s most talked-about weapons. The CB-01 Repeater gets a boost to its environmental damage, making it far better at dealing with deployables and ziplines, while the Minigun receives a notable accuracy upgrade when focus-firing. We’re not touching the spin-up mechanic just yet, but it’s something we’re actively evaluating as the season progresses.

Week 2 of Bunny Bash is also live now, with a new circuit of event contracts for you to complete for some amazing rewards!`,
  originalUrl: 'https://www.reachthefinals.com/patchnotes/630',
  patchNotes: [
    // Balance Changes
    {
      adjustmentType: 'buff',
      category: 'weapons',
      devNote:
        'With the previous environmental damage value the Repeater had a tough time destroying ziplines. This change should help to address that.',
      note: 'Increased environmental damage from 8 to 18',
      section: 'balance',
      target: 'cb-01-repeater',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: "Decreased bullet dispersion when standing still and 'focus firing' (secondary fire) by approximately 10%, making the weapon more accurate",
      section: 'balance',
      target: 'm134-minigun',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Decreased bullet dispersion when moving and focus firing by approximately 10%, making the weapon more accurate',
      section: 'balance',
      target: 'm134-minigun',
    },
  ],
  title: 'Season 6 Update 6.4.0',
  version: '6.4.0',
};

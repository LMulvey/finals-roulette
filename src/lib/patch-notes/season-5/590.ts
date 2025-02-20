import { type Patch } from '../types';

export const patch590: Patch = {
  date: new Date('2025-02-12'),
  description: `We want to take a moment to acknowledge some of the recent frustrations around the frequency of balance changes. At the end of Season 3, we adjusted our balance cadence from a demanding weekly schedule to a more structured approach, aligning the majority of balance changes with the start and middle of each season. Our goal was to create a more stable experience for players while also giving our dev team the time needed to properly assess and test changes before making adjustments.

That said, the current pace feels a bit too slow, and we understand how a lack of iteration has been frustrating.

Starting with Season 6, we're shifting to a roughly 3-week balance update schedule. This should create a better experience for both players and our dev team, allowing for more consistent refinements. Major balance shifts will still happen at the start of each season, but balance tweaks will now be more frequent throughout.

Expect smaller, more frequent updates for the rest of Season 5 as we transition to this new approach. We appreciate your patience and feedback, it helps us continue improving the game for everyone.`,
  originalUrl: 'https://www.reachthefinals.com/patchnotes/590',
  patchNotes: [
    {
      adjustmentType: 'nerf',
      category: 'weapons',
      devNote:
        "This change addresses concerns about the Dagger's backstab being inaccurate and the frustration around how easily it can land backstabs, seemingly from the side. With this change, this should be less of an issue.\n\nOn a related note, we've noticed some community members testing melee mechanics in the Practice Range using target dummies. However, these dummies use slightly different hit detection logic compared to real players, making them an unreliable test for certain interactions. For example, we've seen reports of players landing melee hits on dummies while facing away from them. This is a quirk of the dummies and does not apply to actual players.\n\nTo improve testing accuracy, we plan to replace the current target dummies with updated versions soon. This will ensure that the dummies provide more reliable feedback, especially for testing certain Gadgets. However, this change will take some time and testing before it is ready to deploy.",
      note: "Decreased the backstab angle on the Dagger's secondary attack from 180 degrees to 150",
      section: 'balance',
      target: 'dagger',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      note: 'Increased min damage falloff multiplier from 0.6 to 0.7, meaning the weapon now does slightly more damage at long-range',
      section: 'balance',
      target: 'ks-23',
    },
    {
      adjustmentType: 'buff',
      category: 'weapons',
      devNote:
        "The KS-23 has been struggling after the recent fixes to 'manual actions' in Update 5.8. We recognize that these changes had an unintended negative impact on its performance, and we want to make sure it feels more viable in gameplay.\n\nWith this update, we're making some adjustments to help the KS-23 get back on track. This isn't the last step; we'll continue monitoring its performance and exploring additional ways to improve if needed.",
      note: 'Decreased bullet dispersion when aiming down sights to increase accuracy in the majority of different stances (such as crouching, running, etc.)',
      section: 'balance',
      target: 'ks-23',
    },
  ],
  title: 'A New Balance Cadence and Store Update',
  updatedNote: 'Right on time with 5.9.0',
  version: '5.9.0',
};

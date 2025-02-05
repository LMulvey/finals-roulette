import {
  type ContestantClass,
  type ContestantSpecialization,
  type ContestantWeapon,
} from '../schema';

export const lightClass: ContestantClass = {
  description:
    'Fast and agile contestant specializing in mobility, stealth, and being an annoying little shit.',
  healthPoints: 150,
  id: 'light-contestant',
  imageUrl: '/images/contestants/light.png',
  label: 'Light',
  regenerationSeconds: 7,
  type: 'light',
};

export const lightWeapons: ContestantWeapon[] = [
  {
    classType: 'light',
    damageBodyMax: 28,
    damageBodyMin: 28,
    damageCriticalMultiplier: 1.5,
    damageCriticalType: 'headshot',
    description:
      'A burst-fire machine pistol designed to deal burst damage at close-to-moderate distances.',
    id: '93r',
    imageUrl: '/images/weapons/93r.png',
    label: '93R',
    type: 'handgun',
  },
  {
    classType: 'light',
    damageBodyMax: 50,
    damageBodyMin: 50,
    damageCriticalMultiplier: 6.4,
    damageCriticalType: 'alt',
    description:
      'The backstab is so good that sometimes it can backstab you from the front.',
    id: 'dagger',
    imageUrl: '/images/weapons/dagger.png',
    label: 'Dagger',
    recentlyAdjusted: {
      adjustmentType: 'neutral',
      note: 'Adjusted view model to more obviously show when the secondary attack is fully charged.',
      url: 'https://www.reachthefinals.com/patchnotes/580',
    },
    type: 'melee',
  },
  {
    classType: 'light',
    damageBodyMax: 46,
    damageBodyMin: 46,
    damageCriticalMultiplier: 2,
    damageCriticalType: 'headshot',
    description:
      'A marksman rifle designed to deal high damage per shot and very high critical damage. Currently the weapon of choice for cheaters.',
    id: 'lh1',
    imageUrl: '/images/weapons/lh1.png',
    label: 'LH1',
    recentlyAdjusted: {
      adjustmentType: 'nerf',
      note: 'Fire rate and damage decreased slightly. Still the weapon of choice for aimbotters.',
      url: 'https://www.reachthefinals.com/patchnotes/580',
    },
    type: 'marksman-rifle',
  },
  {
    classType: 'light',
    damageBodyMax: 16,
    damageBodyMin: 16,
    damageCriticalMultiplier: 1.5,
    damageCriticalType: 'headshot',
    description:
      'The only audio you will hear is the rapid fire *pfbt* sounds while you are being shredded and inevitably die.',
    id: 'm11',
    imageUrl: '/images/weapons/m11.png',
    label: 'M11',
    type: 'smg',
  },
  {
    classType: 'light',
    damageBodyMax: 121,
    damageBodyMin: 121,
    damageCriticalMultiplier: 1,
    damageCriticalType: 'none',
    description:
      'A bolt-action shotgun that is magazine-fed, designed to deal high damage at close range.',
    id: 'm26-matter',
    imageUrl: '/images/weapons/m26-matter.png',
    label: 'M26 Matter',
    type: 'shotgun',
  },
  {
    classType: 'light',
    damageBodyMax: 120,
    damageBodyMin: 60,
    damageCriticalMultiplier: 1.5,
    damageCriticalType: 'headshot',
    description:
      'Lights who can use this, use it really well. Everyone else just cannot.',
    id: 'recurve-bow',
    imageUrl: '/images/weapons/recurve-bow.png',
    label: 'Recurve Bow',
    type: 'marksman-rifle',
  },
  {
    classType: 'light',
    damageBodyMax: 195,
    damageBodyMin: 15,
    damageCriticalMultiplier: 1,
    damageCriticalType: 'none',
    description:
      'A sawed-off double barrel shotgun designed to instantly two-tap other lights.',
    id: 'sh1900',
    imageUrl: '/images/weapons/sh1900.png',
    label: 'SH1900',
    type: 'shotgun',
  },
  {
    classType: 'light',
    damageBodyMax: 118,
    damageBodyMin: 118,
    damageCriticalMultiplier: 2,
    damageCriticalType: 'headshot',
    description:
      'Sniper rifle designed for lights who want to stay away from the action. Killing one earns a friendly bagging.',
    id: 'sr-84',
    imageUrl: '/images/weapons/sr-84.png',
    label: 'SR-84',
    recentlyAdjusted: {
      adjustmentType: 'buff',
      note: 'Increased rate of fire and damage. Contestants now encouraged to hide as far away as possible.',
      url: 'https://www.reachthefinals.com/patchnotes/580',
    },
    type: 'marksman-rifle',
  },
  {
    classType: 'light',
    damageBodyMax: 74,
    damageBodyMin: 74,
    damageCriticalMultiplier: 1.62,
    damageCriticalType: 'alt',
    description:
      'Who the fuck put swords in this game? Skill-less waste of a loadout only used by real dinguses.',
    id: 'sword',
    imageUrl: '/images/weapons/sword.png',
    label: 'Sword',
    recentlyAdjusted: {
      adjustmentType: 'buff',
      note: 'Increased the length of the lunge. Great.',
      url: 'https://www.reachthefinals.com/patchnotes/580',
    },
    type: 'melee',
  },
  {
    classType: 'light',
    damageBodyMax: 40,
    damageBodyMin: 40,
    damageCriticalMultiplier: 1.5,
    damageCriticalType: 'headshot',
    description: 'Pew pew pew pew secret agent man.',
    id: 'v9s',
    imageUrl: '/images/weapons/v9s.png',
    label: 'V9S',
    type: 'handgun',
  },
  {
    classType: 'light',
    damageBodyMax: 16,
    damageBodyMin: 16,
    damageCriticalMultiplier: 1.5,
    damageCriticalType: 'headshot',
    description:
      'A submachine gun designed to deal high damage over short windows at close to moderate distances.',
    id: 'xp-54',
    imageUrl: '/images/weapons/xp-54.png',
    label: 'XP-54',
    type: 'smg',
  },
  {
    classType: 'light',
    damageBodyMax: 140,
    damageBodyMin: 60,
    damageCriticalMultiplier: 1.5,
    damageCriticalType: 'headshot',
    description:
      'Sharp spoons. Clangs every time they miss a shot. Clangs constantly.',
    id: 'throwing-knives',
    imageUrl: '/images/weapons/throwing-knives.png',
    label: 'Throwing Knives',
    type: 'melee',
  },
];

export const lightSpecializations: ContestantSpecialization[] = [
  {
    classType: 'light',
    description:
      'Allows the light to enter invisibility for a limited duration. Inspires a minimum of one Reddit post per hour.',
    id: 'cloaking-device',
    imageUrl: '/images/specializations/cloaking-device.png',
    label: 'Cloaking Device',
  },
  {
    classType: 'light',
    description:
      "Allows the lights to dash rapidly in any direction. Lives rent-free in u/all-lights-must-die's head.",
    id: 'evasive-dash',
    imageUrl: '/images/specializations/evasive-dash.png',
    label: 'Evasive Dash',
  },
  {
    classType: 'light',
    description: 'You can be Spider-Man in the game. Zoom zoom, mother fucker.',
    id: 'grappling-hook',
    imageUrl: '/images/specializations/grappling-hook.png',
    label: 'Grappling Hook',
  },
];

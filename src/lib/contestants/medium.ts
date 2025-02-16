import {
  type ContestantClass,
  type ContestantSpecialization,
  type ContestantWeapon,
} from '../schema';

export const mediumClass: ContestantClass = {
  description: 'Versatile contestant balancing mobility and durability.',
  healthPoints: 250,
  id: 'medium-contestant',
  imageUrl: '/images/contestants/medium.png',
  label: 'Medium',
  regenerationSeconds: 9,
  type: 'medium',
};

export const mediumWeapons: ContestantWeapon[] = [
  {
    classType: 'medium',
    damageBodyMax: 20,
    damageBodyMin: 20,
    damageCriticalMultiplier: 1.5,
    damageCriticalType: 'headshot',
    description:
      'An automatic assault rifle that is perpetually one bullet short.',
    id: 'akm',
    imageUrl: '/images/weapons/akm.png',
    label: 'AKM',
    type: 'assault-rifle',
  },
  {
    classType: 'medium',
    damageBodyMax: 120,
    damageBodyMin: 9,
    damageCriticalMultiplier: 1,
    damageCriticalType: 'none',
    description:
      'A three-barrel shotgun that fires hot pellets capable of lighting the target on fire.',
    id: 'cerberus',
    imageUrl: '/images/weapons/cerberus-12ga.png',
    label: 'Cerberus 15GA',
    recentlyAdjusted: {
      adjustmentType: 'buff',
      note: 'Weapon adjusted to actually damage enemies without a 20s reload in between shots',
      url: 'https://www.reachthefinals.com/patchnotes/580',
    },
    type: 'shotgun',
  },
  {
    classType: 'medium',
    damageBodyMax: 100,
    damageBodyMin: 100,
    damageCriticalMultiplier: 1,
    damageCriticalType: 'none',
    description:
      'A grenade launcher that blasts targets and does even more hilariously low amounts of self-damage as long as you bunny hop.',
    id: 'cl-40',
    imageUrl: '/images/weapons/cl-40.png',
    label: 'CL-40',
    recentlyAdjusted: {
      adjustmentType: 'buff',
      note: 'Ah, yes. Less self-damage. Just what this weapon logically needed..',
      url: 'https://www.reachthefinals.com/patchnotes/580',
    },
    type: 'grenade-launcher',
  },
  {
    classType: 'medium',
    damageBodyMax: 70,
    damageBodyMin: 50,
    damageCriticalMultiplier: 1,
    damageCriticalType: 'none',
    description:
      'Two swords that can reflect bullets back at the target and deal slash damage.',
    id: 'dual-blades',
    imageUrl: '/images/weapons/dual-blades.png',
    label: 'Dual Blades',
    type: 'melee',
  },
  {
    classType: 'medium',
    damageBodyMax: 23,
    damageBodyMin: 23,
    damageCriticalMultiplier: 1.5,
    damageCriticalType: 'headshot',
    description: 'A little burst-fire rifle that goes BLAP BLAP BLAP.',
    id: 'famas',
    imageUrl: '/images/weapons/famas.png',
    label: 'FAMAS',
    recentlyAdjusted: {
      adjustmentType: 'nerf',
      note: 'Fires more slowly, slight damage decrease. Frequency of FAMAS posts on the subreddit increased to 3.5 per day.',
      url: 'https://www.reachthefinals.com/patchnotes/580',
    },
    type: 'assault-rifle',
  },
  {
    classType: 'medium',
    damageBodyMax: 22,
    damageBodyMin: 22,
    damageCriticalMultiplier: 1.5,
    damageCriticalType: 'headshot',
    description: 'When the FCAR is coming, prepare to be booped.',
    id: 'fcar',
    imageUrl: '/images/weapons/fcar.png',
    label: 'FCAR',
    type: 'assault-rifle',
  },
  {
    classType: 'medium',
    damageBodyMax: 99,
    damageBodyMin: 9,
    damageCriticalMultiplier: 1,
    damageCriticalType: 'none',
    description:
      'A shotgun-type weapon that can blast your opponents away. Previously worked as a sniper rifle.',
    id: 'model-1887',
    imageUrl: '/images/weapons/model-1887.png',
    label: 'Model 1887',
    recentlyAdjusted: {
      adjustmentType: 'nerf',
      note: 'MY BOY. MY SWEET BOY. HES BEEN NERFED AGAIN. FUCK.',
      url: 'https://www.reachthefinals.com/patchnotes/580',
    },
    type: 'shotgun',
  },
  {
    classType: 'medium',
    damageBodyMax: 50,
    damageBodyMin: 50,
    damageCriticalMultiplier: 1.5,
    damageCriticalType: 'headshot',
    description:
      'A marksman rifle for the mediums with a lot of power, range, and recoil.',
    id: 'pike-556',
    imageUrl: '/images/weapons/pike-556.png',
    label: 'Pike-556',
    recentlyAdjusted: {
      adjustmentType: 'buff',
      note: 'Increased damage. Three shots to bonk a Light now.',
      url: 'https://www.reachthefinals.com/patchnotes/580',
    },
    type: 'marksman-rifle',
  },
  {
    classType: 'medium',
    damageBodyMax: 74,
    damageBodyMin: 74,
    damageCriticalMultiplier: 2,
    damageCriticalType: 'headshot',
    description: 'A revolver-style handgun that doubles as a sniper rifle.',
    id: 'r-357',
    imageUrl: '/images/weapons/r-357.png',
    label: 'R.357',
    type: 'handgun',
  },
  {
    classType: 'medium',
    damageBodyMax: 90,
    damageBodyMin: 90,
    damageCriticalMultiplier: 1,
    damageCriticalType: 'none',
    description:
      'A shield and baton that will make your opponents feel like university students exercising their right to free speech.',
    id: 'riot-shield',
    imageUrl: '/images/weapons/riot-shield.png',
    label: 'Riot Shield',
    type: 'melee',
  },
];

export const mediumSpecializations: ContestantSpecialization[] = [
  {
    classType: 'medium',
    description:
      'A turret that shoots targets automatically and has a ton of health.',
    id: 'guardian-turret',
    imageUrl: '/images/specializations/guardian-turret.png',
    label: 'Guardian Turret',
    recentlyAdjusted: {
      adjustmentType: 'buff',
      note: "Pick those babies up and slap 'em back down even faster now. APS cheese activated.",
      url: 'https://www.reachthefinals.com/patchnotes/580',
    },
  },
  {
    classType: 'medium',
    description:
      'Allows users to make floors and walls disappear and reappear.',
    id: 'dematerializer',
    imageUrl: '/images/specializations/dematerializer.png',
    label: 'Dematerializer',
    recentlyAdjusted: {
      adjustmentType: 'buff',
      note: 'Dematerializing lasts less long, however, should now dematerialize more effectively.',
      url: 'https://www.reachthefinals.com/patchnotes/580',
    },
  },
  {
    classType: 'medium',
    description: 'Heals targets.',
    id: 'healing-beam',
    imageUrl: '/images/specializations/healing-beam.png',
    label: 'Healing Beam',
    recentlyAdjusted: {
      adjustmentType: 'neutral',
      note: 'Added a sound cue to indicate when a target is completed healed.',
      url: 'https://www.reachthefinals.com/patchnotes/580',
    },
  },
];

import { ALL_GADGETS } from '../gadgets';
import { heavyClass, heavySpecializations, heavyWeapons } from './heavy';
import { lightClass, lightSpecializations, lightWeapons } from './light';
import { mediumClass, mediumSpecializations, mediumWeapons } from './medium';

export const ALL_WEAPONS = [...lightWeapons, ...mediumWeapons, ...heavyWeapons];

export const ALL_SPECIALIZATIONS = [
  ...lightSpecializations,
  ...mediumSpecializations,
  ...heavySpecializations,
];

export const ALL_ITEMS = [
  ...ALL_GADGETS,
  ...ALL_SPECIALIZATIONS,
  ...ALL_WEAPONS,
  lightClass,
  mediumClass,
  heavyClass,
];

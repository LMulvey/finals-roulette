export type BaseItemType = {
  id: string;
  recentlyAdjusted?: PatchNotes;
};

export type ClassType = 'heavy' | 'light' | 'medium';

export type ContestantClass = {
  description: string;
  healthPoints: number;
  id: string;
  imageUrl?: string;
  label: string;
  regenerationSeconds: number;
  type: ClassType;
};

export type ContestantGadget = BaseItemType & {
  classType: ClassType[];
  description: string;
  imageUrl?: string;
  label: string;
};

export type ContestantLoadout = {
  contestant: ContestantClass;
  gadgets: ContestantGadget[];
  loadoutName: null | string;
  specialization: ContestantSpecialization;
  weapon: ContestantWeapon;
};

export type ContestantSpecialization = BaseItemType & {
  classType: ClassType;
  description: string;
  imageUrl?: string;
  label: string;
};

export type ContestantWeapon = BaseItemType & {
  classType: ClassType;
  damageBodyMax: number;
  damageBodyMin: number;
  damageCriticalMultiplier: number;
  damageCriticalType: DamageCriticalType;
  description: string;
  imageUrl?: string;
  label: string;
  type: WeaponType;
};

export type PatchNotes = {
  adjustmentType: 'buff' | 'nerf' | 'neutral';
  note: string;
  url: string;
};

export type WeaponType =
  | 'assault-rifle'
  | 'grenade-launcher'
  | 'handgun'
  | 'lmg'
  | 'marksman-rifle'
  | 'melee'
  | 'shotgun'
  | 'smg';

type DamageCriticalType = 'alt' | 'headshot' | 'none';

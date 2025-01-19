export type ClassType = 'heavy' | 'light' | 'medium';

export type ContestantClass = {
  description: string;
  healthPoints: number;
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

type BaseItemType = {
  id: string;
  recentlyBuffed?: boolean;
};

type DamageCriticalType = 'alt' | 'headshot' | 'none';

type WeaponType =
  | 'assault-rifle'
  | 'grenade-launcher'
  | 'handgun'
  | 'lmg'
  | 'marksman-rifle'
  | 'melee'
  | 'shotgun'
  | 'smg';

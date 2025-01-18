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

export type ContestantSpecialization<TClassType extends ClassType> =
  BaseItemType & {
    classType: TClassType;
    description: string;
    imageUrl?: string;
    label: string;
  };

export type ContestantWeapon<TClassType extends ClassType> = BaseItemType & {
  classType: TClassType;
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

type ClassType = 'heavy' | 'light' | 'medium';

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

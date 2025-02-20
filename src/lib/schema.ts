export type BaseItemType<TIdType extends string> = {
  description?: string;
  disabled?: boolean;
  id: TIdType;
  label?: string;
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

export type ContestantGadget = BaseItemType<GadgetId> & {
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

export type ContestantSpecialization = BaseItemType<SpecializationId> & {
  classType: ClassType;
  description: string;
  imageUrl?: string;
  label: string;
};

export type ContestantWeapon = BaseItemType<WeaponId> & {
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

export type GadgetId =
  | 'anti-gravity-cube'
  | 'aps-turret'
  | 'barricade'
  | 'breach-charge'
  | 'c4'
  | 'data-reshaper'
  | 'defibrillator'
  | 'dome-shield'
  | 'explosive-mine'
  | 'flashbang'
  | 'frag-grenade'
  | 'gas-grenade'
  | 'gas-mine'
  | 'gateway'
  | 'glitch-grenade'
  | 'glitch-trap'
  | 'goo-grenade'
  | 'gravity-vortex'
  | 'jump-pad'
  | 'lockbolt-launcher'
  | 'proximity-sensor'
  | 'pyro-grenade'
  | 'pyro-mine'
  | 'rpg-7'
  | 'smoke-grenade'
  | 'sonar-grenade'
  | 'stun-gun'
  | 'thermal-bore'
  | 'thermal-vision'
  | 'tracking-dart'
  | 'vanishing-bomb'
  | 'zipline';

export type Settings = {
  disabledEquipmentIds: string[];
  showEquipmentDescriptions: boolean;
};

export type SpecializationId =
  | 'charge-n-slam'
  | 'cloaking-device'
  | 'dematerializer'
  | 'evasive-dash'
  | 'goo-gun'
  | 'grappling-hook'
  | 'guardian-turret'
  | 'healing-beam'
  | 'mesh-shield'
  | 'winch-claw';

export type WeaponId =
  | '50-akimbo'
  | '93r'
  | 'akm'
  | 'cerberus'
  | 'cl-40'
  | 'dagger'
  | 'dual-blades'
  | 'famas'
  | 'fcar'
  | 'flamethrower'
  | 'ks-23'
  | 'lewis-gun'
  | 'lh1'
  | 'm11'
  | 'm26-matter'
  | 'm32gl'
  | 'm60'
  | 'model-1887'
  | 'pike-556'
  | 'r-357'
  | 'recurve-bow'
  | 'riot-shield'
  | 'sa1216'
  | 'sh1900'
  | 'shak-50'
  | 'sledgehammer'
  | 'spear'
  | 'sr-84'
  | 'sword'
  | 'throwing-knives'
  | 'v9s'
  | 'xp-54';

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

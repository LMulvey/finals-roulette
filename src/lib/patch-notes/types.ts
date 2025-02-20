import { type GadgetId, type SpecializationId, type WeaponId } from '../schema';

export type Patch = {
  date: Date;
  description: string;
  originalUrl: string;
  patchNotes: PatchNote[];
  title: string;
  version: string;
};

export type PatchNote = {
  adjustmentType: 'buff' | 'nerf' | 'neutral' | 'removal';
  category: PatchNoteCategory;
  devNote?: string;
  note: string;
  sassyNote?: string;
  section: PatchNoteSection;
  target?: PatchNoteTarget;
};

export type PatchNoteCategory =
  | 'animation'
  | 'audio'
  | 'characters'
  | 'contestants'
  | 'controller'
  | 'cosmetics'
  | 'gadget'
  | 'game-mode'
  | 'gameplay'
  | 'general'
  | 'maps'
  | 'settings'
  | 'specializations'
  | 'stability-and-performance'
  | 'ui'
  | 'vfx'
  | 'weapons';

export type PatchNoteSection =
  | 'additions'
  | 'balance'
  | 'content-and-bug-fixes'
  | 'security-and-anti-cheat';

export type PatchNoteTarget =
  | 'general'
  | GadgetId
  | SpecializationId
  | (string & {})
  | WeaponId;

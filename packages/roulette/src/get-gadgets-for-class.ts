import { ALL_GADGETS } from './gadgets';
import { type Locks } from './get-random-items';
import { type ClassType, type ContestantGadget } from '@repo/schema/roulette';

export const getGadgetsForClass = (
  classType: ClassType,
  options?: {
    disabledEquipmentIds?: string[];
    locks?: Locks;
    returnIfDisabledByEmbark?: boolean;
    returnIfDisabledByUser?: boolean;
  },
): ContestantGadget[] => {
  const disabledEquipmentIds = options?.disabledEquipmentIds ?? [];
  const lockedGadgetIds = options?.locks?.gadgets?.map((gadget) => gadget.id);
  const gadgetsForClass = ALL_GADGETS.filter((gadget) =>
    gadget.classType.includes(classType),
  );

  const validGadgets = gadgetsForClass.filter((gadget) => {
    const isLocked = lockedGadgetIds?.includes(gadget.id) ?? false;
    const isDisabledByUser = disabledEquipmentIds.includes(gadget.id);
    const isDisabledByEmbark = Boolean(gadget.disabled);

    if (isLocked) return false;
    if (isDisabledByUser && !options?.returnIfDisabledByUser) return false;
    if (isDisabledByEmbark && !options?.returnIfDisabledByEmbark) return false;

    return true;
  });

  return validGadgets;
};

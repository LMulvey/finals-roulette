import { GADGETS } from './gadgets';
import { type Locks } from './get-random-items';
import { type ClassType, type ContestantGadget } from './schema';
import { getSettings } from './settings-storage';

export const getGadgetsForClass = (
  classType: ClassType,
  locks?: Locks,
): ContestantGadget[] => {
  const settings = getSettings();
  const lockedGadgetIds = locks?.gadgets?.map((gadget) => gadget.id);
  const validGadgets = GADGETS.filter(
    (gadget) =>
      gadget.classType.includes(classType) &&
      !settings.disabledEquipmentIds.includes(gadget.id) &&
      !lockedGadgetIds?.includes(gadget.id),
  );
  return validGadgets;
};

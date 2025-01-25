import { GADGETS } from './gadgets';
import { type Locks } from './get-random-items';
import { type ClassType, type ContestantGadget } from './schema';

export const getGadgetsForClass = (
  classType: ClassType,
  locks?: Locks,
): ContestantGadget[] => {
  const lockedGadgetIds = locks?.gadgets?.map((gadget) => gadget.id);
  const validGadgets = GADGETS.filter(
    (gadget) =>
      gadget.classType.includes(classType) &&
      !lockedGadgetIds?.includes(gadget.id),
  );
  return validGadgets;
};

import { GADGETS } from './gadgets';
import { type ClassType, type ContestantGadget } from './schema';

export const getGadgetsForClass = (
  classType: ClassType,
): ContestantGadget[] => {
  const validGadgets = GADGETS.filter((gadget) =>
    gadget.classType.includes(classType),
  );
  return validGadgets;
};

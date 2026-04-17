import { ALL_ITEMS } from './contestants/aggregate';

export const maybeGetItemById = (maybeId: string) => {
  const maybeItem = ALL_ITEMS.find((item) => item.id === maybeId);
  return maybeItem;
};

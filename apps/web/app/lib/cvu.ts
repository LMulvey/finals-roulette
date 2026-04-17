import { type ClassVariantUtility, clsx, config } from 'cvu';
import { twMerge } from 'tailwind-merge';

export const cvu: ClassVariantUtility = config({
  clsx: (...inputs) => twMerge(clsx(inputs)),
});

import { type ClassVariantUtility, clsx, config } from "cvu";
import { twMerge } from "tailwind-merge";

export const cvu: ClassVariantUtility = config({
	clsx: (...inputs) => twMerge(clsx(inputs)),
});

export const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs));

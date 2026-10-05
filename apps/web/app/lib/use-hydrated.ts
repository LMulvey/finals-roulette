import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

/**
 * True once rendering on the client. Anything read from localStorage (settings,
 * saved loadouts) should wait for this to avoid server/client markup mismatches.
 */
export const useHydrated = () =>
	useSyncExternalStore(
		subscribe,
		() => true,
		() => false,
	);

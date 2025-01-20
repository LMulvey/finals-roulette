import { useCallback, useEffect, useState } from 'react';

type RouterState = {
  hash: string;
  pathname: string;
  search: string;
};

export const useRouter = () => {
  const [routerState, setRouterState] = useState<RouterState>(() => ({
    hash: window.location.hash,
    // For hash router, we'll extract the pathname from the hash
    pathname: window.location.hash.slice(1).split('?')[0] || '/',
    search: window.location.hash.includes('?')
      ? `?${window.location.hash.split('?')[1]}`
      : '',
  }));

  // Update state when popstate event occurs (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      setRouterState({
        hash: window.location.hash,
        pathname: window.location.hash.slice(1).split('?')[0] || '/',
        search: window.location.hash.includes('?')
          ? `?${window.location.hash.split('?')[1]}`
          : '',
      });
    };

    // Listen to hashchange instead of popstate for hash routing
    window.addEventListener('hashchange', handlePopState);
    return () => window.removeEventListener('hashchange', handlePopState);
  }, []);

  // Navigate to a new route
  const push = useCallback((path: string) => {
    // Remove leading # if present
    const cleanPath = path.startsWith('#') ? path.slice(1) : path;
    window.location.hash = cleanPath;
    setRouterState({
      hash: window.location.hash,
      pathname: cleanPath.split('?')[0] || '/',
      search: cleanPath.includes('?') ? `?${cleanPath.split('?')[1]}` : '',
    });
  }, []);

  // Replace current route
  const replace = useCallback((path: string) => {
    // For hash routing, replace behaves the same as push
    const cleanPath = path.startsWith('#') ? path.slice(1) : path;
    window.location.replace(`${window.location.pathname}#${cleanPath}`);
    setRouterState({
      hash: window.location.hash,
      pathname: cleanPath.split('?')[0] || '/',
      search: cleanPath.includes('?') ? `?${cleanPath.split('?')[1]}` : '',
    });
  }, []);

  // Go back
  const back = useCallback(() => {
    window.history.back();
  }, []);

  // Go forward
  const forward = useCallback(() => {
    window.history.forward();
  }, []);

  return {
    ...routerState,
    back,
    forward,
    push,
    replace,
  };
};

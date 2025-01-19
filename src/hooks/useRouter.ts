import { useCallback, useEffect, useState } from 'react';

type RouterState = {
  hash: string;
  pathname: string;
  search: string;
};

export const useRouter = () => {
  const [routerState, setRouterState] = useState<RouterState>(() => ({
    hash: window.location.hash,
    pathname: window.location.pathname,
    search: window.location.search,
  }));

  // Update state when popstate event occurs (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      setRouterState({
        hash: window.location.hash,
        pathname: window.location.pathname,
        search: window.location.search,
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigate to a new route
  const push = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setRouterState({
      hash: window.location.hash,
      pathname: window.location.pathname,
      search: window.location.search,
    });
  }, []);

  // Replace current route
  const replace = useCallback((path: string) => {
    window.history.replaceState({}, '', path);
    setRouterState({
      hash: window.location.hash,
      pathname: window.location.pathname,
      search: window.location.search,
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

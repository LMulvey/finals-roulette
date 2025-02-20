import { getPatchByVersion } from '@/lib/patch-notes/patches';
import { type PageContext } from 'vike/types';

export const data = (pageContext: PageContext) => {
  const { version } = pageContext.routeParams;
  const maybePatch = getPatchByVersion(version);
  return { patch: maybePatch ?? null };
};

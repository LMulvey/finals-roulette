import { LoadoutDisplay } from '@/components/loadout-display';
import { type ContestantLoadout } from '@/lib/schema';
import { deserializeLoadout, serializeLoadout } from '@/lib/serialize';
import { Spinner } from '@phosphor-icons/react';
import { useState } from 'react';
import { clientOnly } from 'vike-react/clientOnly';
import { usePageContext } from 'vike-react/usePageContext';

const SavedLoadouts = clientOnly(
  async () => (await import('@/components/saved-loadouts')).SavedLoadouts,
);

const LOADOUT_PARAMETER = 'loadout';

const maybeGetLoadout = (maybeLoadoutParameter: string) => {
  const maybeLoadout = deserializeLoadout(maybeLoadoutParameter ?? '');
  return maybeLoadout;
};

export const Page = () => {
  const pageContext = usePageContext();
  const [loadout, setLoadout] = useState<ContestantLoadout | null>(() => {
    const maybeLoadoutParameter = pageContext.routeParams[LOADOUT_PARAMETER];
    return maybeGetLoadout(maybeLoadoutParameter);
  });

  return (
    <div className="w-screen flex flex-col items-center justify-center">
      <SavedLoadouts
        fallback={
          <div className="p-2 bg-finals-black/80 rounded-md text-4xl flex flex-row items-center justify-center gap-2">
            <Spinner
              className="animate-spin"
              size={24}
            />
            Fetching loadouts...
          </div>
        }
        setLoadout={setLoadout}
      />
      <div>
        {loadout ? (
          <LoadoutDisplay
            key={serializeLoadout(loadout)}
            loadout={loadout}
          />
        ) : null}
      </div>
    </div>
  );
};

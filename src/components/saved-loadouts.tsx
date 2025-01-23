import { LoadoutCard } from './loadout-card';
import { getSavedLoadouts } from '@/lib/saved-loadouts';
import { type ContestantLoadout } from '@/lib/schema';
import { deserializeLoadout } from '@/lib/serialize';
import * as motion from 'motion/react-client';
import { type Dispatch, type SetStateAction, useEffect } from 'react';
import { usePageContext } from 'vike-react/usePageContext';

const LOADOUT_PARAMETER = 'loadout';

export const SavedLoadouts = ({
  setLoadout,
}: {
  readonly setLoadout: Dispatch<SetStateAction<ContestantLoadout | null>>;
}) => {
  const saved = getSavedLoadouts();
  const pageContext = usePageContext();
  const maybeLoadoutParameter = pageContext.routeParams[LOADOUT_PARAMETER];

  useEffect(() => {
    if (maybeLoadoutParameter) {
      const maybeLoadout = deserializeLoadout(maybeLoadoutParameter);
      if (maybeLoadout) {
        setLoadout(maybeLoadout);
      }
    }
  }, [pageContext.routeParams, setLoadout, maybeLoadoutParameter]);

  return (
    <motion.div
      animate="animate"
      initial="initial"
      variants={{ animate: { opacity: 1 }, initial: { opacity: 0 } }}
    >
      {saved.length ? (
        <div className="bg-black/40 rounded-md px-6 py-4 space-y-2">
          <p className="font-bold text-2xl">Saved Builds</p>
          <div className="flex flex-row max-w-full overflow-y-scroll gap-4">
            {saved.map((currentLoadout) => {
              return (
                <a
                  href={`/saved/${currentLoadout.loadoutKey}`}
                  key={currentLoadout.loadoutKey}
                >
                  <LoadoutCard loadout={currentLoadout} />
                </a>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-6 bg-gray-500 rounded-md text-6xl flex items-center justify-center">
          Nothing saved! Roll some loadouts and save here to view.
        </div>
      )}
    </motion.div>
  );
};

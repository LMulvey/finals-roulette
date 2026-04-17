"use client";

import { LoadoutCard } from './loadout-card';
import { getSavedLoadouts } from '@/lib/saved-loadouts';
import { deserializeLoadout } from '@/lib/serialize';
import { type ContestantLoadout } from '@repo/schema/roulette';
import * as motion from 'motion/react-client';
import { useParams } from 'next/navigation';
import { type Dispatch, type SetStateAction, useEffect } from 'react';

export const SavedLoadouts = ({
  setLoadout,
}: {
  readonly setLoadout: Dispatch<SetStateAction<ContestantLoadout | null>>;
}) => {
  const saved = getSavedLoadouts();
  const params = useParams<{ loadout?: string }>();
  const maybeLoadoutParameter = params.loadout;

  useEffect(() => {
    if (maybeLoadoutParameter) {
      const maybeLoadout = deserializeLoadout(maybeLoadoutParameter);
      if (maybeLoadout) {
        setLoadout(maybeLoadout);
      }
    }
  }, [setLoadout, maybeLoadoutParameter]);

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
                  <LoadoutCard
                    loadout={currentLoadout}
                    loadoutKey={currentLoadout.loadoutKey}
                  />
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

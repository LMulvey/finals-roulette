"use client";

import { LoadoutDisplay } from '@/components/loadout-display';
import { SavedLoadouts } from '@/components/saved-loadouts';
import { deserializeLoadout, serializeLoadout } from '@/lib/serialize';
import { type ContestantLoadout } from '@repo/schema/roulette';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const maybeGetLoadout = (maybeLoadoutParameter: string) => {
  const maybeLoadout = deserializeLoadout(maybeLoadoutParameter ?? '');
  return maybeLoadout;
};

export const Page = () => {
  const params = useParams<{ loadout?: string }>();
  const [loadout, setLoadout] = useState<ContestantLoadout | null>(() => {
    return maybeGetLoadout(params.loadout ?? '');
  });

  return (
    <div className="w-screen flex flex-col items-center justify-center">
      <SavedLoadouts
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

export default Page;

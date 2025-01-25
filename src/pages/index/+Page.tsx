import { LoadoutDisplay } from '@/components/loadout-display';
import { useToast } from '@/hooks/use-toast';
import { cvu } from '@/lib/cvu';
import { getRandomLoadout, type Locks } from '@/lib/get-random-items';
import { getRecentLoadouts, saveRecentLoadout } from '@/lib/recents-storage';
import { addSavedLoadout, getSavedLoadoutKeys } from '@/lib/saved-loadouts';
import { type ContestantLoadout } from '@/lib/schema';
import { deserializeLoadout, serializeLoadout } from '@/lib/serialize';
import { FloppyDisk, ShareFat } from '@phosphor-icons/react';
import { DicesIcon } from 'lucide-react';
import * as motion from 'motion/react-client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { clientOnly } from 'vike-react/clientOnly';
import { usePageContext } from 'vike-react/usePageContext';
import { navigate } from 'vike/client/router';

const RecentsToggle = clientOnly(
  async () => (await import('@/lib/recents-toggle')).RecentsToggle,
);

const LOADOUT_PARAMETER = 'loadout';

const buttonContainer = cvu(
  'py-4 bg-finals-black flex flex-col gap-2 items-center justify-center w-[316px]',
  {
    variants: {
      firstLoadout: { false: ['my-2'], true: ['my-20'] },
    },
  },
);

const maybeGetLoadout = (maybeLoadoutParameter: string) => {
  const maybeLoadout = deserializeLoadout(maybeLoadoutParameter ?? '');
  return maybeLoadout;
};

export const Page = () => {
  const pageContext = usePageContext();
  const { toast } = useToast();
  const contestantElementRef = useRef<HTMLDivElement | null>(null);
  const [loadout, setLoadout] = useState<ContestantLoadout | null>(() => {
    const maybeLoadoutParameter = pageContext.routeParams[LOADOUT_PARAMETER];
    return maybeGetLoadout(maybeLoadoutParameter);
  });
  const [loadoutKey, setLoadoutKey] = useState<null | string>(null);
  const [locks, setLocks] = useState<Locks>({});
  const recents = getRecentLoadouts();

  const onClickLoadout = useCallback(() => {
    const randomLoadout = getRandomLoadout({ locks });
    const newLoadoutKey = serializeLoadout(randomLoadout);

    setLoadoutKey(newLoadoutKey);
    setLoadout(randomLoadout);

    if (
      !recents.some(
        (recentLoadout) => serializeLoadout(recentLoadout) === newLoadoutKey,
      )
    ) {
      saveRecentLoadout(newLoadoutKey);
    }

    navigate(`/${newLoadoutKey}`, {
      keepScrollPosition: true,
      overwriteLastHistoryEntry: true,
    });

    const { matches: isSmallWindow } = window.matchMedia(
      'screen and (max-width: 674px)',
    );

    if (contestantElementRef.current && isSmallWindow) {
      const stickyOffset = 248;
      const elementTop =
        contestantElementRef.current.getBoundingClientRect().top;
      const offsetPosition = elementTop + window.pageYOffset - stickyOffset;

      window.scrollTo({
        behavior: 'smooth',
        top: offsetPosition,
      });
    }
  }, [locks, recents]);

  useEffect(() => {
    if (!loadout || !loadoutKey) {
      onClickLoadout();
    }
  }, [loadout, loadoutKey, onClickLoadout]);

  useEffect(() => {
    const maybeLoadoutParameter = pageContext.routeParams[LOADOUT_PARAMETER];
    const maybeLoadout = maybeGetLoadout(maybeLoadoutParameter);

    if (maybeLoadout) {
      setLoadoutKey(maybeLoadoutParameter);
      setLoadout(maybeLoadout);
    }
  }, [pageContext.routeParams]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        description:
          "Post to Reddit, Discord, Friendster, Bluesky, whatever. I don't give a shit I'm not your dad.",
        title: 'Copied shareable URL to clipboard',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy URL:', error);
      toast({
        description: 'Worked fine on my machine so I am blaming you.',
        title: 'Failed to copy',
      });
    }
  };

  const onClickSave = async () => {
    const currentLoadouts = getSavedLoadoutKeys();
    if (loadoutKey && !currentLoadouts.includes(loadoutKey)) {
      // save new key
      addSavedLoadout(loadoutKey);
      toast({
        description: (
          <>
            Saved <strong>{loadout?.loadoutName ?? 'Loadout'}</strong> to local
            storage!
          </>
        ),
        title: 'Loadout saved!',
      });
    }
  };

  return (
    <div className="w-screen flex flex-col items-center justify-center">
      <div className="sticky md:static top-0 left-0 w-full bg-finals-black flex items-center justify-center">
        <div className={buttonContainer({ firstLoadout: !loadout })}>
          <div className="flex flex-row gap-2">
            <button
              className="text-3xl bg-yellow-400 text-gray-800 font-bold hover:bg-yellow-300 transition-colors px-6 h-16 w-full rounded-lg uppercase flex flex-row items-center gap-2 justify-center"
              onClick={onClickLoadout}
              type="button"
            >
              <DicesIcon />
              {loadout ? 'Roll another!' : 'Roll loadout'}
            </button>
            <RecentsToggle />
          </div>
          <div className="flex flex-row items-center justify-end gap-2 w-full">
            {loadout ? (
              <motion.button
                animate="animate"
                className="flex flex-row items-center gap-2 text-xl border border-white bg-finals-black text-finals-white font-bold hover:bg-yellow-500 transition-colors px-4 py-2 rounded-lg uppercase italic"
                initial="initial"
                onClick={onClickSave}
                type="button"
                variants={{ animate: { opacity: 1 }, initial: { opacity: 0 } }}
              >
                <FloppyDisk
                  size={24}
                  weight="duotone"
                />
                Save
              </motion.button>
            ) : null}
            {loadout ? (
              <motion.button
                animate="animate"
                className="flex flex-row items-center gap-2 text-lg border border-finals-red bg-finals-red text-finals-white font-bold hover:bg-red-400 transition-colors px-4 py-2 rounded-lg uppercase italic"
                initial="initial"
                onClick={copyToClipboard}
                type="button"
                variants={{ animate: { opacity: 1 }, initial: { opacity: 0 } }}
              >
                <ShareFat
                  size={16}
                  weight="fill"
                />
                Share
              </motion.button>
            ) : null}
          </div>
        </div>
      </div>
      <div ref={contestantElementRef}>
        {loadout ? (
          <LoadoutDisplay
            loadout={loadout}
            locks={locks}
            setLocks={setLocks}
          />
        ) : null}
      </div>
    </div>
  );
};

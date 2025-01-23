import { ItemCard } from '@/components/item-card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { cvu } from '@/lib/cvu';
import { getRandomLoadout } from '@/lib/get-random-items';
import { getRecentLoadouts, saveRecentLoadout } from '@/lib/recents-storage';
import { type ContestantLoadout } from '@/lib/schema';
import { deserializeLoadout, serializeLoadout } from '@/lib/serialize';
import {
  Fire,
  MagicWand,
  Person,
  Rewind,
  ShareFat,
  Sword,
} from '@phosphor-icons/react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import { navigate } from 'vike/client/router';

const LOADOUT_PARAMETER = 'loadout';

const buttonContainer = cvu(
  'py-4 w-full bg-finals-black flex flex-col gap-2 items-center justify-center sticky top-0 left-0',
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
  const recents = getRecentLoadouts();

  const onClickLoadout = () => {
    const randomLoadout = getRandomLoadout();
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
  };

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

  const items = useMemo(
    () =>
      loadout
        ? [
            {
              description: loadout.contestant.description,
              icon: <Person size={16} />,
              id: loadout.contestant.id,
              imageUrl: loadout.contestant.imageUrl,
              label: loadout.contestant.label,
              ref: contestantElementRef,
              title: 'Contestant',
            },
            {
              description: loadout.specialization.description,
              icon: <MagicWand size={16} />,
              id: loadout.specialization.id,
              imageUrl: loadout.specialization.imageUrl,
              label: loadout.specialization.label,
              title: 'Specialization',
            },
            {
              description: loadout.weapon.description,
              icon: <Sword size={16} />,
              id: loadout.weapon.id,
              imageUrl: loadout.weapon.imageUrl,
              label: loadout.weapon.label,
              title: 'Weapon',
            },
            {
              description: loadout.gadgets[0]?.description,
              icon: <Fire size={16} />,
              id: loadout.gadgets[0]?.id,
              imageUrl: loadout.gadgets[0]?.imageUrl,
              label: loadout.gadgets[0]?.label,
              title: 'Gadget',
            },
            {
              description: loadout.gadgets[1]?.description,
              icon: <Fire size={16} />,
              id: loadout.gadgets[1]?.id,
              imageUrl: loadout.gadgets[1]?.imageUrl,
              label: loadout.gadgets[1]?.label,
              title: 'Gadget',
            },
            {
              description: loadout.gadgets[2]?.description,
              icon: <Fire size={16} />,
              id: loadout.gadgets[2]?.id,
              imageUrl: loadout.gadgets[2]?.imageUrl,
              label: loadout.gadgets[2]?.label,
              title: 'Gadget',
            },
          ]
        : [],
    [loadout],
  );

  return (
    <div className="w-screen flex flex-col items-center justify-center">
      <div className={buttonContainer({ firstLoadout: items.length === 0 })}>
        <button
          className="text-3xl bg-yellow-400 text-gray-800 font-bold hover:bg-yellow-300 transition-colors px-6 py-4 rounded-lg uppercase italic"
          onClick={onClickLoadout}
          type="button"
        >
          {items.length ? 'Roll another!' : 'Roll your loadout'}
        </button>
        <div className="flex flex-row items-center justify-between gap-8">
          {items.length ? (
            <motion.button
              animate="animate"
              className="flex flex-row items-center gap-2 text-lg bg-finals-red text-finals-white font-bold hover:bg-red-400 transition-colors px-4 py-2 rounded-lg uppercase italic"
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
          {recents.length ? (
            <Popover>
              <motion.div
                animate="animate"
                initial="initial"
                variants={{ animate: { opacity: 1 }, initial: { opacity: 0 } }}
              >
                <PopoverTrigger className="flex flex-row items-center gap-2 text-lg bg-gray-600 text-finals-white font-bold hover:bg-gray-500 transition-colors px-4 py-2 rounded-lg uppercase italic">
                  <Rewind size={16} /> Recent
                </PopoverTrigger>
              </motion.div>
              <PopoverContent>
                <h1>Recents Builds</h1>
                <div className="flex flex-col gap-2">
                  {recents.map((recentLoadout) => {
                    const currentLoadoutKey = serializeLoadout(recentLoadout);

                    return (
                      <a
                        className="text-sm text-white"
                        href={`/${currentLoadoutKey}`}
                        key={currentLoadoutKey}
                      >
                        {recentLoadout.loadoutName}
                      </a>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
          ) : null}
        </div>
      </div>
      <div ref={contestantElementRef}>
        {items.length && loadout ? (
          <AnimatePresence mode="wait">
            <motion.div
              animate="animate"
              className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 max-w-80 md:max-w-3xl mt-10 mb-40"
              exit="initial"
              initial="initial"
              key={loadoutKey}
              variants={{
                animate: { transition: { staggerChildren: 0.1 } },
                exit: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.h2
                animate="animate"
                className="text-3xl text-center w-full"
                exit="initial"
                initial="initial"
                key={`${loadoutKey}-name`}
                variants={{
                  animate: { opacity: 1, scale: 1 },
                  initial: { opacity: 0, scale: 0 },
                }}
              >
                {loadout.loadoutName}
              </motion.h2>
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  {...item}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : null}
      </div>
    </div>
  );
};

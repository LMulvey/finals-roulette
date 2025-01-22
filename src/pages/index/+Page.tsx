import { ItemCard } from '@/components/item-card';
import { cvu } from '@/lib/cvu';
import { getRandomLoadout } from '@/lib/get-random-items';
import { type ContestantLoadout } from '@/lib/schema';
import { deserializeLoadout, serializeLoadout } from '@/lib/serialize';
import { Fire, MagicWand, Person, Sword } from '@phosphor-icons/react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useMemo, useRef, useState } from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import { navigate } from 'vike/client/router';

const LOADOUT_PARAMETER = 'loadout';

const buttonContainer = cvu(
  'py-4 w-full bg-finals-black flex items-center justify-center sticky top-0 left-0',
  {
    variants: {
      firstLoadout: { false: [], true: ['my-20'] },
    },
  },
);

export const Page = () => {
  const pageContext = usePageContext();
  const contestantElementRef = useRef<HTMLDivElement | null>(null);
  const [loadout, setLoadout] = useState<ContestantLoadout | null>(() => {
    const maybeLoadoutParameter = pageContext.routeParams[LOADOUT_PARAMETER];
    const maybeLoadout = deserializeLoadout(maybeLoadoutParameter ?? '');
    return maybeLoadout;
  });
  const [loadoutKey, setLoadoutKey] = useState<null | string>(null);

  const onClickLoadout = () => {
    const randomLoadout = getRandomLoadout();
    const newLoadoutKey = serializeLoadout(randomLoadout);

    setLoadoutKey(newLoadoutKey);
    setLoadout(randomLoadout);

    navigate(`/${newLoadoutKey}`);

    const { matches: isSmallWindow } = window.matchMedia(
      'screen and (max-width: 674px)',
    );

    if (contestantElementRef.current && isSmallWindow) {
      const stickyOffset = 100;
      const elementTop =
        contestantElementRef.current.getBoundingClientRect().top;
      const offsetPosition = elementTop + window.pageYOffset - stickyOffset;

      window.scrollTo({
        behavior: 'smooth',
        top: offsetPosition,
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
      </div>
      <div ref={contestantElementRef}>
        {items.length && loadout ? (
          <AnimatePresence mode="wait">
            <motion.h2
              animate="animate"
              className="text-3xl text-center"
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

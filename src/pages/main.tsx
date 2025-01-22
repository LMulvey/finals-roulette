import { ItemCard } from '@/components/item-card';
import { cvu } from '@/lib/cvu';
import { getRandomLoadout } from '@/lib/get-random-items';
import {
  type ContestantClass,
  type ContestantGadget,
  type ContestantSpecialization,
  type ContestantWeapon,
} from '@/lib/schema';
import { serializeLoadout } from '@/lib/serialize';
import { Fire, MagicWand, Person, Sword } from '@phosphor-icons/react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useMemo, useRef, useState } from 'react';

const buttonContainer = cvu(
  'py-4 w-full bg-finals-black flex items-center justify-center sticky top-0 left-0',
  {
    variants: {
      firstLoadout: { false: [], true: ['my-20'] },
    },
  },
);

export const MainPage = () => {
  const contestantElementRef = useRef<HTMLDivElement | null>(null);
  const [contestantClass, setContestantClass] =
    useState<ContestantClass | null>(null);
  const [weapon, setWeapon] = useState<ContestantWeapon | null>(null);
  const [specialization, setSpecialization] =
    useState<ContestantSpecialization | null>(null);
  const [gadgetOne, setGadgetOne] = useState<ContestantGadget | null>(null);
  const [gadgetTwo, setGadgetTwo] = useState<ContestantGadget | null>(null);
  const [gadgetThree, setGadgetThree] = useState<ContestantGadget | null>(null);

  const onClickLoadout = () => {
    const loadout = getRandomLoadout();

    setContestantClass(loadout.contestant);
    setWeapon(loadout.weapon);
    setSpecialization(loadout.specialization);
    setGadgetOne(loadout.gadgets[0]);
    setGadgetTwo(loadout.gadgets[1]);
    setGadgetThree(loadout.gadgets[2]);

    if (contestantElementRef.current) {
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
    // eslint-disable-next-line complexity
    () =>
      [
        {
          description: contestantClass?.description,
          icon: <Person size={16} />,
          id: contestantClass?.id ?? 'contestant',
          imageUrl: contestantClass?.imageUrl,
          label: contestantClass?.label,
          ready: Boolean(contestantClass),
          ref: contestantElementRef,
          title: 'Contestant',
        },
        {
          description: specialization?.description,
          icon: <MagicWand size={16} />,
          id: specialization?.id ?? 'specialization',
          imageUrl: specialization?.imageUrl,
          label: specialization?.label,
          ready: Boolean(specialization),
          title: 'Specialization',
        },
        {
          description: weapon?.description,
          icon: <Sword size={16} />,
          id: weapon?.id ?? 'weapon',
          imageUrl: weapon?.imageUrl,
          label: weapon?.label,
          ready: Boolean(weapon),
          title: 'Weapon',
        },
        {
          description: gadgetOne?.description,
          icon: <Fire size={16} />,
          id: gadgetOne?.id ?? 'gadgetOne',
          imageUrl: gadgetOne?.imageUrl,
          label: gadgetOne?.label,
          ready: Boolean(gadgetOne),
          title: 'Gadget',
        },
        {
          description: gadgetTwo?.description,
          icon: <Fire size={16} />,
          id: gadgetTwo?.id ?? 'gadgetTwo',
          imageUrl: gadgetTwo?.imageUrl,
          label: gadgetTwo?.label,
          ready: Boolean(gadgetTwo),
          title: 'Gadget',
        },
        {
          description: gadgetThree?.description,
          icon: <Fire size={16} />,
          id: gadgetThree?.id ?? 'gadgetThree',
          imageUrl: gadgetThree?.imageUrl,
          label: gadgetThree?.label,
          ready: Boolean(gadgetThree),
          title: 'Gadget',
        },
      ].filter((item) => item.ready),
    [
      contestantClass,
      gadgetOne,
      gadgetThree,
      gadgetTwo,
      specialization,
      weapon,
    ],
  );
  const loadoutKey = serializeLoadout(items);

  return (
    <main className="w-screen flex flex-col items-center justify-center">
      <div className={buttonContainer({ firstLoadout: items.length === 0 })}>
        <button
          className="text-3xl bg-yellow-400 text-gray-800 font-bold hover:bg-yellow-300 transition-colors px-6 py-4 rounded-lg uppercase italic"
          onClick={onClickLoadout}
          type="button"
        >
          {items.length ? 'Roll another!' : 'Roll your loadout'}
        </button>
      </div>

      {items.length ? (
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
            {items.map((item) => (
              <ItemCard
                key={item.id}
                {...item}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : null}
    </main>
  );
};

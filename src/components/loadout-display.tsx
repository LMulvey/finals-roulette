import { ItemCard } from './item-card';
import { type ContestantLoadout } from '@/lib/schema';
import { serializeLoadout } from '@/lib/serialize';
import { Fire, MagicWand, Person, Sword } from '@phosphor-icons/react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useMemo } from 'react';

export const LoadoutDisplay = ({
  loadout,
}: {
  readonly loadout: ContestantLoadout;
  readonly showToolbar?: boolean;
}) => {
  const loadoutKey = serializeLoadout(loadout);
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
              title: 'Contestant',
            },
            {
              description: loadout.specialization.description,
              icon: <MagicWand size={16} />,
              id: loadout.specialization.id,
              imageUrl: loadout.specialization.imageUrl,
              label: loadout.specialization.label,
              recentlyAdjusted: loadout.specialization.recentlyAdjusted,
              title: 'Specialization',
            },
            {
              description: loadout.weapon.description,
              icon: <Sword size={16} />,
              id: loadout.weapon.id,
              imageUrl: loadout.weapon.imageUrl,
              label: loadout.weapon.label,
              recentlyAdjusted: loadout.weapon.recentlyAdjusted,
              title: 'Weapon',
            },
            {
              description: loadout.gadgets[0]?.description,
              icon: <Fire size={16} />,
              id: loadout.gadgets[0]?.id,
              imageUrl: loadout.gadgets[0]?.imageUrl,
              label: loadout.gadgets[0]?.label,
              recentlyAdjusted: loadout.gadgets[0]?.recentlyAdjusted,
              title: 'Gadget',
            },
            {
              description: loadout.gadgets[1]?.description,
              icon: <Fire size={16} />,
              id: loadout.gadgets[1]?.id,
              imageUrl: loadout.gadgets[1]?.imageUrl,
              label: loadout.gadgets[1]?.label,
              recentlyAdjusted: loadout.gadgets[1]?.recentlyAdjusted,
              title: 'Gadget',
            },
            {
              description: loadout.gadgets[2]?.description,
              icon: <Fire size={16} />,
              id: loadout.gadgets[2]?.id,
              imageUrl: loadout.gadgets[2]?.imageUrl,
              label: loadout.gadgets[2]?.label,
              recentlyAdjusted: loadout.gadgets[2]?.recentlyAdjusted,
              title: 'Gadget',
            },
          ]
        : [],
    [loadout],
  );

  return (
    <>
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
              className="text-7xl text-center w-full"
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
    </>
  );
};

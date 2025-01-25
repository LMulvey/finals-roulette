import { ItemCard } from './item-card';
import { type Locks } from '@/lib/get-random-items';
import { type ContestantLoadout } from '@/lib/schema';
import { serializeLoadout } from '@/lib/serialize';
import { Fire, MagicWand, Person, Sword } from '@phosphor-icons/react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { type Dispatch, type SetStateAction, useMemo } from 'react';

export const LoadoutDisplay = ({
  loadout,
  locks,
  setLocks,
}: {
  readonly loadout: ContestantLoadout;
  readonly locks: Locks;
  readonly setLocks: Dispatch<SetStateAction<Locks>>;
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
              lockDisabled:
                locks.specialization || locks.weapon
                  ? 'Locking the weapon or specialization also locks the contestant.'
                  : '',
              locked: Boolean(locks.contestant),
              onSetLock: () =>
                setLocks((currentLocks) => ({
                  ...currentLocks,
                  contestant: currentLocks.contestant
                    ? undefined
                    : loadout.contestant,
                })),
              title: 'Contestant',
            },
            {
              description: loadout.specialization.description,
              icon: <MagicWand size={16} />,
              id: loadout.specialization.id,
              imageUrl: loadout.specialization.imageUrl,
              label: loadout.specialization.label,
              locked: Boolean(locks.specialization),
              onSetLock: () =>
                setLocks((currentLocks) => ({
                  ...currentLocks,
                  contestant: loadout.contestant,
                  specialization: currentLocks.specialization
                    ? undefined
                    : loadout.specialization,
                })),
              recentlyAdjusted: loadout.specialization.recentlyAdjusted,
              title: 'Specialization',
            },
            {
              description: loadout.weapon.description,
              icon: <Sword size={16} />,
              id: loadout.weapon.id,
              imageUrl: loadout.weapon.imageUrl,
              label: loadout.weapon.label,
              locked: Boolean(locks.weapon),
              onSetLock: () =>
                setLocks((currentLocks) => ({
                  ...currentLocks,
                  contestant: loadout.contestant,
                  weapon: currentLocks.weapon ? undefined : loadout.weapon,
                })),
              recentlyAdjusted: loadout.weapon.recentlyAdjusted,
              title: 'Weapon',
            },
            {
              description: loadout.gadgets[0]?.description,
              icon: <Fire size={16} />,
              id: loadout.gadgets[0]?.id,
              imageUrl: loadout.gadgets[0]?.imageUrl,
              label: loadout.gadgets[0]?.label,
              locked: locks.gadgets?.some(
                (gadget) => gadget.id === loadout.gadgets[0].id,
              ),
              onSetLock: () =>
                setLocks((currentLocks) => {
                  const position = 0;
                  const newGadget = { ...loadout.gadgets[position], position };

                  return {
                    ...currentLocks,
                    gadgets: currentLocks.gadgets?.some(
                      (gadget) => gadget.id === newGadget.id,
                    )
                      ? currentLocks.gadgets?.filter(
                          (gadget) => gadget.id !== newGadget.id,
                        )
                      : [...(currentLocks.gadgets ?? []), newGadget],
                  };
                }),
              recentlyAdjusted: loadout.gadgets[0]?.recentlyAdjusted,
              title: 'Gadget',
            },
            {
              description: loadout.gadgets[1]?.description,
              icon: <Fire size={16} />,
              id: loadout.gadgets[1]?.id,
              imageUrl: loadout.gadgets[1]?.imageUrl,
              label: loadout.gadgets[1]?.label,
              locked: locks.gadgets?.some(
                (gadget) => gadget.id === loadout.gadgets[1].id,
              ),
              onSetLock: () =>
                setLocks((currentLocks) => {
                  const position = 1;
                  const newGadget = { ...loadout.gadgets[position], position };

                  return {
                    ...currentLocks,
                    gadgets: currentLocks.gadgets?.some(
                      (gadget) => gadget.id === newGadget.id,
                    )
                      ? currentLocks.gadgets?.filter(
                          (gadget) => gadget.id !== newGadget.id,
                        )
                      : [...(currentLocks.gadgets ?? []), newGadget],
                  };
                }),
              recentlyAdjusted: loadout.gadgets[1]?.recentlyAdjusted,
              title: 'Gadget',
            },
            {
              description: loadout.gadgets[2]?.description,
              icon: <Fire size={16} />,
              id: loadout.gadgets[2]?.id,
              imageUrl: loadout.gadgets[2]?.imageUrl,
              label: loadout.gadgets[2]?.label,
              locked: locks.gadgets?.some(
                (gadget) => gadget.id === loadout.gadgets[2].id,
              ),
              onSetLock: () =>
                setLocks((currentLocks) => {
                  const position = 2;
                  const newGadget = { ...loadout.gadgets[position], position };

                  return {
                    ...currentLocks,
                    gadgets: currentLocks.gadgets?.some(
                      (gadget) => gadget.id === newGadget.id,
                    )
                      ? currentLocks.gadgets?.filter(
                          (gadget) => gadget.id !== newGadget.id,
                        )
                      : [...(currentLocks.gadgets ?? []), newGadget],
                  };
                }),
              recentlyAdjusted: loadout.gadgets[2]?.recentlyAdjusted,
              title: 'Gadget',
            },
          ]
        : [],
    [loadout, locks, setLocks],
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
              className="text-4xl md:text-7xl text-center w-full"
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

            {items.map((item) => {
              return (
                <ItemCard
                  key={`${item.id}-${item.title}`}
                  {...item}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      ) : null}
    </>
  );
};

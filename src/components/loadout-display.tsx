/* eslint-disable complexity */
import { ItemCard } from './item-card';
import { generateLoadoutName } from '@/lib/generate-loadout-name';
import { type Locks } from '@/lib/get-random-items';
import { type ContestantLoadout } from '@/lib/schema';
import { serializeLoadout } from '@/lib/serialize';
import {
  Check,
  Fire,
  MagicWand,
  Person,
  Sword,
  X,
} from '@phosphor-icons/react';
import { Dices } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const LoadoutDisplay = ({
  loadout,
  locks,
  onUpdateLoadoutName,
  setLocks,
}: {
  readonly loadout: ContestantLoadout;
  readonly locks?: Locks;
  readonly onUpdateLoadoutName?: (newName: string) => void;
  readonly setLocks?: Dispatch<SetStateAction<Locks>>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(loadout.loadoutName);
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
                locks?.specialization || locks?.weapon
                  ? 'Locking the weapon or specialization also locks the contestant.'
                  : '',
              locked: Boolean(locks?.contestant),
              onSetLock: setLocks
                ? () =>
                    setLocks((currentLocks) => ({
                      ...currentLocks,
                      contestant: currentLocks.contestant
                        ? undefined
                        : loadout.contestant,
                    }))
                : undefined,
              title: 'Contestant',
            },
            {
              description: loadout.specialization.description,
              icon: <MagicWand size={16} />,
              id: loadout.specialization.id,
              imageUrl: loadout.specialization.imageUrl,
              label: loadout.specialization.label,
              locked: Boolean(locks?.specialization),
              onSetLock: setLocks
                ? () =>
                    setLocks((currentLocks) => ({
                      ...currentLocks,
                      contestant: loadout.contestant,
                      specialization: currentLocks?.specialization
                        ? undefined
                        : loadout.specialization,
                    }))
                : undefined,
              recentlyAdjusted: loadout.specialization.recentlyAdjusted,
              title: 'Specialization',
            },
            {
              description: loadout.weapon.description,
              icon: <Sword size={16} />,
              id: loadout.weapon.id,
              imageUrl: loadout.weapon.imageUrl,
              label: loadout.weapon.label,
              locked: Boolean(locks?.weapon),
              onSetLock: setLocks
                ? () =>
                    setLocks((currentLocks) => ({
                      ...currentLocks,
                      contestant: loadout.contestant,
                      weapon: currentLocks?.weapon ? undefined : loadout.weapon,
                    }))
                : undefined,
              recentlyAdjusted: loadout.weapon.recentlyAdjusted,
              title: 'Weapon',
            },
            {
              description: loadout.gadgets[0]?.description,
              icon: <Fire size={16} />,
              id: loadout.gadgets[0]?.id,
              imageUrl: loadout.gadgets[0]?.imageUrl,
              label: loadout.gadgets[0]?.label,
              locked: locks?.gadgets?.some(
                (gadget) => gadget.id === loadout.gadgets[0].id,
              ),
              onSetLock: setLocks
                ? () =>
                    setLocks((currentLocks) => {
                      const position = 0;
                      const newGadget = {
                        ...loadout.gadgets[position],
                        position,
                      };

                      return {
                        ...currentLocks,
                        gadgets: currentLocks?.gadgets?.some(
                          (gadget) => gadget.id === newGadget.id,
                        )
                          ? currentLocks?.gadgets?.filter(
                              (gadget) => gadget.id !== newGadget.id,
                            )
                          : [...(currentLocks?.gadgets ?? []), newGadget],
                      };
                    })
                : undefined,
              recentlyAdjusted: loadout.gadgets[0]?.recentlyAdjusted,
              title: 'Gadget',
            },
            {
              description: loadout.gadgets[1]?.description,
              icon: <Fire size={16} />,
              id: loadout.gadgets[1]?.id,
              imageUrl: loadout.gadgets[1]?.imageUrl,
              label: loadout.gadgets[1]?.label,
              locked: locks?.gadgets?.some(
                (gadget) => gadget.id === loadout.gadgets[1].id,
              ),
              onSetLock: setLocks
                ? () =>
                    setLocks((currentLocks) => {
                      const position = 1;
                      const newGadget = {
                        ...loadout.gadgets[position],
                        position,
                      };

                      return {
                        ...currentLocks,
                        gadgets: currentLocks?.gadgets?.some(
                          (gadget) => gadget.id === newGadget.id,
                        )
                          ? currentLocks?.gadgets?.filter(
                              (gadget) => gadget.id !== newGadget.id,
                            )
                          : [...(currentLocks?.gadgets ?? []), newGadget],
                      };
                    })
                : undefined,
              recentlyAdjusted: loadout.gadgets[1]?.recentlyAdjusted,
              title: 'Gadget',
            },
            {
              description: loadout.gadgets[2]?.description,
              icon: <Fire size={16} />,
              id: loadout.gadgets[2]?.id,
              imageUrl: loadout.gadgets[2]?.imageUrl,
              label: loadout.gadgets[2]?.label,
              locked: locks?.gadgets?.some(
                (gadget) => gadget.id === loadout.gadgets[2].id,
              ),
              onSetLock: setLocks
                ? () =>
                    setLocks((currentLocks) => {
                      const position = 2;
                      const newGadget = {
                        ...loadout.gadgets[position],
                        position,
                      };

                      return {
                        ...currentLocks,
                        gadgets: currentLocks?.gadgets?.some(
                          (gadget) => gadget.id === newGadget.id,
                        )
                          ? currentLocks?.gadgets?.filter(
                              (gadget) => gadget.id !== newGadget.id,
                            )
                          : [...(currentLocks?.gadgets ?? []), newGadget],
                      };
                    })
                : undefined,
              recentlyAdjusted: loadout.gadgets[2]?.recentlyAdjusted,
              title: 'Gadget',
            },
          ]
        : [],
    [loadout, locks, setLocks],
  );

  useEffect(() => {
    setEditedName(loadout.loadoutName);
  }, [loadout.loadoutName, loadoutKey]);

  return (
    <>
      {items.length && loadout ? (
        <AnimatePresence mode="wait">
          <motion.div
            animate="animate"
            className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 max-w-80 md:max-w-3xl mt-10 mb-40"
            exit="initial"
            initial="initial"
            key="loadout-container"
            variants={{
              animate: { transition: { staggerChildren: 0.1 } },
              exit: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div
              animate="animate"
              className="relative w-full flex flex-row gap-2 items-center justify-center"
              exit="initial"
              initial="initial"
              key={loadout.loadoutName}
              variants={{
                animate: { opacity: 1, scale: 1 },
                initial: { opacity: 0, scale: 0 },
              }}
            >
              {isEditing ? (
                <div className="flex items-center justify-center gap-2 w-full">
                  <input
                    autoFocus
                    className="text-xl md:text-2xl w-full text-center bg-transparent border-b border-current focus:outline-none"
                    onChange={(event) => setEditedName(event.target.value)}
                    type="text"
                    value={editedName ?? ''}
                  />
                  <div className="flex gap-2">
                    <button
                      className="p-2 hover:text-green-500 transition-colors"
                      onClick={() => {
                        onUpdateLoadoutName?.(editedName ?? '');
                        setIsEditing(false);
                      }}
                      type="button"
                    >
                      <Check size={24} />
                    </button>
                    <button
                      className="p-2 hover:text-red-500 transition-colors"
                      onClick={() => {
                        setEditedName(loadout.loadoutName);
                        setIsEditing(false);
                      }}
                      type="button"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
              ) : (
                <h2
                  className="text-4xl md:text-7xl text-center w-max cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={
                    onUpdateLoadoutName ? () => setIsEditing(true) : undefined
                  }
                >
                  {loadout.loadoutName}
                </h2>
              )}
              {onUpdateLoadoutName ? (
                <button
                  className="bg-white/80 rounded-full p-4 flex items-center justify-center text-finals-black"
                  onClick={() => {
                    // re-roll name
                    const newName = generateLoadoutName(loadout);
                    onUpdateLoadoutName(newName);
                  }}
                  type="button"
                >
                  <Dices size={18} />
                </button>
              ) : null}
            </motion.div>
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

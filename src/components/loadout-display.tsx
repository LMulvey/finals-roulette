import { ItemCard } from './item-card';
import { generateLoadoutName } from '@/lib/generate-loadout-name';
import { type Locks } from '@/lib/get-random-items';
import {
  type ContestantClass,
  type ContestantGadget,
  type ContestantLoadout,
  type ContestantSpecialization,
  type ContestantWeapon,
} from '@/lib/schema';
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

type ContestantItem =
  | ContestantClass
  | ContestantGadget
  | ContestantSpecialization
  | ContestantWeapon;

const createBaseItem = (
  item: ContestantItem,
  title: string,
  icon: React.ReactNode,
) => ({
  description: item.description,
  icon,
  id: item.id,
  imageUrl: item.imageUrl,
  label: item.label,
  recentlyAdjusted:
    'recentlyAdjusted' in item ? item.recentlyAdjusted : undefined,
  title,
});

const createGadgetItem = (
  gadget: ContestantGadget,
  position: number,
  locks?: Locks,
  setLocks?: Dispatch<SetStateAction<Locks>>,
) => {
  const baseItem = createBaseItem(gadget, 'Gadget', <Fire size={16} />);

  return {
    ...baseItem,
    locked: locks?.gadgets?.some(
      (currentGadget) => currentGadget.id === gadget.id,
    ),
    onSetLock: setLocks
      ? () =>
          setLocks((currentLocks) => {
            const newGadget = { ...gadget, position };
            const hasGadget = currentLocks?.gadgets?.some(
              (currentGadget) => currentGadget.id === newGadget.id,
            );

            return {
              ...currentLocks,
              gadgets: hasGadget
                ? currentLocks?.gadgets?.filter(
                    (currentGadget) => currentGadget.id !== newGadget.id,
                  )
                : [...(currentLocks?.gadgets ?? []), newGadget],
            };
          })
      : undefined,
  };
};

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
              ...createBaseItem(
                loadout.contestant,
                'Contestant',
                <Person size={16} />,
              ),
              lockDisabled:
                locks?.specialization || locks?.weapon
                  ? 'Locking the weapon or specialization also locks the contestant.'
                  : '',
              locked: Boolean(
                locks?.contestant || locks?.specialization || locks?.weapon,
              ),
              onSetLock: setLocks
                ? () =>
                    setLocks((currentLocks) => ({
                      ...currentLocks,
                      contestant: currentLocks.contestant
                        ? undefined
                        : loadout.contestant,
                    }))
                : undefined,
            },
            {
              ...createBaseItem(
                loadout.specialization,
                'Specialization',
                <MagicWand size={16} />,
              ),
              locked: Boolean(locks?.specialization),
              onSetLock: setLocks
                ? () =>
                    setLocks((currentLocks) => ({
                      ...currentLocks,
                      specialization: currentLocks?.specialization
                        ? undefined
                        : loadout.specialization,
                    }))
                : undefined,
            },
            {
              ...createBaseItem(loadout.weapon, 'Weapon', <Sword size={16} />),
              locked: Boolean(locks?.weapon),
              onSetLock: setLocks
                ? () =>
                    setLocks((currentLocks) => ({
                      ...currentLocks,
                      weapon: currentLocks?.weapon ? undefined : loadout.weapon,
                    }))
                : undefined,
            },
            ...loadout.gadgets.map((gadget, index) =>
              createGadgetItem(gadget, index, locks, setLocks),
            ),
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

import { ItemCard } from '@/components/item-card';
import { heavyClass } from '@/lib/contestants/heavy';
import { lightClass } from '@/lib/contestants/light';
import { mediumClass } from '@/lib/contestants/medium';
import { cvu } from '@/lib/cvu';
import { getContestantMeta } from '@/lib/get-random-items';
import {
  type ContestantGadget,
  type ContestantSpecialization,
  type ContestantWeapon,
  type WeaponType,
} from '@/lib/schema';
import { Fire, MagicWand, Sword } from '@phosphor-icons/react';
import { useState } from 'react';

type SectionItem =
  | ContestantGadget
  | ContestantSpecialization
  | ContestantWeapon;

const CONTESTANTS = [lightClass, mediumClass, heavyClass];
const FILTER_OPTIONS = [
  'All',
  'Weapons',
  'Specializations',
  'Gadgets',
] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];

const WEAPON_TYPES = [
  'All Weapons',
  'Assault Rifle',
  'Grenade Launcher',
  'Handgun',
  'LMG',
  'Marksman Rifle',
  'Melee',
  'Shotgun',
  'SMG',
] as const;

const sectionClasses = cvu(
  'pb-6 border-b border-b-gray-500 last-of-type:border-b-0',
);
const filterButton = cvu('px-4 py-2 rounded-lg text-white', {
  variants: {
    active: {
      false: ['bg-gray-500 hover:bg-gray-300'],
      true: ['bg-finals-red text-white'],
    },
  },
});

export const Page = () => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [activeWeaponType, setActiveWeaponType] =
    useState<(typeof WEAPON_TYPES)[number]>('All Weapons');

  const getWeaponTypeId = (
    type: (typeof WEAPON_TYPES)[number],
  ): undefined | WeaponType => {
    const map: Record<(typeof WEAPON_TYPES)[number], undefined | WeaponType> = {
      'All Weapons': undefined,
      'Assault Rifle': 'assault-rifle',
      'Grenade Launcher': 'grenade-launcher',
      Handgun: 'handgun',
      LMG: 'lmg',
      'Marksman Rifle': 'marksman-rifle',
      Melee: 'melee',
      Shotgun: 'shotgun',
      SMG: 'smg',
    };
    return map[type];
  };

  const renderSection = (
    items: SectionItem[],
    title: string,
    Icon: typeof Sword,
    shouldShow: boolean,
  ) => {
    if (!shouldShow) return null;

    let filteredItems = items;
    if (title === 'Weapon' && activeWeaponType !== 'All Weapons') {
      const weaponTypeId = getWeaponTypeId(activeWeaponType);
      filteredItems = (items as ContestantWeapon[]).filter(
        (item) => item.type === weaponTypeId,
      );
    }

    return (
      <div className={title === 'Gadget' ? '' : sectionClasses()}>
        <div className="flex flex-row flex-wrap gap-2">
          {filteredItems.map((item) => (
            <ItemCard
              icon={<Icon size={16} />}
              key={item.id}
              title={title}
              {...item}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">All Classes</h1>

      {/* Filter Bar */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex gap-4">
          {FILTER_OPTIONS.map((filter) => (
            <button
              className={filterButton({ active: activeFilter === filter })}
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                if (filter !== 'Weapons') {
                  setActiveWeaponType('All Weapons');
                }
              }}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Weapon Type Filter */}
        {activeFilter === 'Weapons' && (
          <div className="flex flex-wrap gap-2">
            {WEAPON_TYPES.map((type) => (
              <button
                className={filterButton({ active: activeWeaponType === type })}
                key={type}
                onClick={() => setActiveWeaponType(type)}
                type="button"
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-8 mb-40">
        {CONTESTANTS.map((contestantClass) => {
          const meta = getContestantMeta(contestantClass.type);

          return (
            <div
              className="border rounded-lg p-6 shadow-sm"
              key={contestantClass.label}
            >
              <h2 className="text-2xl font-semibold mb-4">
                {contestantClass.label}
              </h2>

              <div className="flex flex-col gap-6">
                {renderSection(
                  meta.weapons,
                  'Weapon',
                  Sword,
                  activeFilter === 'All' || activeFilter === 'Weapons',
                )}
                {renderSection(
                  meta.specializations,
                  'Specialization',
                  MagicWand,
                  activeFilter === 'All' || activeFilter === 'Specializations',
                )}
                {renderSection(
                  meta.gadgets,
                  'Gadget',
                  Fire,
                  activeFilter === 'All' || activeFilter === 'Gadgets',
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

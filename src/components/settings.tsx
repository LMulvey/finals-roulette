import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  heavyClass,
  heavySpecializations,
  heavyWeapons,
} from '@/lib/contestants/heavy';
import {
  lightClass,
  lightSpecializations,
  lightWeapons,
} from '@/lib/contestants/light';
import {
  mediumClass,
  mediumSpecializations,
  mediumWeapons,
} from '@/lib/contestants/medium';
import { cvu } from '@/lib/cvu';
import { ALL_GADGETS } from '@/lib/gadgets';
import { type BaseItemType } from '@/lib/schema';
import { getSettings, saveSettings } from '@/lib/settings-storage';
import * as motion from 'motion/react-client';
import { useEffect, useState } from 'react';

const filterButton = cvu('px-4 py-2 rounded-lg text-white', {
  variants: {
    active: {
      false: ['bg-gray-500 hover:bg-gray-300'],
      true: ['bg-finals-red text-white'],
    },
  },
});

const FILTER_OPTIONS = [
  'All',
  'Weapons',
  'Specializations',
  'Gadgets',
  'Classes',
  'Disabled Equipment',
] as const;

type FilterOption = (typeof FILTER_OPTIONS)[number];

const getAllItems = (): BaseItemType[] => [
  ...ALL_GADGETS,
  ...heavyWeapons,
  ...mediumWeapons,
  ...lightWeapons,
  ...heavySpecializations,
  ...mediumSpecializations,
  ...lightSpecializations,
  heavyClass,
  mediumClass,
  lightClass,
];

export const Settings = () => {
  const [showEquipmentDescriptions, setShowEquipmentDescriptions] = useState(
    () => {
      const settings = getSettings();
      return settings.showEquipmentDescriptions;
    },
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [selectedItems, setSelectedItems] = useState<string[]>(() => {
    const settings = getSettings();
    return settings.disabledEquipmentIds;
  });

  // Save settings whenever they change
  useEffect(() => {
    saveSettings({
      disabledEquipmentIds: selectedItems,
      showEquipmentDescriptions,
    });
  }, [selectedItems, showEquipmentDescriptions]);

  const items = getAllItems();
  const filteredItems = items.filter((item) => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (
        !item?.label?.toLowerCase().includes(searchLower) &&
        !item?.description?.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    if (activeFilter === 'Weapons') {
      return 'type' in item && 'damageBodyMax' in item;
    }

    if (activeFilter === 'Specializations') {
      return (
        'classType' in item && !('type' in item) && !('healthPoints' in item)
      );
    }

    if (activeFilter === 'Gadgets') {
      return 'classType' in item && Array.isArray(item.classType);
    }

    if (activeFilter === 'Classes') {
      return 'healthPoints' in item;
    }

    if (activeFilter === 'Disabled Equipment') {
      return selectedItems.includes(item.id);
    }

    return true;
  });

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="p-8 max-w-4xl mx-auto pb-80"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="space-y-8">
        {/* General Settings */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-lg font-medium">
                Show Equipment Descriptions
              </label>
              <p className="text-gray-400">
                Display detailed, cheeky descriptions for equipment in loadouts
              </p>
            </div>
            <Switch
              checked={showEquipmentDescriptions}
              onCheckedChange={setShowEquipmentDescriptions}
            />
          </div>
        </div>

        {/* Equipment Selection */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="space-y-1 mb-4">
            <h2 className="text-xl font-semibold">Disabled Equipment</h2>
            <p className="text-gray-400">
              Use this to disable equipment from appearing in loadouts. Useful
              for disabling equipment you may not have unlocked with VRs or that
              you truly loathe.
            </p>
          </div>
          <div className="space-y-4">
            <Input
              className="w-full bg-gray-700"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search equipment..."
              value={searchTerm}
            />

            <div className="flex gap-2 flex-wrap">
              {FILTER_OPTIONS.map((filter) => (
                <button
                  className={filterButton({ active: activeFilter === filter })}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  type="button"
                >
                  {filter}
                </button>
              ))}
            </div>
            <button
              className="border border-finals-red text-finals-red px-4 py-2 rounded-lg"
              onClick={() => setSelectedItems([])}
              type="button"
            >
              Reset Disabled Equipment
            </button>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredItems.map((item) => (
                <div
                  className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
                  key={item.id}
                >
                  <input
                    checked={selectedItems.includes(item.id)}
                    id={item.id}
                    name={item.id}
                    onChange={() => {
                      setSelectedItems((current) =>
                        current.includes(item.id)
                          ? current.filter((id) => id !== item.id)
                          : [...current, item.id],
                      );
                    }}
                    type="checkbox"
                  />
                  <label htmlFor={item.id}>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

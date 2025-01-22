import { ItemCard } from '@/components/item-card';
import { heavyClass } from '@/lib/contestants/heavy';
import { lightClass } from '@/lib/contestants/light';
import { mediumClass } from '@/lib/contestants/medium';
import { getContestantMeta } from '@/lib/get-random-items';
import { Fire, MagicWand, Sword } from '@phosphor-icons/react';

const CONTESTANTS = [lightClass, mediumClass, heavyClass];

// ... existing imports ...

export const AllPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">All Classes</h1>
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
                {/* Weapons Section */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-red-600 flex items-center gap-2">
                    <Sword size={20} />
                    Weapons
                  </h3>
                  <div className="flex flex-row flex-wrap gap-2">
                    {meta.weapons.map((weapon) => (
                      <ItemCard
                        icon={<Sword size={16} />}
                        key={weapon.id}
                        title="Weapon"
                        {...weapon}
                      />
                    ))}
                  </div>
                </div>

                {/* Specializations Section */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-purple-600 flex items-center gap-2">
                    <MagicWand size={20} />
                    Specializations
                  </h3>
                  <div className="flex flex-row flex-wrap gap-2">
                    {meta.specializations.map((spec) => (
                      <ItemCard
                        icon={<MagicWand size={16} />}
                        key={spec.id}
                        title="Specialization"
                        {...spec}
                      />
                    ))}
                  </div>
                </div>

                {/* Gadgets Section */}
                <div>
                  <h3 className="text-lg font-medium mb-3 text-orange-600 flex items-center gap-2">
                    <Fire size={20} />
                    Gadgets
                  </h3>
                  <div className="flex flex-row flex-wrap gap-2">
                    {meta.gadgets.map((gadget) => (
                      <ItemCard
                        icon={<Fire size={16} />}
                        key={gadget.id}
                        title="Gadget"
                        {...gadget}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

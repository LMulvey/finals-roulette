import { ItemCard } from '@/components/item-card';
import { heavyClass } from '@/lib/contestants/heavy';
import { lightClass } from '@/lib/contestants/light';
import { mediumClass } from '@/lib/contestants/medium';
import { getContestantMeta } from '@/lib/get-random-items';
import { Fire, MagicWand, Sword } from '@phosphor-icons/react';

const CONTESTANTS = [lightClass, mediumClass, heavyClass];

export const AllPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">All Classes</h1>
      <div className="grid gap-8">
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

              <div className="flex flex-row flex-wrap gap-2">
                {/* Specializations */}
                {meta.specializations.map((spec) => (
                  <ItemCard
                    icon={<MagicWand size={16} />}
                    key={spec.id}
                    title="Specialization"
                    {...spec}
                  />
                ))}

                {/* Gadgets */}
                {meta.gadgets.map((gadget) => (
                  <ItemCard
                    icon={<Fire size={16} />}
                    key={gadget.id}
                    title="Gadget"
                    {...gadget}
                  />
                ))}

                {/* Weapons */}
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
          );
        })}
      </div>
    </div>
  );
};

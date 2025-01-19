import { ItemCard } from '@/components/item-card';
import { getRandomLoadout } from '@/lib/get-random-items';
import {
  type ContestantClass,
  type ContestantGadget,
  type ContestantSpecialization,
  type ContestantWeapon,
} from '@/lib/schema';
import { useMemo, useState } from 'react';

export const MainPage = () => {
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
  };

  const items = useMemo(
    () =>
      [
        {
          description: contestantClass?.description,
          id: 'contestant',
          imageUrl: contestantClass?.imageUrl,
          label: contestantClass?.label,
          ready: Boolean(contestantClass),
          title: 'Contestant',
        },
        {
          description: specialization?.description,
          id: 'specialization',
          imageUrl: specialization?.imageUrl,
          label: specialization?.label,
          ready: Boolean(specialization),
          title: 'Specialization',
        },
        {
          description: weapon?.description,
          id: 'weapon',
          imageUrl: weapon?.imageUrl,
          label: weapon?.label,
          ready: Boolean(weapon),
          title: 'Weapon',
        },
        {
          description: gadgetOne?.description,
          id: 'gadgetOne',
          imageUrl: gadgetOne?.imageUrl,
          label: gadgetOne?.label,
          ready: Boolean(gadgetOne),
          title: 'Gadget #1',
        },
        {
          description: gadgetTwo?.description,
          id: 'gadgetTwo',
          imageUrl: gadgetTwo?.imageUrl,
          label: gadgetTwo?.label,
          ready: Boolean(gadgetTwo),
          title: 'Gadget #2',
        },
        {
          description: gadgetThree?.description,
          id: 'gadgetOne',
          imageUrl: gadgetThree?.imageUrl,
          label: gadgetThree?.label,
          ready: Boolean(gadgetThree),
          title: 'Gadget #3',
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

  return (
    <main className="w-screen flex flex-col items-center justify-center mb-40">
      <button
        className="text-3xl bg-yellow-400 text-gray-800 font-bold hover:bg-yellow-300 transition-colors px-6 py-4 rounded-lg"
        onClick={onClickLoadout}
        type="button"
      >
        Roll your loadout
      </button>

      <div className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 max-w-80 md:max-w-3xl mt-10">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </main>
  );
};

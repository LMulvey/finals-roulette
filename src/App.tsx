import { Header } from './components/header';
import { getRandomLoadout } from './lib/get-random-items';
import {
  type ContestantClass,
  type ContestantGadget,
  type ContestantSpecialization,
  type ContestantWeapon,
} from './lib/schema';
import { useMemo, useState } from 'react';

const App = () => {
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
    <main className="w-screen flex flex-col items-center justify-center">
      <Header />
      <button
        className="text-3xl bg-yellow-400 text-gray-800 font-bold hover:bg-yellow-300 transition-colors px-6 py-4 rounded-lg"
        onClick={onClickLoadout}
        type="button"
      >
        Roll your loadout
      </button>

      <div className="w-full flex flex-col gap-4 max-w-80 lg:max-w-xl mt-10">
        {items.map((item) => (
          <div
            className="px-4 py-2 rounded-lg bg-gray-800 text-yellow-400 font-bold flex gap-4 items-center w-full"
            key={item.id}
          >
            {item.imageUrl ? (
              <img
                className="w-16 h-16 rounded-lg shadow-md border border-yellow-300"
                src={item.imageUrl}
              />
            ) : (
              <div className="w-16 h-16 rounded-lg shadow-md border border-yellow-300 bg-gray-600" />
            )}
            <div className="flex flex-col gap-1">
              <h2 className="text-xl">{item.title}</h2>
              <p className="text-lg">{item.label}</p>
              <p className="text-md italic text-white">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default App;

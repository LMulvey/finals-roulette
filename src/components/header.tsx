import { useRouter } from '@/hooks/useRouter';
import { cvu } from '@/lib/cvu';
import { Person, SelectionAll } from '@phosphor-icons/react';

const linkClasses = cvu(
  'hover:yellow-300 hover:cursor-pointer text-gray-500 text-4xl font-bold transition-colors flex flex-row items-center gap-2',
  {
    variants: {
      active: { true: ['text-yellow-300'] },
    },
  },
);

export const Header = () => {
  const router = useRouter();

  return (
    <header className="w-full max-w-2xl md:max-w-4xl p-8">
      <div className=" w-full flex flex-col md:flex-row items-center gap-12 text-white">
        <div className="flex flex-col gap-2">
          <img
            alt="THE FINALS logo"
            className="w-96"
            src="/images/logos/the-finals-logo-horizontal.crop.png"
          />
          <h3 className="text-3xl font-bold w-full text-left px-2 -skew-x-6 rounded-md bg-finals-red">
            Randomizer
          </h3>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-8 pt-8 border-t border-t-gray-500 md:pt-0 md:border-t-0 md:pl-12 md:border-l md:border-l-gray-500 w-full">
          <a
            className={linkClasses({ active: router.pathname === '/' })}
            onClick={() => router.push('/')}
          >
            <Person size={18} />
            Loadouts
          </a>
          <div className="w-[1px] h-full bg-gray-500" />
          <a
            className={linkClasses({ active: router.pathname === '/all' })}
            onClick={() => router.push('/all')}
          >
            <SelectionAll size={18} />
            All Builds
          </a>
        </div>
      </div>
    </header>
  );
};

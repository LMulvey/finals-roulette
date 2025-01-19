import { useRouter } from '@/hooks/useRouter';
import { cvu } from '@/lib/cvu';
// eslint-disable-next-line import/extensions
import finalsLogoHorizontal from 'public/images/logos/the-finals-logo-horizontal.crop.png';

const linkClasses = cvu(
  'hover:yellow-300 text-gray-500 text-3xl font-bold transition-colors',
  {
    variants: {
      active: { true: ['text-yellow-300'] },
    },
  },
);

export const Header = () => {
  const router = useRouter();

  return (
    <header className="w-full max-w-2xl md:max-w-6xl p-8 mb-10 pb-10">
      <div className=" w-full flex flex-col items-center gap-2 text-white">
        <img
          alt="THE FINALS logo"
          className="w-full"
          src={finalsLogoHorizontal}
        />
        <h2 className="italic text-4xl ml-4 text-left w-full">Roulette!</h2>
        <div className="flex flex-row gap-8 mt-4 pt-4 border-t border-t-gray-500 w-full">
          <a
            className={linkClasses({ active: router.pathname === '/' })}
            href="/"
            onClick={() => router.push('/')}
          >
            Loadouts
          </a>
          <div className="w-[1px] h-full bg-gray-500" />
          <a
            className={linkClasses({ active: router.pathname === '/all' })}
            href="/all"
            onClick={() => router.push('/all')}
          >
            All Builds
          </a>
        </div>
      </div>
    </header>
  );
};

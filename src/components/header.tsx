import { cvu } from '@/lib/cvu';
import {
  FloppyDiskBack,
  Gear,
  Person,
  SelectionAll,
} from '@phosphor-icons/react';
import { usePageContext } from 'vike-react/usePageContext';
import { navigate } from 'vike/client/router';

const NAV_ITEM_ICON_SIZE = 24;

const linkClasses = cvu(
  'hover:yellow-300 hover:cursor-pointer text-gray-500 text-3xl font-bold transition-colors flex flex-row items-center gap-2',
  {
    variants: {
      active: { true: ['text-yellow-300'] },
    },
  },
);

export const Header = () => {
  const pageContext = usePageContext();

  return (
    <header className="w-full p-8">
      <div className=" w-full flex flex-col md:flex-row items-center gap-12 text-white">
        <button
          className="flex flex-col gap-2"
          onClick={() => navigate('/')}
          type="button"
        >
          <img
            alt="THE FINALS logo"
            className="w-96"
            src="/images/logos/the-finals-logo-horizontal.crop.png"
          />
          <div className="flex flex-row items-center gap-2 h-[36px] w-full">
            <div className="text-3xl font-bold w-full text-left px-2 -skew-x-6 rounded-md bg-finals-red flex-grow">
              Roulette
            </div>
            <a
              className="text-xl text-finals-red font-bold w-full text-left px-2 -skew-x-6 rounded-md bg-finals-white whitespace-nowrap h-full flex items-center"
              href="https://www.reachthefinals.com/patchnotes/590"
              rel="noreferrer noopener"
              target="_blank"
            >
              Right on time with 5.9
            </a>
          </div>
        </button>
        <div className="flex flex-col gap-2 md:flex-row md:gap-8 pt-8 border-t border-t-gray-500 md:pt-0 md:border-t-0 md:pl-12 md:border-l md:border-l-gray-500 w-full">
          <a
            className={linkClasses({
              active:
                pageContext.urlPathname !== '/all' &&
                pageContext.urlPathname !== '/settings' &&
                !pageContext.urlPathname.includes('/saved'),
            })}
            onClick={() => navigate('/')}
          >
            <Person size={NAV_ITEM_ICON_SIZE} />
            Loadouts
          </a>
          <a
            className={linkClasses({
              active: pageContext.urlPathname.startsWith('/saved'),
            })}
            onClick={() => navigate('/saved')}
          >
            <FloppyDiskBack size={NAV_ITEM_ICON_SIZE} />
            Saved
          </a>
          <a
            className={linkClasses({
              active: pageContext.urlPathname === '/all',
            })}
            onClick={() => navigate('/all')}
          >
            <SelectionAll size={NAV_ITEM_ICON_SIZE} />
            Equipment
          </a>
          <a
            className={linkClasses({
              active: pageContext.urlPathname === '/settings',
            })}
            onClick={() => navigate('/settings')}
          >
            <Gear size={NAV_ITEM_ICON_SIZE} />
            Settings
          </a>
        </div>
      </div>
    </header>
  );
};

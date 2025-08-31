import { cvu } from '@/lib/cvu';
import { getMostRecentPatch } from '@/lib/patch-notes/patches';
import {
  FloppyDiskBack,
  Gear,
  Person,
  SelectionAll,
} from '@phosphor-icons/react';
import { NotebookPenIcon } from 'lucide-react';
import { useState } from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import { navigate } from 'vike/client/router';

const NAV_ITEM_ICON_SIZE = 18;

const linkClasses = cvu(
  'hover:yellow-300 hover:cursor-pointer text-gray-500 text-2xl font-bold transition-colors flex flex-row items-center gap-2',
  {
    variants: {
      active: { true: ['text-yellow-300'] },
    },
  },
);

export const Header = () => {
  const pageContext = usePageContext();
  const mostRecentPatch = getMostRecentPatch(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on navigation (mobile)
  const handleNav = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header className="w-full px-8 py-4 border-b border-b-finals-white/30">
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-8 text-white relative">
        <button
          className="flex flex-col gap-2"
          onClick={() => navigate('/')}
          type="button"
        >
          <img
            alt="THE FINALS logo"
            className="w-48 lg:w-72"
            src="/images/logos/the-finals-logo-horizontal.crop.png"
          />
          <div className="flex flex-row items-center gap-2 h-[26px] w-full">
            <div className="text-md flex items-center font-bold text-left px-2 -skew-x-6 rounded-md bg-secondary h-full">
              Roulette
            </div>
            {mostRecentPatch && (
              <a
                className="text-md text-background font-bold  text-left px-2 -skew-x-6 rounded-md bg-foreground whitespace-nowrap h-full flex items-center"
                href={mostRecentPatch.originalUrl}
                rel="noreferrer noopener"
                target="_blank"
              >
                {mostRecentPatch?.updatedNote ?? (
                  <>Updated for {mostRecentPatch.version}</>
                )}
              </a>
            )}
          </div>
        </button>

        {/* Hamburger button (mobile only) */}
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden absolute right-0 top-0 mt-2 mr-2 z-30 p-2"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span
            className="block w-7 h-1 bg-white rounded mb-1 transition-transform"
            style={{
              transform: menuOpen ? 'rotate(45deg) translateY(10px)' : 'none',
            }}
          />
          <span
            className={`block w-7 h-1 bg-white rounded mb-1 transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <span
            className="block w-7 h-1 bg-white rounded transition-transform"
            style={{
              transform: menuOpen ? 'rotate(-45deg) translateY(-10px)' : 'none',
            }}
          />
        </button>

        {/* Slide-out menu (mobile) and inline (desktop) */}
        <nav
          className={`
              fixed top-0 right-0 h-full w-64 bg-finals-black border-l border-l-finals-white/20 z-20 transform transition-transform duration-300 ease-in-out
              flex flex-col gap-2 pt-24 px-6 shadow-2xl
              ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
              lg:static lg:translate-0 lg:bg-transparent lg:border-0 lg:shadow-none lg:flex-row lg:gap-8 lg:pt-0 lg:px-0 lg:w-full lg:h-auto lg:top-auto lg:right-auto
            `}
        >
          <a
            className={linkClasses({
              active:
                pageContext.urlPathname !== '/all' &&
                pageContext.urlPathname !== '/settings' &&
                !pageContext.urlPathname.includes('/patches') &&
                !pageContext.urlPathname.includes('/saved'),
            })}
            onClick={() => handleNav('/')}
          >
            <Person size={NAV_ITEM_ICON_SIZE} />
            Loadouts
          </a>
          <a
            className={linkClasses({
              active: pageContext.urlPathname.startsWith('/saved'),
            })}
            onClick={() => handleNav('/saved')}
          >
            <FloppyDiskBack size={NAV_ITEM_ICON_SIZE} />
            Saved
          </a>
          <a
            className={linkClasses({
              active: pageContext.urlPathname === '/all',
            })}
            onClick={() => handleNav('/all')}
          >
            <SelectionAll size={NAV_ITEM_ICON_SIZE} />
            Equipment
          </a>
          <a
            className={linkClasses({
              active: pageContext.urlPathname.includes('/patches'),
            })}
            onClick={() => handleNav('/patches')}
          >
            <NotebookPenIcon size={NAV_ITEM_ICON_SIZE} />
            Patches
          </a>
          <a
            className={linkClasses({
              active: pageContext.urlPathname === '/settings',
            })}
            onClick={() => handleNav('/settings')}
          >
            <Gear size={NAV_ITEM_ICON_SIZE} />
            Settings
          </a>
        </nav>
        {/* Overlay for mobile menu */}
        {menuOpen && (
          <div
            aria-hidden="true"
            className="fixed inset-0 bg-finals-black/20 backdrop-blur-lg animate-fade-in z-10 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

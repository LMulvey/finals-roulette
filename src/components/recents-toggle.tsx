import { getRecentLoadouts } from '../lib/recents-storage';
import { serializeLoadout } from '../lib/serialize';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Rewind } from '@phosphor-icons/react';
import { PopoverClose } from '@radix-ui/react-popover';
import * as motion from 'motion/react-client';

export const RecentsToggle = () => {
  const recents = getRecentLoadouts();

  if (!recents.length) {
    return null;
  }

  return (
    <Popover>
      <motion.div
        animate="animate"
        initial="initial"
        variants={{
          animate: { opacity: 1 },
          initial: { opacity: 0 },
        }}
      >
        <PopoverTrigger className="flex h-full flex-row items-center gap-2 text-lg bg-gray-600 text-finals-white font-bold hover:bg-gray-500 transition-colors px-4 py-2 rounded-lg uppercase italic">
          <Rewind
            size={24}
            weight="fill"
          />
        </PopoverTrigger>
      </motion.div>
      <PopoverContent className="border-none font-sans w-80 p-2">
        <h1 className="text-xl mb-1 pl-2">Recent Builds</h1>
        <div className="flex flex-col gap-1">
          {recents.map((recentLoadout) => {
            const currentLoadoutKey = serializeLoadout(recentLoadout);

            return (
              <PopoverClose
                asChild
                key={currentLoadoutKey}
              >
                <a
                  className="text-xs text-white hover:bg-white/20 rounded-md px-2 py-1"
                  href={`/${currentLoadoutKey}`}
                >
                  {recentLoadout.loadoutName}
                </a>
              </PopoverClose>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

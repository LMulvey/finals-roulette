import { getRecentLoadouts } from './recents-storage';
import { serializeLoadout } from './serialize';
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
        <PopoverTrigger className="h-16 flex flex-row items-center gap-2 text-lg bg-gray-600 text-finals-white font-bold hover:bg-gray-500 transition-colors px-4 py-2 rounded-lg uppercase italic">
          <Rewind
            size={24}
            weight="fill"
          />
        </PopoverTrigger>
      </motion.div>
      <PopoverContent className="border-none font-sans w-84">
        <h1 className="text-3xl">Recents Builds</h1>
        <div className="flex flex-col gap-2">
          {recents.map((recentLoadout) => {
            const currentLoadoutKey = serializeLoadout(recentLoadout);

            return (
              <PopoverClose
                asChild
                key={currentLoadoutKey}
              >
                <a
                  className="text-md text-white"
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

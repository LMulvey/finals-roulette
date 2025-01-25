import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { cvu } from '@/lib/cvu';
import { type PatchNotes } from '@/lib/schema';
import {
  ArrowFatDown,
  ArrowFatUp,
  LinkSimple,
  LockSimple,
  TriangleDashed,
} from '@phosphor-icons/react';
import { LockIcon, UnlockIcon } from 'lucide-react';
import * as motion from 'motion/react-client';
import { type ReactNode, type Ref } from 'react';

export type Item = {
  description?: string;
  icon: ReactNode;
  id: string;
  imageUrl?: string;
  label?: string;
  recentlyAdjusted?: PatchNotes;
  title: string;
};

const getFriendlyAdjustmentType = (
  adjustmentType: PatchNotes['adjustmentType'],
) => {
  switch (adjustmentType) {
    case 'buff':
      return 'Buffed';
    case 'nerf':
      return 'Nerfed';
    case 'neutral':
    default:
      return 'Adjusted (neutral)';
  }
};

const triggerClass = cvu('bg-finals-red p-2 rounded-full text-white', {
  variants: {
    type: {
      buff: ['bg-green-700'],
      nerf: ['bg-finals-red'],
      neutral: ['bg-gray-800'],
    },
  },
});

const lockButton = cvu(
  'rounded-full p-2 hover:bg-white/90 flex items-center justify-center bg-white/60 text-finals-black',
);

export const ItemCard = (
  item: Item & {
    lockDisabled?: string;
    locked?: boolean;
    onSetLock?: () => void;
    ref?: Ref<HTMLDivElement>;
  },
) => {
  const lockIcon = (
    <>{item.locked ? <LockIcon size={18} /> : <UnlockIcon size={18} />}</>
  );

  return (
    <motion.div
      className="rounded-lg bg-gray-800 text-yellow-400 font-bold flex md:flex-col gap-4 items-center w-full md:w-60 h-60 bg-cover bg-no-repeat"
      key={item.id}
      ref={item.ref}
      style={{ backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : '' }}
      variants={{
        animate: { opacity: 1, scale: 1 },
        initial: { opacity: 0, scale: 0 },
      }}
    >
      <div className="flex flex-col justify-between gap-1 p-6 bg-finals-black/70 h-full w-full">
        <div className="flex flex-row items-center justify-between w-full gap-2">
          <div className="text-md text-yellow-400 flex flex-row items-center gap-2  px-2 py-1 w-full bg-gray-800 rounded-md">
            {item.icon}
            {item.title}
          </div>
          {item.recentlyAdjusted ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  className={triggerClass({
                    type: item.recentlyAdjusted.adjustmentType,
                  })}
                >
                  {item.recentlyAdjusted.adjustmentType === 'neutral' && (
                    <TriangleDashed
                      size={18}
                      weight="fill"
                    />
                  )}
                  {item.recentlyAdjusted.adjustmentType === 'buff' && (
                    <ArrowFatUp
                      size={18}
                      weight="fill"
                    />
                  )}
                  {item.recentlyAdjusted.adjustmentType === 'nerf' && (
                    <ArrowFatDown
                      size={18}
                      weight="fill"
                    />
                  )}
                </TooltipTrigger>
                <TooltipContent
                  className="w-64 space-y-3"
                  side="bottom"
                >
                  <p className="text-lg">
                    Recently{' '}
                    {getFriendlyAdjustmentType(
                      item.recentlyAdjusted.adjustmentType,
                    )}
                  </p>
                  <p className="text-md font-normal font-sans">
                    {item.recentlyAdjusted.note}
                  </p>
                  <a
                    className="flex flex-row items-center gap-2 text-white text-md"
                    href={item.recentlyAdjusted.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <LinkSimple
                      size={16}
                      weight="fill"
                    />
                    Patch Notes
                  </a>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
          {item.onSetLock ? (
            <>
              {item.lockDisabled ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className={lockButton()}>
                      <LockSimple
                        size={18}
                        weight="fill"
                      />
                    </TooltipTrigger>
                    <TooltipContent
                      className="w-64 space-y-3"
                      side="bottom"
                    >
                      <p className="text-lg">Item Auto-Locked!</p>
                      <p className="text-md font-normal font-sans">
                        {item.lockDisabled}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <button
                  className={lockButton()}
                  onClick={() => item.onSetLock?.()}
                  type="button"
                >
                  {lockIcon}
                </button>
              )}
            </>
          ) : null}
        </div>
        <div className="space-y-2 h-28">
          <p className="text-xl">{item.label}</p>
          <p className="text-xs font-sans font-medium text-white line-clamp-4 text-ellipsis">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

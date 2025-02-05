import { cn } from '@/lib/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';
import { createContext, useMemo } from 'react';

type TooltipTriggerContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const useHasHover = () => {
  try {
    return matchMedia('(hover: hover)').matches;
  } catch {
    // Assume that if browser too old to support matchMedia it's likely not a touch device
    return true;
  }
};

const TooltipTriggerContext = createContext<TooltipTriggerContextType>({
  open: false,
  setOpen: () => {},
});

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip: React.FC<TooltipPrimitive.TooltipProps> = ({
  children,
  ...props
}) => {
  const [open, setOpen] = React.useState<boolean>(props.defaultOpen ?? false);

  // we only want to enable the "click to open" functionality on mobile
  const isMd = useHasHover();
  const value = useMemo(() => ({ open, setOpen }), [open, setOpen]);

  return (
    <TooltipPrimitive.Root
      delayDuration={isMd ? props.delayDuration : 0}
      onOpenChange={(event) => {
        setOpen(event);
      }}
      open={open}
    >
      <TooltipTriggerContext.Provider value={value}>
        {children}
      </TooltipTriggerContext.Provider>
    </TooltipPrimitive.Root>
  );
};

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ children, ...props }, ref) => {
  const isMd = useHasHover();
  const { setOpen } = React.useContext(TooltipTriggerContext);

  return (
    <TooltipPrimitive.Trigger
      ref={ref}
      {...props}
      onClick={(event) => {
        if (!isMd) {
          event.preventDefault();
        }

        setOpen(true);
      }}
    >
      {children}
    </TooltipPrimitive.Trigger>
  );
});

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    className={cn(
      'z-50 overflow-hidden rounded-md text-white px-3 py-1.5 text-sm bg-gray-800 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50',
      className,
    )}
    ref={ref}
    sideOffset={sideOffset}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };

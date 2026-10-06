"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { createContext, useMemo } from "react";
import { cn } from "#utils";

type TooltipTriggerContextType = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const useHasHover = () => {
	try {
		return matchMedia("(hover: hover)").matches;
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

	// we only want to enable the 'click to open' functionality on mobile
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
	// Portaled so tooltips escape clipped/isolated parents (e.g. notched cards).
	<TooltipPrimitive.Portal>
		<TooltipPrimitive.Content
			className={cn(
				"z-50 max-w-72 origin-(--radix-tooltip-content-transform-origin) overflow-hidden rounded-md border border-line-strong bg-arena-top px-3 py-2 text-sm text-ink shadow-[0_12px_32px_-12px_rgb(0_0_0/0.7)] animate-in fade-in-0 zoom-in-95 duration-150 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
				className,
			)}
			ref={ref}
			sideOffset={sideOffset}
			{...props}
		/>
	</TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };

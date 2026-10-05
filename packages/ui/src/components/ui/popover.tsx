"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";
import { cn } from "#utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverClose = PopoverPrimitive.Close;

const PopoverContent = React.forwardRef<
	React.ElementRef<typeof PopoverPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ align = "center", className, sideOffset = 4, ...props }, ref) => (
	<PopoverPrimitive.Portal>
		<PopoverPrimitive.Content
			align={align}
			className={cn(
				"z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border border-line-strong bg-arena-high p-4 text-ink shadow-[0_16px_40px_-12px_rgb(0_0_0/0.7)] outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:duration-150 data-[state=closed]:duration-100",
				className,
			)}
			ref={ref}
			sideOffset={sideOffset}
			{...props}
		/>
	</PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverClose, PopoverContent, PopoverTrigger };

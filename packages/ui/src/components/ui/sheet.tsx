"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { cn } from "#utils";

const Sheet = DialogPrimitive.Root;

const SheetTrigger = DialogPrimitive.Trigger;

const SheetClose = DialogPrimitive.Close;

const SheetTitle = DialogPrimitive.Title;

const SheetDescription = DialogPrimitive.Description;

const SheetOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Overlay
		className={cn(
			"fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			className,
		)}
		ref={ref}
		{...props}
	/>
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

/** Bottom sheet on phones, right-hand drawer from `md` up. Children own their own scrolling layout. */
const SheetContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<DialogPrimitive.Portal>
		<SheetOverlay />
		<DialogPrimitive.Content
			className={cn(
				"fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col border-t-2 border-t-broadcast bg-arena-high text-ink shadow-[0_-24px_60px_-16px_rgb(0_0_0/0.8)] duration-300 ease-snap data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
				"md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[420px] md:border-t-0 md:border-l-2 md:border-l-broadcast md:data-[state=closed]:slide-out-to-right md:data-[state=open]:slide-in-from-right md:data-[state=closed]:[--tw-exit-translate-y:0] md:data-[state=open]:[--tw-enter-translate-y:0]",
				className,
			)}
			ref={ref}
			{...props}
		>
			{children}
		</DialogPrimitive.Content>
	</DialogPrimitive.Portal>
));
SheetContent.displayName = DialogPrimitive.Content.displayName;

export {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
};

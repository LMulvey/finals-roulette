"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as React from "react";
import { cn } from "#utils";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Overlay
		className={cn(
			"fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			className,
		)}
		{...props}
		ref={ref}
	/>
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
	<AlertDialogPortal>
		<AlertDialogOverlay />
		<AlertDialogPrimitive.Content
			className={cn(
				"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-5 border-t-2 border-t-broadcast bg-arena-high p-6 text-ink shadow-[0_24px_60px_-16px_rgb(0_0_0/0.8)] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-w-md",
				className,
			)}
			ref={ref}
			{...props}
		/>
	</AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"flex flex-col space-y-2 text-center sm:text-left",
			className,
		)}
		{...props}
	/>
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
			className,
		)}
		{...props}
	/>
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Title
		className={cn(
			"font-heading text-2xl font-extrabold uppercase italic text-ink",
			className,
		)}
		ref={ref}
		{...props}
	/>
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Description
		className={cn("font-sans text-base text-ink-soft", className)}
		ref={ref}
		{...props}
	/>
));
AlertDialogDescription.displayName =
	AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Action>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Action
		className={cn(
			"press inline-flex h-10 items-center justify-center rounded-md bg-broadcast px-5 font-heading text-lg font-extrabold uppercase italic text-ink transition-colors hover:bg-nerf",
			className,
		)}
		ref={ref}
		{...props}
	/>
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Cancel
		className={cn(
			"press inline-flex h-10 items-center justify-center rounded-md px-5 font-heading text-lg font-extrabold uppercase italic text-ink-soft transition-colors hover:bg-arena-top hover:text-ink",
			className,
		)}
		ref={ref}
		{...props}
	/>
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogTitle,
	AlertDialogTrigger,
};

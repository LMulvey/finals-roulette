"use client";

import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "#utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Viewport>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Viewport
		className={cn(
			"fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
			className,
		)}
		ref={ref}
		{...props}
	/>
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
	"group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border-l-4 p-5 pr-8 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.8)] transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full sm:data-[state=open]:slide-in-from-bottom-full",
	{
		defaultVariants: {
			variant: "default",
		},
		variants: {
			variant: {
				default: "border-l-cashout bg-arena-top text-ink",
				destructive:
					"destructive group border-red-500 bg-red-500 text-gray-50 dark:border-red-900 dark:bg-red-900 dark:text-gray-50",
			},
		},
	},
);

const Toast = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
		VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
	return (
		<ToastPrimitives.Root
			className={cn(toastVariants({ variant }), className)}
			ref={ref}
			{...props}
		/>
	);
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Action>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Action
		className={cn(
			"inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-transparent px-3 text-sm font-medium ring-offset-white transition-colors hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-gray-100/40 hover:group-[.destructive]:border-red-500/30 hover:group-[.destructive]:bg-red-500 hover:group-[.destructive]:text-gray-50 focus:group-[.destructive]:ring-red-500 dark:border-gray-800 dark:ring-offset-gray-950 dark:hover:bg-gray-800 dark:focus:ring-gray-300 dark:group-[.destructive]:border-gray-800/40 dark:hover:group-[.destructive]:border-red-900/30 dark:hover:group-[.destructive]:bg-red-900 dark:hover:group-[.destructive]:text-gray-50 dark:focus:group-[.destructive]:ring-red-900",
			className,
		)}
		ref={ref}
		{...props}
	/>
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Close>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Close
		className={cn(
			"absolute right-2 top-2 rounded-md p-1 text-ink-faint opacity-0 transition-opacity hover:text-ink focus:opacity-100 focus:outline-hidden focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 hover:group-[.destructive]:text-red-50 focus:group-[.destructive]:ring-red-400 focus:group-[.destructive]:ring-offset-red-600 dark:text-gray-50/50 dark:hover:text-gray-50",
			className,
		)}
		ref={ref}
		toast-close=""
		{...props}
	>
		<X className="h-4 w-4" />
	</ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Title>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Title
		className={cn("text-md font-sans font-semibold", className)}
		ref={ref}
		{...props}
	/>
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Description>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Description
		className={cn("text-md font-sans opacity-90", className)}
		ref={ref}
		{...props}
	/>
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

export {
	Toast,
	ToastAction,
	type ToastActionElement,
	ToastClose,
	ToastDescription,
	type ToastProps,
	ToastProvider,
	ToastTitle,
	ToastViewport,
};

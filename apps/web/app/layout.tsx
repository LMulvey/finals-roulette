import { Toaster } from "@repo/ui/toaster";
import type { Metadata } from "next";
import { Saira_Condensed, Saira_Extra_Condensed } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const sairaCondensed = Saira_Condensed({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	variable: "--font-saira-condensed",
});

const sairaExtraCondensed = Saira_Extra_Condensed({
	subsets: ["latin"],
	weight: ["600", "700", "800"],
	display: "swap",
	variable: "--font-saira-extra-condensed",
});

export const metadata: Metadata = {
	title: {
		default: "THE FINALS Roulette",
		template: "%s · THE FINALS Roulette",
	},
	description:
		"Randomized loadout generator for THE FINALS. Roll, lock, swap and share builds for Light, Medium and Heavy.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${sairaCondensed.variable} ${sairaExtraCondensed.variable} flex min-h-screen flex-col bg-arena text-ink`}
			>
				<Header />
				<main className="flex grow flex-col">{children}</main>
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}

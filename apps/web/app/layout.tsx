import { Toaster } from "@repo/ui/toaster";
import type { Metadata } from "next";
import { Saira_Condensed, Saira_Extra_Condensed } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const sairaCondensed = Saira_Condensed({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	display: "swap",
	variable: "--font-saira-condensed",
});

const sairaExtraCondensed = Saira_Extra_Condensed({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	display: "swap",
	variable: "--font-saira-extra-condensed",
});

export const metadata: Metadata = {
	title: "THE FINALS Roulette",
	description: "Randomized loadout generator for THE FINALS.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${sairaCondensed.variable} ${sairaExtraCondensed.variable} bg-finals-black text-finals-white min-h-screen`}
			>
				<div className="relative min-h-screen pb-44">
					<Header />
					{children}
					<Footer />
					<Toaster />
				</div>
			</body>
		</html>
	);
}

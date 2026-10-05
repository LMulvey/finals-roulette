/** @type {import('next').NextConfig} */
const nextConfig = {
	// The OG image route reads fonts and equipment art from disk.
	outputFileTracingIncludes: {
		"/\\[loadout\\]/og": ["./assets/fonts/**", "./public/images/**"],
	},
};

export default nextConfig;

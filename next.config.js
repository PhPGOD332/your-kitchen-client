/** @type {import('next').NextConfig} */

const NEXT_PUBLIC_API_HOSTNAME = process.env.NEXT_PUBLIC_API_HOSTNAME;

const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	reactStrictMode: false,
	images: {
		domains: [NEXT_PUBLIC_API_HOSTNAME],
	},
	swcMinify: true,
	optimizeCss: true
};

module.exports = nextConfig;

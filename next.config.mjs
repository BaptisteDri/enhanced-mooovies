/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.themoviedb.org",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "image.tmdb.org",
				port: "",
				pathname: "/**",
			},
		],
	},
}

export default nextConfig

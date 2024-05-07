/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		domains: ["www.themoviedb.org", "image.tmdb.org"],
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

import type { Config } from "tailwindcss"

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/design-system/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			animation: {
				marquee: "marquee 50s linear infinite",
				marquee2: "marquee2 50s linear infinite",
				"reverse-marquee": "reverseMarquee 50s linear infinite",
				"reverse-marquee2": "reverseMarquee2 50s linear infinite",
			},
			keyframes: {
				marquee: {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(-100%)" },
				},
				marquee2: {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0%)" },
				},
				reverseMarquee: {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(100%)" },
				},
				reverseMarquee2: {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0%)" },
				},
			},
		},
	},
	plugins: [],
}
export default config

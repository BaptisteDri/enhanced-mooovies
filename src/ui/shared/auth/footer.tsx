import Link from "next/link"
import { twMerge } from "tailwind-merge"

export const Footer = () => (
	<footer
		className={twMerge(
			"space-x-4 md:space-x-6 text-gray-500 text-xs md:text-sm",
			"*:transition-opacity *:duration-150",
		)}
	>
		<Link
			href="/conditions-generales-d-utilisation"
			className="hover:opacity-80"
		>
			CGU
		</Link>
		<Link href="/politique-de-confidentialite" className="hover:opacity-80">
			Politique de Confidentialité
		</Link>
		<a
			href={"https://www.themoviedb.org/"}
			target="_blank"
			rel="noreferrer"
			className="hover:opacity-80"
		>
			TMDB
		</a>
	</footer>
)

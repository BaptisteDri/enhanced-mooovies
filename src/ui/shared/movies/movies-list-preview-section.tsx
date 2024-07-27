import { PlusCircle } from "@/design-system/icons/plus-circle"
import { MovieCard } from "@/design-system/movie-card"
import Link from "next/link"

type Props = {
	href: string
	title: string
	movies: { poster: string; title: string }[]
}

export const MoviesListPreviewSection = ({ href, title, movies }: Props) => (
	<section className="space-y-4">
		<Link href={href} className="px-4 flex justify-between items-baseline">
			<h2 className="font-medium text-xl">{title}</h2>
			<span className="text-xs text-gray-400">voir plus</span>
		</Link>
		<div className="flex gap-4 overflow-x-auto no-scrollbar px-4">
			{movies.map(({ poster, title }, i) => (
				<MovieCard
					poster={poster}
					title={title}
					key={i}
					className={"min-w-[33vw]"}
				/>
			))}
			{movies.length === 0 && (
				<Link
					href="/recherche"
					className="rounded-md aspect-[2/3] bg-gray-900 min-w-[33vw] flex items-center justify-center flex-col gap-2 text-sm text-slate-300"
				>
					<PlusCircle size={24} />
					Ajouter un film
				</Link>
			)}
		</div>
	</section>
)

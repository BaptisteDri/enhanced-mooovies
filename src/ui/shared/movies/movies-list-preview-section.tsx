import { MovieCard } from "@/design-system/movie-card"
import Link from "next/link"

type Props = {
	href: string
	title: string
}

const MOVIES = Array(10).fill({
	poster: "/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg",
	title: "Oppenheimer",
})

export const MoviesListPreviewSection = ({ href, title }: Props) => (
	<section className="space-y-4">
		<Link href={href} className="px-4 flex justify-between items-baseline">
			<h2 className="font-medium text-xl">{title}</h2>
			<span className="text-xs text-gray-400">voir plus</span>
		</Link>
		<div className="flex gap-4 overflow-x-auto no-scrollbar px-4">
			{MOVIES.map(({ poster, title }, i) => (
				<MovieCard
					poster={poster}
					title={title}
					key={i}
					className={"min-w-[33vw]"}
				/>
			))}
		</div>
	</section>
)

import { DiscoverMovie } from "@/core/discover/discover-movies"
import { MovieCard } from "@/design-system/movie-card"
import { twMerge } from "tailwind-merge"

type Props = {
	movies: DiscoverMovie[]
	reverse?: boolean
}

export const Marquee = ({ movies, reverse }: Props) => (
	<div className="flex relative">
		<div
			className={twMerge(
				"w-full grid grid-cols-4 gap-4 pl-4",
				reverse ? "animate-reverse-marquee" : "animate-marquee",
			)}
		>
			{movies.map(({ poster_path, title, id }) => (
				<MovieCard
					poster={poster_path}
					title={title}
					key={id}
					clickable={false}
				/>
			))}
		</div>
		<div
			className={twMerge(
				"w-full absolute top-0 grid grid-cols-4 gap-4 pl-4",
				reverse ? "animate-reverse-marquee2" : "animate-marquee2",
			)}
		>
			{movies.map(({ poster_path, title, id }) => (
				<MovieCard
					poster={poster_path}
					title={title}
					key={id}
					clickable={false}
				/>
			))}
		</div>
	</div>
)

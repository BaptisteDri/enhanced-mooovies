import Image from "next/image"
import { twMerge } from "tailwind-merge"
import { MovieDrawer } from "@/design-system/movie-drawer"
import { Movie } from "@/core/movies/types/movie"
import { DiscoverMovie } from "@/core/discover/discover-movies"

type Props = {
	movie: ({ type: "movie" } & Movie) | ({ type: "discover" } & DiscoverMovie)
	className?: string
	clickable?: boolean
}

export const MovieCard = ({ movie, className, clickable = true }: Props) =>
	clickable ? (
		<MovieDrawer movie={movie} className={className} />
	) : (
		<div
			className={twMerge(
				"relative overflow-hidden rounded-md aspect-[2/3] flex bg-gray-900",
				className,
			)}
			role={clickable ? "button" : undefined}
		>
			<Image
				src={`https://image.tmdb.org/t/p/w342/${movie.type === "discover" ? movie.poster_path : movie.poster}`}
				alt={`${movie.title} poster`}
				fill
				className="object-cover object-center"
				sizes="300px"
				priority
			/>
		</div>
	)

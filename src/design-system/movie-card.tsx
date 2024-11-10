import Image from "next/image"
import { twMerge } from "tailwind-merge"
import { Movie } from "@/core/movies/types/movie"
import { DiscoverMovie } from "@/core/discover/discover-movies"

type Props = {
	movie: ({ type: "movie" } & Movie) | ({ type: "discover" } & DiscoverMovie)
	className?: string
	sizes?: string
	setSelectedMovie?: (id: number) => void
}

export const MovieCard = ({
	movie,
	className,
	setSelectedMovie,
	sizes = "300px",
}: Props) =>
	!!setSelectedMovie ? (
		<button
			className={twMerge(
				"relative overflow-hidden rounded-md aspect-[2/3] flex bg-gray-900",
				className,
			)}
			onClick={() =>
				movie.type === "discover"
					? setSelectedMovie(movie.id)
					: setSelectedMovie(movie.tmdb_id)
			}
		>
			<Image
				src={`https://image.tmdb.org/t/p/w342/${movie.type === "discover" ? movie.poster_path : movie.poster}`}
				alt={`${movie.title} poster`}
				fill
				className="object-cover object-center"
				sizes="300px"
				priority
			/>
		</button>
	) : (
		<div
			className={twMerge(
				"relative overflow-hidden rounded-md aspect-[2/3] flex bg-gray-900",
				className,
			)}
		>
			<Image
				src={`https://image.tmdb.org/t/p/w342/${movie.type === "discover" ? movie.poster_path : movie.poster}`}
				alt={`${movie.title} poster`}
				fill
				className="object-cover object-center"
				sizes={sizes}
				priority
			/>
		</div>
	)

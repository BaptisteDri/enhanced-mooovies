import { DiscoverMovie } from "@/core/discover/discover-movies"
import { Movie } from "@/core/movies/types/movie"
import Image from "next/image"

type Props = {
	movie: ({ type: "movie" } & Movie) | ({ type: "discover" } & DiscoverMovie)
}

export const DrawerPoster = ({ movie }: Props) => {
	return (
		<section className="relative aspect-[2/3] flex bg-gray-900 w-32 mb-6">
			<Image
				src={`https://image.tmdb.org/t/p/w342/${movie.type === "discover" ? movie.poster_path : movie.poster}`}
				alt={`${movie.title} poster`}
				fill
				className="object-cover object-top blur-3xl"
				sizes="128px"
			/>
			<Image
				src={`https://image.tmdb.org/t/p/w342/${movie.type === "discover" ? movie.poster_path : movie.poster}`}
				alt={`${movie.title} poster`}
				fill
				className="object-cover object-top rounded-md"
				sizes="128px"
			/>
		</section>
	)
}

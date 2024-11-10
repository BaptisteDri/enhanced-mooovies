import { DiscoverMovie } from "@/core/discover/discover-movies"
import { Movie } from "@/core/movies/types/movie"

export type CommonMovie =
	| ({ type: "movie" } & Movie)
	| ({ type: "discover" } & DiscoverMovie)

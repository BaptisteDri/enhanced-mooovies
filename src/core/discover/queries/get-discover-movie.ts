import { discoverMovies } from "@/core/discover/infrastructure/discover-movies.api"

type Options = {
	enabled?: boolean
	retry?: boolean | false
	id: number
}

export const GET_TMDB_MOVIE_KEY = "GET_TMDB_MOVIE"

export const getTMDBMovie = ({ enabled = false, retry, id }: Options) => ({
	queryKey: [GET_TMDB_MOVIE_KEY, id],
	queryFn: async () => await discoverMovies.getMovie(id),
	enabled,
	retry,
})

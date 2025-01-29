import { discoverMovies } from "@/core/discover/infrastructure/discover-movies.api"

type Options = {
	enabled?: boolean
	retry?: boolean | false
	id: number
}

export const GET_TMDB_MOVIE_CREDITS_KEY = "GET_TMDB_MOVIE_CREDITS"

export const getTMDBMovieCredits = ({
	enabled = false,
	retry,
	id,
}: Options) => ({
	queryKey: [GET_TMDB_MOVIE_CREDITS_KEY, id],
	queryFn: async () => await discoverMovies.getMovieCredits(id),
	enabled,
	retry,
})

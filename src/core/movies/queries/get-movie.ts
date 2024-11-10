import { movies } from "@/core/movies/infrastructure/movies.supabase"

type Options = {
	uuid?: string
	enabled?: boolean
}

export const GET_MOVIE_KEY = "GET-MOVIE"

export const getMovie = ({ enabled = false, uuid }: Options) => ({
	queryKey: [GET_MOVIE_KEY, uuid],
	queryFn: async () => await movies.getMovie(uuid),
	enabled,
})

import {
	GetMovieDto,
	movies,
} from "@/core/movies/infrastructure/movies.supabase"

type Options = {
	enabled?: boolean
	retry?: boolean | false
} & GetMovieDto

export const GET_MOVIE_KEY = "GET-MOVIE"

export const getMovie = ({ enabled = false, retry, ...dto }: Options) => ({
	queryKey: [GET_MOVIE_KEY, dto],
	queryFn: async () => await movies.getMovie(dto),
	enabled,
	retry,
})

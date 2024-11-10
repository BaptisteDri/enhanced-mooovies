import {
	GetMoviesDto,
	movies,
} from "@/core/movies/infrastructure/movies.supabase"
import { keepPreviousData } from "@tanstack/react-query"

type Options = {
	dto: Omit<GetMoviesDto, "seen">
	enabled?: boolean
}

export const GET_MOVIES_KEY = "GET-MOVIES"

export const getSeenMovies = ({ enabled = false, dto }: Options) => ({
	queryKey: [GET_MOVIES_KEY, dto],
	queryFn: async () => await movies.get({ ...dto, seen: true }),
	enabled,
	placeholderData: keepPreviousData,
})

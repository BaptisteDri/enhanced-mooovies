import {
	GetMoviesDto,
	movies,
} from "@/core/movies/infrastructure/movies.supabase"
import { keepPreviousData } from "@tanstack/react-query"

type Options = {
	dto: Omit<GetMoviesDto, "seen">
	enabled?: boolean
}

export const GET_NOT_SEEN_MOVIES_KEY = "GET-MOVIES-NOT-SEEN"

export const getNotSeenMovies = ({ enabled = false, dto }: Options) => ({
	queryKey: [GET_NOT_SEEN_MOVIES_KEY],
	queryFn: async () => {
		return await movies.get({ ...dto, seen: false })
	},
	enabled,
	placeholderData: keepPreviousData,
})

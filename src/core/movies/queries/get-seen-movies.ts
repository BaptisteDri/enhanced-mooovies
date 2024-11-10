import {
	GetMoviesDto,
	movies,
} from "@/core/movies/infrastructure/movies.supabase"
import { keepPreviousData } from "@tanstack/react-query"

type Options = {
	dto: Omit<GetMoviesDto, "seen">
	enabled?: boolean
}

export const getSeenMovies = ({ enabled = false, dto }: Options) => ({
	queryKey: ["GET-MOVIES", dto],
	queryFn: async () => await movies.get({ ...dto, seen: true }),
	enabled,
	placeholderData: keepPreviousData,
})

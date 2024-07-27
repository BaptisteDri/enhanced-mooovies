import {
	GetMoviesDto,
	movies,
} from "@/core/movies/infrastructure/movies.supabase"

type Options = {
	dto: Omit<GetMoviesDto, "seen">
	enabled?: boolean
}

export const getSeenMovies = ({ enabled = false, dto }: Options) => ({
	queryKey: ["GET-MOVIES"],
	queryFn: async () => await movies.get({ ...dto, seen: true }),
	enabled,
})

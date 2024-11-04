import {
	GetMoviesDto,
	movies,
} from "@/core/movies/infrastructure/movies.supabase"

type Options = {
	dto: Omit<GetMoviesDto, "seen">
	enabled?: boolean
}

export const getNotSeenMovies = ({ enabled = false, dto }: Options) => ({
	queryKey: ["GET-MOVIES-NOT-SEEN"],
	queryFn: async () => await movies.get({ ...dto, seen: false }),
	enabled,
})

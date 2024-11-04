import {
	GetMoviesDto,
	GetMoviesResponse,
	movies,
} from "@/core/movies/infrastructure/movies.supabase"

type Options = {
	dto: GetMoviesDto
}

export const getInfiniteMovies = ({ dto }: Options) => ({
	queryKey: ["GET-MOVIES-INFINITE"],
	queryFn: async (params: any) =>
		(await movies.get(params.pageParam)) ?? {
			movies: [],
			amount: null,
			nextCursor: undefined,
		},
	initialPageParam: dto,
	getNextPageParam: (lastPage: GetMoviesResponse) => {
		if (lastPage.movies.length === 0 || !lastPage.nextCursor)
			return undefined
		return {
			...dto,
			offset: lastPage.movies.length > 0 ? lastPage.nextCursor : null,
		}
	},
})

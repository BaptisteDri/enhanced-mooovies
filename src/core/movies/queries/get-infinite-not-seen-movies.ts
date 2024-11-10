import {
	GetMoviesDto,
	GetMoviesResponse,
	movies,
} from "@/core/movies/infrastructure/movies.supabase"
import { keepPreviousData } from "@tanstack/react-query"

type Options = {
	dto: GetMoviesDto
}

export const GET_MOVIES_NOT_SEEN_INFINITE_KEY = "GET-MOVIES-NOT-SEEN-INFINITE"

export const getInfiniteNotSeenMovies = ({ dto }: Options) => ({
	queryKey: [GET_MOVIES_NOT_SEEN_INFINITE_KEY],
	queryFn: async (params: { pageParam: GetMoviesDto }) =>
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
	placeholderData: keepPreviousData,
})

import {
	discoverMovies,
	SearchMoviesDto,
	SearchMoviesResponse,
} from "@/core/discover/infrastructure/discover-movies.api"

export const GET_SEARCH_MOVIES = "GET-SEARCH-MOVIES"

export const getInfiniteSearchMovies = (query: string) => ({
	queryKey: [GET_SEARCH_MOVIES, query],
	queryFn: async (params: { pageParam: SearchMoviesDto }) =>
		(await discoverMovies.search(params.pageParam)) ?? {
			discoverMovies: [],
			page: 1,
			totalPages: 0,
			totalResults: 0,
		},
	initialPageParam: { query, page: 1 } as SearchMoviesDto,
	getNextPageParam: (lastPage: SearchMoviesResponse) => {
		if (
			lastPage.discoverMovies.length === 0 ||
			!lastPage.page ||
			lastPage.page > lastPage.totalPages
		)
			return undefined
		return { query, page: lastPage.page }
	},
	enabled: query.length > 0,
})

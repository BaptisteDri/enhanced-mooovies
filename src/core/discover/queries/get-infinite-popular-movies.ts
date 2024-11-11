import {
	discoverMovies,
	GetDiscoverMoviesDto,
	GetDiscoverMoviesResponse,
} from "@/core/discover/infrastructure/discover-movies.api"

export const GET_DISCOVER_MOVIES_POPULAR = "GET-DISCOVER-MOVIES-POPULAR"

export const getInfinitePopularMovies = () => ({
	queryKey: [GET_DISCOVER_MOVIES_POPULAR],
	queryFn: async (params: { pageParam: GetDiscoverMoviesDto }) =>
		(await discoverMovies.getPopular(params.pageParam)) ?? {
			discoverMovies: [],
			page: 1,
		},
	initialPageParam: {},
	getNextPageParam: (lastPage: GetDiscoverMoviesResponse) => {
		if (lastPage.discoverMovies.length === 0 || !lastPage.page) return {}
		return {
			page: lastPage.page,
		}
	},
})

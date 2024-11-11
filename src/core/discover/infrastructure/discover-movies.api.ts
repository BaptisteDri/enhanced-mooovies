import { DiscoverMovie } from "@/core/discover/types/discover-movies"

export type GetDiscoverMoviesDto = {
	page?: number
}

export type GetDiscoverMoviesResponse = {
	discoverMovies: DiscoverMovie[]
	page: number
}

export const discoverMovies: {
	getPopular: ({
		page,
	}: GetDiscoverMoviesDto) => Promise<GetDiscoverMoviesResponse | undefined>
} = {
	getPopular: async ({ page = 1 }) => {
		try {
			const staticData = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/movie/popular?include_adult=false&language=fr-FR&page=${page}`,
				{
					cache: "force-cache",
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
					},
				},
			)

			const parsedData = await staticData.json()
			const parsedMovies: DiscoverMovie[] = await parsedData.results

			return {
				discoverMovies: parsedMovies,
				page: page + 1,
			}
		} catch (error) {
			console.error(error)
		}
	},
}

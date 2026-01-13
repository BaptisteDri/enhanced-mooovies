import { Credits, DiscoverMovie } from "@/core/discover/types/discover-movies"

export type GetDiscoverMoviesDto = { page?: number }

export type GetDiscoverMoviesResponse = {
	discoverMovies: DiscoverMovie[]
	page: number
}

export type DiscoverMoviesFiltersDto = {
	page?: number
	certification?: string
	certificationGte?: string
	certificationLte?: string
	certificationCountry?: string
	includeAdult?: boolean
	includeVideo?: boolean
	language?: string
	primaryReleaseYear?: number
	primaryReleaseDateGte?: string
	primaryReleaseDateLte?: string
	region?: string
	releaseDateGte?: string
	releaseDateLte?: string
	sortBy?: string
	voteAverageGte?: number
	voteAverageLte?: number
	voteCountGte?: number
	voteCountLte?: number
	watchRegion?: string
	withCast?: string
	withCompanies?: string
	withCrew?: string
	withGenres?: string
	withKeywords?: string
	withOriginCountry?: string
	withOriginalLanguage?: string
	withPeople?: string
	withReleaseType?: string
	withRuntimeGte?: number
	withRuntimeLte?: number
	withWatchMonetizationTypes?: string
	withWatchProviders?: string
	withoutCompanies?: string
	withoutGenres?: string
	withoutKeywords?: string
	withoutWatchProviders?: string
	year?: number
}

export type SearchMoviesDto = {
	query: string
	page?: number
	includeAdult?: boolean
	language?: string
	primaryReleaseYear?: number
	region?: string
	year?: number
}

export type SearchMoviesResponse = {
	discoverMovies: DiscoverMovie[]
	page: number
	totalPages: number
	totalResults: number
}

export const discoverMovies: {
	getPopular: ({
		page,
	}: GetDiscoverMoviesDto) => Promise<GetDiscoverMoviesResponse | undefined>
	getMovie: (tmdbId: number) => Promise<DiscoverMovie | undefined>
	getMovieCredits: (tmdbId: number) => Promise<Credits | undefined>
	getDiscover: (
		filters: DiscoverMoviesFiltersDto,
	) => Promise<GetDiscoverMoviesResponse | undefined>
	search: (
		params: SearchMoviesDto,
	) => Promise<SearchMoviesResponse | undefined>
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

			return { discoverMovies: parsedMovies, page: page + 1 }
		} catch (error) {
			console.error(error)
		}
	},
	getMovie: async (tmdbId: number) => {
		try {
			const staticData = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/movie/${tmdbId}?include_adult=false&language=fr-FR`,
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
					},
				},
			)

			const parsedData = await staticData.json()
			const parsedMovie: DiscoverMovie = await parsedData

			return parsedMovie
		} catch (error) {
			console.error(error)
		}
	},
	getMovieCredits: async (tmdbId: number) => {
		try {
			const staticData = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/movie/${tmdbId}/credits?language=fr-FR`,
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
					},
				},
			)

			const parsedData = await staticData.json()
			const parsedCredits: Credits = await parsedData

			return parsedCredits
		} catch (error) {
			console.error(error)
		}
	},
	getDiscover: async (filters) => {
		try {
			const params = new URLSearchParams()

			params.append(
				"include_adult",
				String(filters.includeAdult ?? false),
			)
			params.append("language", filters.language ?? "fr-FR")
			params.append("page", String(filters.page ?? 1))

			if (filters.certification)
				params.append("certification", filters.certification)
			if (filters.certificationGte)
				params.append("certification.gte", filters.certificationGte)
			if (filters.certificationLte)
				params.append("certification.lte", filters.certificationLte)
			if (filters.certificationCountry)
				params.append(
					"certification_country",
					filters.certificationCountry,
				)
			if (filters.includeVideo !== undefined)
				params.append("include_video", String(filters.includeVideo))
			if (filters.primaryReleaseYear)
				params.append(
					"primary_release_year",
					String(filters.primaryReleaseYear),
				)
			if (filters.primaryReleaseDateGte)
				params.append(
					"primary_release_date.gte",
					filters.primaryReleaseDateGte,
				)
			if (filters.primaryReleaseDateLte)
				params.append(
					"primary_release_date.lte",
					filters.primaryReleaseDateLte,
				)
			if (filters.region) params.append("region", filters.region)
			if (filters.releaseDateGte)
				params.append("release_date.gte", filters.releaseDateGte)
			if (filters.releaseDateLte)
				params.append("release_date.lte", filters.releaseDateLte)
			if (filters.sortBy) params.append("sort_by", filters.sortBy)
			if (filters.voteAverageGte)
				params.append(
					"vote_average.gte",
					String(filters.voteAverageGte),
				)
			if (filters.voteAverageLte)
				params.append(
					"vote_average.lte",
					String(filters.voteAverageLte),
				)
			if (filters.voteCountGte)
				params.append("vote_count.gte", String(filters.voteCountGte))
			if (filters.voteCountLte)
				params.append("vote_count.lte", String(filters.voteCountLte))
			if (filters.watchRegion)
				params.append("watch_region", filters.watchRegion)
			if (filters.withCast) params.append("with_cast", filters.withCast)
			if (filters.withCompanies)
				params.append("with_companies", filters.withCompanies)
			if (filters.withCrew) params.append("with_crew", filters.withCrew)
			if (filters.withGenres)
				params.append("with_genres", filters.withGenres)
			if (filters.withKeywords)
				params.append("with_keywords", filters.withKeywords)
			if (filters.withOriginCountry)
				params.append("with_origin_country", filters.withOriginCountry)
			if (filters.withOriginalLanguage)
				params.append(
					"with_original_language",
					filters.withOriginalLanguage,
				)
			if (filters.withPeople)
				params.append("with_people", filters.withPeople)
			if (filters.withReleaseType)
				params.append("with_release_type", filters.withReleaseType)
			if (filters.withRuntimeGte)
				params.append(
					"with_runtime.gte",
					String(filters.withRuntimeGte),
				)
			if (filters.withRuntimeLte)
				params.append(
					"with_runtime.lte",
					String(filters.withRuntimeLte),
				)
			if (filters.withWatchMonetizationTypes)
				params.append(
					"with_watch_monetization_types",
					filters.withWatchMonetizationTypes,
				)
			if (filters.withWatchProviders)
				params.append(
					"with_watch_providers",
					filters.withWatchProviders,
				)
			if (filters.withoutCompanies)
				params.append("without_companies", filters.withoutCompanies)
			if (filters.withoutGenres)
				params.append("without_genres", filters.withoutGenres)
			if (filters.withoutKeywords)
				params.append("without_keywords", filters.withoutKeywords)
			if (filters.withoutWatchProviders)
				params.append(
					"without_watch_providers",
					filters.withoutWatchProviders,
				)
			if (filters.year) params.append("year", String(filters.year))

			const staticData = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/discover/movie?${params.toString()}`,
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
					},
				},
			)

			const parsedData = await staticData.json()
			const parsedMovies: DiscoverMovie[] = parsedData.results

			return { discoverMovies: parsedMovies, page: parsedData.page + 1 }
		} catch (error) {
			console.error(error)
		}
	},
	search: async (params) => {
		try {
			const searchParams = new URLSearchParams()

			searchParams.append("query", params.query)
			searchParams.append(
				"include_adult",
				String(params.includeAdult ?? false),
			)
			searchParams.append("language", params.language ?? "fr-FR")
			searchParams.append("page", String(params.page ?? 1))

			if (params.primaryReleaseYear)
				searchParams.append(
					"primary_release_year",
					String(params.primaryReleaseYear),
				)
			if (params.region) searchParams.append("region", params.region)
			if (params.year) searchParams.append("year", String(params.year))

			const staticData = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/search/movie?${searchParams.toString()}`,
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
					},
				},
			)

			const parsedData = await staticData.json()
			const parsedMovies: DiscoverMovie[] = parsedData.results

			return {
				discoverMovies: parsedMovies,
				page: parsedData.page + 1,
				totalPages: parsedData.total_pages,
				totalResults: parsedData.total_results,
			}
		} catch (error) {
			console.error(error)
		}
	},
}

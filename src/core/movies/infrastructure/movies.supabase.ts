import { Movie } from "@/core/movies/types/movie"
import { createClient } from "@/libs/supabase/client"

const supabase = createClient()

export type GetMoviesDto = {
	userId: string
	limit?: number
	offset?: number | null
	seen?: boolean
	ascending?: boolean
	orderBy?: "watched_date" | "added_date" | "year" | "title"
	searchQuery?: string
	categoryId?: number
}

export type GetMoviesResponse = {
	movies: Movie[]
	amount: number | null
	nextCursor?: number
}

export type ToggleMovieIsSeenDto = {
	isSeen: boolean
} & Pick<Movie, "uuid">

export type GetMovieDto = {
	tmdb_id: number
	userId: string
}

export type AddMovieDto = Omit<Movie, "uuid" | "added_date">

export type GetOneMoviePerCategoryDto = {
	userId: string
	categoryIds: number[]
}

export type GetOneMoviePerCategoryResponse = Record<number, Movie | null>

export const movies: {
	get: (dto: GetMoviesDto) => Promise<GetMoviesResponse | undefined>
	getMovie: (dto: GetMovieDto) => Promise<Movie | undefined>
	getOneMoviePerCategory: (
		dto: GetOneMoviePerCategoryDto,
	) => Promise<GetOneMoviePerCategoryResponse | undefined>
	toggleMovieIsSeen: ({
		uuid,
		isSeen,
	}: ToggleMovieIsSeenDto) => Promise<{ isSeen: boolean }>
	addMovie: (movie: AddMovieDto) => Promise<void>
	deleteMovie: (uuid: string) => Promise<void>
} = {
	get: async ({
		userId,
		limit = 0,
		seen,
		offset = 0,
		orderBy = "added_date",
		ascending = false,
		searchQuery,
		categoryId,
	}) => {
		try {
			const query = supabase
				.from("films")
				.select("*", { count: "exact" })
				.eq("user_id", userId)
				.order(orderBy, { ascending })

			if (seen) {
				query.not("watched_date", "is", null)
			} else {
				query.is("watched_date", null)
			}

			if (searchQuery?.trim()) {
				query.ilike("title", `%${searchQuery.trim()}%`)
			}

			if (categoryId) {
				const categoryIdStr = categoryId.toString()
				query.ilike("genre_ids", `%${categoryIdStr}%`)
			}

			if (limit) {
				query.limit(limit)
			}

			if (offset && limit) {
				query.range(offset, offset + limit - 1)
			}

			const { data, error, count } = await query

			if (error?.code === "PGRST103") return undefined

			if (error) throw error

			return {
				movies: data,
				amount: count,
				nextCursor: offset ? offset + limit : limit,
			}
		} catch (error) {
			console.error(error)
		}
	},
	getMovie: async ({ tmdb_id, userId }) => {
		const { data, error } = await supabase
			.from("films")
			.select("*")
			.eq("tmdb_id", tmdb_id)
			.eq("user_id", userId)
			.maybeSingle()

		if (error) throw error

		return data
	},
	getOneMoviePerCategory: async ({ userId, categoryIds }) => {
		// @TODO: OPTIMISER CETTE REQUETE
		try {
			// Récupérer tous les films non vus
			const { data, error } = await supabase
				.from("films")
				.select("*")
				.eq("user_id", userId)
				.is("watched_date", null)
				.order("added_date", { ascending: false })

			if (error?.code === "PGRST103") return undefined

			if (error) throw error

			// Initialiser le résultat avec null pour chaque catégorie
			const result: GetOneMoviePerCategoryResponse = {}
			categoryIds.forEach((categoryId) => {
				result[categoryId] = null
			})

			// Grouper les films par catégorie
			if (data) {
				const categoryIdStrSet = new Set(
					categoryIds.map((id) => id.toString()),
				)

				for (const movie of data) {
					if (!movie.genre_ids) continue

					// Parser les genre_ids (format: "28, 12, 16")
					const movieCategoryIds = movie.genre_ids
						.split(",")
						.map((id) => id.trim())

					// Trouver la première catégorie correspondante qui n'a pas encore de film
					for (const categoryIdStr of movieCategoryIds) {
						const categoryId = parseInt(categoryIdStr, 10)
						if (
							categoryIdStrSet.has(categoryIdStr) &&
							result[categoryId] === null
						) {
							result[categoryId] = movie
							break // Un film ne peut être assigné qu'à une seule catégorie
						}
					}
				}
			}

			return result
		} catch (error) {
			console.error(error)
		}
	},
	toggleMovieIsSeen: async ({ isSeen, uuid }) => {
		const { error } = await supabase
			.from("films")
			.update({ watched_date: isSeen ? new Date().toISOString() : null })
			.eq("uuid", uuid)

		if (error) throw error

		return {
			isSeen,
		}
	},
	addMovie: async (movie) => {
		await supabase.from("films").insert({ ...movie, uuid: undefined })
	},

	deleteMovie: async (uuid) => {
		await supabase.from("films").delete().eq("uuid", uuid)
	},
}

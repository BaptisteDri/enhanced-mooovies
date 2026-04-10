import { Movie } from "@/core/movies/types/movie"
import { createClient } from "@/libs/supabase/client"

const supabase = createClient()

export type GetMoviesDto = {
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
}

export type AddMovieDto = Omit<Movie, "uuid" | "added_date" | "user_id">

export const movies: {
	get: (dto: GetMoviesDto) => Promise<GetMoviesResponse | undefined>
	getMovie: (dto: GetMovieDto) => Promise<Movie | undefined>
	toggleMovieIsSeen: ({
		uuid,
		isSeen,
	}: ToggleMovieIsSeenDto) => Promise<{ isSeen: boolean }>
	addMovie: (movie: AddMovieDto) => Promise<void>
	deleteMovie: (uuid: string) => Promise<void>
} = {
	get: async (dto: GetMoviesDto) => {
		const {
			limit = 0,
			seen,
			offset = 0,
			orderBy = "added_date",
			ascending = false,
			searchQuery,
			categoryId,
		} = dto

		try {
			const query = supabase
				.from("films")
				.select("*", { count: "exact" })
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
	getMovie: async ({ tmdb_id }: GetMovieDto) => {
		const { data, error } = await supabase
			.from("films")
			.select("*")
			.eq("tmdb_id", tmdb_id)
			.maybeSingle()

		if (error) throw error

		return data
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
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser()
		if (authError || !user) throw authError ?? new Error("Non authentifié")

		await supabase.from("films").insert({
			...movie,
			user_id: user.id,
			uuid: undefined,
		})
	},

	deleteMovie: async (uuid) => {
		await supabase.from("films").delete().eq("uuid", uuid)
	},
}

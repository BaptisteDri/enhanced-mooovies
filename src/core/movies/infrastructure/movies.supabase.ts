import { Movie } from "@/core/movies/types/movie"
import { createClient } from "@/libs/supabase/client"

const supabase = createClient()

export type GetMoviesDto = {
	userId: string
	limit?: number
	offset?: number | null
	seen?: boolean
	ascending?: boolean
	orderBy?: "watched_date" | "added_date"
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

export const movies: {
	get: (dto: GetMoviesDto) => Promise<GetMoviesResponse | undefined>
	getMovie: (dto: GetMovieDto) => Promise<Movie | undefined>
	toggleMovieIsSeen: ({
		uuid,
		isSeen,
	}: ToggleMovieIsSeenDto) => Promise<{ isSeen: boolean }>
} = {
	get: async ({
		userId,
		limit = 0,
		seen,
		offset = 0,
		orderBy = "added_date",
		ascending = false,
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
			.single()

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
}

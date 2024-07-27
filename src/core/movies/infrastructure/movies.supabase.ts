import { Movie } from "@/core/movies/types/movie"
import { createClient } from "@/libs/supabase/client"

const supabase = createClient()

export type GetMoviesDto = {
	limit?: number
	seen: boolean
	userId: string
}

export const movies: {
	get: (dto: GetMoviesDto) => Promise<Movie[] | null | undefined>
} = {
	get: async ({ userId, limit, seen }) => {
		try {
			const query = supabase
				.from("films")
				.select()
				.eq("user_id", userId)
				.order("added_date", { ascending: false })

			if (seen) {
				query.not("watched_date", "is", null)
			} else {
				query.is("watched_date", null)
			}

			if (limit) {
				query.limit(limit)
			}

			const { data, error } = await query

			if (error) throw error

			return data
		} catch (error) {
			console.error(error)
		}
	},
}

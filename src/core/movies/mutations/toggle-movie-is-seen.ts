import { QueryClient } from "@tanstack/react-query"

import {
	movies,
	ToggleMovieIsSeenDto,
} from "@/core/movies/infrastructure/movies.supabase"
import { GET_MOVIE_KEY } from "@/core/movies/queries/get-movie"

type Options = {
	queryClient: QueryClient
}

export const toggleMovieIsSeen = ({ queryClient }: Options) => ({
	mutationFn: async (dto: ToggleMovieIsSeenDto) => {
		await movies.toggleMovieIsSeen(dto)
	},
	onSuccess: async () => {
		await queryClient.invalidateQueries({
			queryKey: ["GET-MOVIES"],
		})

		await queryClient.invalidateQueries({
			queryKey: ["GET-MOVIES-NOT-SEEN"],
		})

		await queryClient.invalidateQueries({
			queryKey: [GET_MOVIE_KEY],
		})
	},
})

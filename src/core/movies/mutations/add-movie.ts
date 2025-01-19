import { QueryClient } from "@tanstack/react-query"

import {
	AddMovieDto,
	movies,
} from "@/core/movies/infrastructure/movies.supabase"
import { GET_MOVIE_KEY } from "@/core/movies/queries/get-movie"
import { GET_NOT_SEEN_MOVIES_KEY } from "@/core/movies/queries/get-not-seen-movies"
import { GET_MOVIES_KEY } from "@/core/movies/queries/get-seen-movies"
import { GET_MOVIES_NOT_SEEN_INFINITE_KEY } from "@/core/movies/queries/get-infinite-not-seen-movies"
import { GET_MOVIES_SEEN_INFINITE_KEY } from "@/core/movies/queries/get-infinite-seen-movies"
import { Movie } from "@/core/movies/types/movie"

type Options = {
	queryClient: QueryClient
}

export const addMovie = ({ queryClient }: Options) => ({
	mutationFn: async (dto: AddMovieDto) => {
		await movies.addMovie(dto)
	},
	onSuccess: async () => {
		await queryClient.invalidateQueries({
			queryKey: [GET_MOVIES_KEY],
		})

		await queryClient.invalidateQueries({
			queryKey: [GET_NOT_SEEN_MOVIES_KEY],
		})

		await queryClient.invalidateQueries({
			queryKey: [GET_MOVIE_KEY],
		})

		await queryClient.invalidateQueries({
			queryKey: [GET_MOVIES_NOT_SEEN_INFINITE_KEY],
		})

		await queryClient.invalidateQueries({
			queryKey: [GET_MOVIES_SEEN_INFINITE_KEY],
		})
	},
})

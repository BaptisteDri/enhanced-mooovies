import { CommonMovie } from "@/core/common/types/common-movie"
import { DiscoverMovie } from "@/core/discover/types/discover-movies"
import { addMovie } from "@/core/movies/mutations/add-movie"
import { deleteMovie } from "@/core/movies/mutations/delete-movie"
import { toggleMovieIsSeen } from "@/core/movies/mutations/toggle-movie-is-seen"
import { getMovie } from "@/core/movies/queries/get-movie"
import { Button } from "@/design-system/button"
import { Icon } from "@/design-system/icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"

type Props = {
	movie: DiscoverMovie
	userId: string
	setSelectedMovie?: (movie?: CommonMovie) => void
}

export const DrawerActions = ({ movie, userId, setSelectedMovie }: Props) => {
	const queryClient = useQueryClient()
	const { data: fetchedMovie, isFetching } = useQuery(
		getMovie({
			tmdb_id: movie.id,
			userId,
			enabled: true,
			retry: false,
		}),
	)

	const toggleMovieIsSeenMutation = useMutation(
		toggleMovieIsSeen({ queryClient }),
	)

	const addMovieMutation = useMutation(addMovie({ queryClient }))

	const deleteMovieMutation = useMutation(
		deleteMovie({
			queryClient,
		}),
	)

	const setIsSeen = () => {
		if (!fetchedMovie) return addToList(true)

		return toggleMovieIsSeenMutation.mutate({
			isSeen: true,
			uuid: fetchedMovie.uuid,
		})
	}

	const setIsNotSeen = () => {
		if (!fetchedMovie) return
		toggleMovieIsSeenMutation.mutate({
			isSeen: false,
			uuid: fetchedMovie.uuid,
		})
	}

	const addToList = (isSeen: boolean) => {
		// const movieToAdd: AddMovieDto = {
		// 	// director: movie.director,
		// 	director: "",
		// 	genre_ids: movie.genre_ids.join(", "),
		// 	original_language: movie.original_language,
		// 	original_title: movie.original_title,
		// 	overview: movie.overview,
		// 	poster: movie.poster_path,
		// 	title: movie.title,
		// 	tmdb_id: movie.id,
		// 	user_id: userId,
		// 	watched_date: isSeen ? new Date().toISOString() : null,
		// 	year: new Date(movie.release_date).getFullYear().toString(),
		// }
		// addMovieMutation.mutate(movieToAdd)
	}

	const isSeen = false

	return (
		<section className="flex gap-4 mt-6 border-t border-gray-800 pt-4 pb-6">
			{isFetching ? (
				<section className="flex gap-4 animate-pulse w-full">
					<section className="bg-gray-800 h-12 rounded-md w-full"></section>
					<section className="bg-gray-800 h-12 min-w-12 rounded-md"></section>
				</section>
			) : (
				<>
					{(fetchedMovie && !!fetchedMovie.watched_date) || isSeen ? (
						<Button
							intent={"secondary"}
							className="flex-1 [&>span]:flex [&>span]:items-center [&>span]:gap-3 py-0 h-12"
							onClick={setIsNotSeen}
							loading={
								toggleMovieIsSeenMutation.isPending ||
								isFetching
							}
							disabled={
								toggleMovieIsSeenMutation.isPending ||
								isFetching
							}
						>
							<Icon name="eye-slash" size={20} />
							Retirer des films vus
						</Button>
					) : (
						<Button
							className="flex-1 [&>span]:flex [&>span]:items-center [&>span]:gap-3 py-0 h-12"
							onClick={setIsSeen}
							loading={
								toggleMovieIsSeenMutation.isPending ||
								isFetching
							}
							disabled={
								toggleMovieIsSeenMutation.isPending ||
								isFetching
							}
						>
							<Icon name="eye" size={20} />
							Marquer comme vu
						</Button>
					)}

					<Button className="w-12 p-0" intent={"secondary"}>
						<Icon name={true ? "check" : "plus"} size={20} />
					</Button>
				</>
			)}
		</section>
	)
}

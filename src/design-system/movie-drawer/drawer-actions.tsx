import { DiscoverMovie } from "@/core/discover/types/discover-movies"
import { AddMovieDto } from "@/core/movies/infrastructure/movies.supabase"
import { addMovie } from "@/core/movies/mutations/add-movie"
import { deleteMovie } from "@/core/movies/mutations/delete-movie"
import { toggleMovieIsSeen } from "@/core/movies/mutations/toggle-movie-is-seen"
import { getMovie } from "@/core/movies/queries/get-movie"
import { Button } from "@/design-system/button"
import { Icon } from "@/design-system/icons"
import { useMovieCredits } from "@/hooks/use-movie-credits"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type Props = {
	movie: DiscoverMovie
	userId: string
}

export const DrawerActions = ({ movie, userId }: Props) => {
	const queryClient = useQueryClient()

	const {
		data: fetchedMovie,
		isFetching,
		isLoading,
	} = useQuery(
		getMovie({
			tmdb_id: movie.id,
			userId,
			enabled: true,
			retry: false,
		}),
	)

	const { directors } = useMovieCredits(movie.id)

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

	const addToList = (isSeen: boolean = false) => {
		const movieToAdd: AddMovieDto = {
			director: directors,
			genre_ids: movie.genres.map((genre) => genre.id).join(", "),
			original_language: movie.original_language,
			original_title: movie.original_title,
			overview: movie.overview,
			poster: movie.poster_path,
			title: movie.title,
			tmdb_id: movie.id,
			user_id: userId,
			watched_date: isSeen ? new Date().toISOString() : null,
			year: new Date(movie.release_date).getFullYear().toString(),
			runtime: "",
		}

		addMovieMutation.mutate(movieToAdd)
	}

	const deleteFromList = () => {
		if (!fetchedMovie) return
		deleteMovieMutation.mutate(fetchedMovie.uuid)
	}

	const isSeen = !!fetchedMovie?.watched_date
	const isAdded = !!fetchedMovie

	return (
		<section className="flex gap-4 mt-6 border-t border-gray-800 pt-4 pb-6">
			{isLoading && !fetchedMovie ? (
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
							loading={toggleMovieIsSeenMutation.isPending}
							disabled={toggleMovieIsSeenMutation.isPending}
						>
							<Icon name="eye" size={20} />
							Marquer comme vu
						</Button>
					)}

					<Button
						className="w-12 p-0"
						intent={"secondary"}
						aria-label={
							isAdded
								? "Retirer de la liste"
								: "Ajouter à la liste"
						}
						onClick={isAdded ? deleteFromList : () => addToList()}
						loading={addMovieMutation.isPending}
						disabled={addMovieMutation.isPending}
					>
						<Icon name={isAdded ? "check" : "plus"} size={20} />
					</Button>
				</>
			)}
		</section>
	)
}

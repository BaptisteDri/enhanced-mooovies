import { CommonMovie } from "@/core/common/types/common-movie"
import { toggleMovieIsSeen } from "@/core/movies/mutations/toggle-movie-is-seen"
import { getMovie } from "@/core/movies/queries/get-movie"
import { Button } from "@/design-system/button"
import { Icon } from "@/design-system/icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"

type Props = {
	movie: CommonMovie
	userId: string
}

export const DrawerActions = ({ movie, userId }: Props) => {
	const queryClient = useQueryClient()
	const { data: fetchedMovie, isFetching } = useQuery(
		getMovie({
			tmdb_id: movie.type === "movie" ? movie.tmdb_id : movie.id,
			userId,
			enabled: true,
			retry: false,
		}),
	)

	const toggleMovieIsSeenMutation = useMutation(
		toggleMovieIsSeen({ queryClient }),
	)

	const setIsSeen = () => {
		if (movie.type === "discover" && !fetchedMovie) return // @TODO: add to list then mark as seen

		if (movie.type === "discover" && !!fetchedMovie)
			return toggleMovieIsSeenMutation.mutate({
				isSeen: true,
				uuid: fetchedMovie.uuid,
			})

		if (movie.type === "movie")
			return toggleMovieIsSeenMutation.mutate({
				isSeen: true,
				uuid: movie.uuid,
			})
	}

	const setIsNotSeen = () => {
		if (movie.type === "discover" && !!fetchedMovie)
			return toggleMovieIsSeenMutation.mutate({
				isSeen: false,
				uuid: fetchedMovie.uuid,
			})

		if (movie.type === "movie")
			return toggleMovieIsSeenMutation.mutate({
				isSeen: false,
				uuid: movie.uuid,
			})
	}

	const isSeen = useMemo(() => {
		if (!fetchedMovie) return movie.type === "movie" && !!movie.watched_date
		return !!fetchedMovie.watched_date
	}, [fetchedMovie, movie])

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
						<Icon
							name={
								(movie.type === "movie" &&
									!!movie.added_date) ||
								!!fetchedMovie
									? "check"
									: "plus"
							}
							size={20}
						/>
					</Button>
				</>
			)}
		</section>
	)
}

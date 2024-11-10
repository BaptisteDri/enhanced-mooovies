import { DiscoverMovie } from "@/core/discover/discover-movies"
import { toggleMovieIsSeen } from "@/core/movies/mutations/toggle-movie-is-seen"
import { Movie } from "@/core/movies/types/movie"
import { Button } from "@/design-system/button"
import { Icon } from "@/design-system/icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type Props = {
	movie: ({ type: "movie" } & Movie) | ({ type: "discover" } & DiscoverMovie)
}

export const DrawerActions = ({ movie }: Props) => {
	const queryClient = useQueryClient()
	const toggleMovieIsSeenMutation = useMutation(
		toggleMovieIsSeen({ queryClient }),
	)

	const setIsSeen = () => {
		if (movie.type === "discover") return // @TODO: add to list then mark as seen
		toggleMovieIsSeenMutation.mutate({ isSeen: true, uuid: movie.uuid })
	}

	const setIsNotSeen = () => {
		if (movie.type === "discover") return
		toggleMovieIsSeenMutation.mutate({ isSeen: false, uuid: movie.uuid })
	}

	return (
		<section className="flex gap-4 mt-6 border-t border-gray-800 pt-4">
			{movie.type === "movie" && !!movie.watched_date ? (
				<Button
					intent={"secondary"}
					className="flex-1 [&>span]:flex [&>span]:items-center [&>span]:gap-3 py-0 h-12"
					onClick={setIsNotSeen}
					loading={toggleMovieIsSeenMutation.isPending}
				>
					<Icon name="eye-slash" size={20} />
					Retirer des films vus
				</Button>
			) : (
				<Button
					className="flex-1 [&>span]:flex [&>span]:items-center [&>span]:gap-3 py-0 h-12"
					onClick={setIsSeen}
					loading={toggleMovieIsSeenMutation.isPending}
				>
					<Icon name="eye" size={20} />
					Marquer comme vu
				</Button>
			)}

			<Button
				className="w-12 p-0"
				intent={
					movie.type === "movie" && !!movie.added_date
						? "secondary"
						: "primary"
				}
			>
				<Icon
					name={
						movie.type === "movie" && !!movie.added_date
							? "check"
							: "plus"
					}
					size={20}
				/>
			</Button>
		</section>
	)
}

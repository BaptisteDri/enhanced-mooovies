import { DiscoverMovie } from "@/core/discover/discover-movies"
import { Movie } from "@/core/movies/types/movie"
import { Button } from "@/design-system/button"
import { Icon } from "@/design-system/icons"

type Props = {
	movie: ({ type: "movie" } & Movie) | ({ type: "discover" } & DiscoverMovie)
}

export const DrawerActions = ({ movie }: Props) => {
	return (
		<section className="flex gap-4 mt-6 border-t border-gray-800 pt-4">
			{movie.type === "movie" && !!movie.watched_date ? (
				<Button
					intent={"secondary"}
					className="flex-1 [&>span]:flex [&>span]:items-center [&>span]:gap-3 py-0 h-12"
				>
					<Icon name="eye-slash" size={20} />
					Retirer des films vus
				</Button>
			) : (
				<Button className="flex-1 [&>span]:flex [&>span]:items-center [&>span]:gap-3 py-0 h-12">
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

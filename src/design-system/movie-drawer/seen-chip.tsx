import { DiscoverMovie } from "@/core/discover/discover-movies"
import { Movie } from "@/core/movies/types/movie"
import { Icon } from "@/design-system/icons"

type Props = {
	movie: ({ type: "movie" } & Movie) | ({ type: "discover" } & DiscoverMovie)
}

export const SeenChip = ({ movie }: Props) => {
	if (!(movie.type === "movie" && !!movie.watched_date)) return <></>

	const formattedDate = new Date(movie.watched_date).toLocaleDateString(
		"fr-FR",
		{
			day: "numeric",
			month: "long",
			year: "numeric",
		},
	)

	return (
		<p className="mb-4 border w-fit px-3 py-1.5 text-sm border-indigo-500 rounded-md bg-gradient-to-br from-indigo-950 to-indigo-900 flex items-center gap-2 relative z-10">
			<Icon name="eye" size={12} />
			Vu le {formattedDate}
		</p>
	)
}

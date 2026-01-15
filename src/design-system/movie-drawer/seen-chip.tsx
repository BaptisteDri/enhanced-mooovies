import { DiscoverMovie } from "@/core/discover/types/discover-movies"
import { getMovie } from "@/core/movies/queries/get-movie"
import { Icon } from "@/design-system/icons"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { twMerge } from "tailwind-merge"

type Props = { movie: DiscoverMovie; userId: string }

export const SeenChip = ({ movie, userId }: Props) => {
	const [lastSeenDate, setLastSeenDate] = useState<string>()

	const { data: fetchedMovie } = useQuery(
		getMovie({ tmdb_id: movie.id, userId, enabled: true, retry: false }),
	)

	const isSeen = useMemo(() => {
		return !!fetchedMovie?.watched_date
	}, [fetchedMovie, movie])

	const date = lastSeenDate || fetchedMovie?.watched_date

	useEffect(() => {
		if (!fetchedMovie?.watched_date || !date) return
		setLastSeenDate(date)
	}, [fetchedMovie, movie])

	const formattedDate =
		date &&
		new Date(date).toLocaleDateString("fr-FR", {
			day: "numeric",
			month: "long",
			year: "numeric",
		})

	return (
		<p
			className={twMerge(
				"transition-colors duration-150 border text-xs rounded-md flex items-center gap-2 relative z-10",
				"transition-all duration-300",
				"text-xs font-light w-fit rounded-md px-1.5 py-0.5 max-h-8.5",
				isSeen
					? "bg-linear-to-br from-indigo-950 to-indigo-900 border-indigo-500"
					: "border-gray-700 bg-gray-800",
			)}
			style={{ transform: "translateZ(0)" }}
		>
			<Icon name={isSeen ? "eye" : "eye-slash"} size={12} />
			{isSeen ? `Vu le ${formattedDate}` : "Pas encore vu"}
		</p>
	)
}

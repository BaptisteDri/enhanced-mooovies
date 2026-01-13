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

	if (!isSeen) return <></>

	return (
		<p
			className={twMerge(
				"border text-xs border-indigo-500 rounded-md bg-linear-to-br from-indigo-950 to-indigo-900 flex items-center gap-2 relative z-10",
				"transition-all duration-300",
				"text-xs font-light w-fit rounded-md px-1.5 py-0.5 ",
				isSeen
					? "max-h-8.5"
					: "max-h-0 overflow-hidden mb-0  opacity-0 scale-0 p-0",
			)}
			style={{ transform: "translateZ(0)" }}
		>
			<Icon name="eye" size={12} />
			Vu le {formattedDate}
		</p>
	)
}

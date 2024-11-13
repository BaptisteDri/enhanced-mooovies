import { CommonMovie } from "@/core/common/types/common-movie"
import { getMovie } from "@/core/movies/queries/get-movie"
import { Icon } from "@/design-system/icons"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
	movie: CommonMovie
}

export const SeenChip = ({ movie }: Props) => {
	const [lastSeenDate, setLastSeenDate] = useState<string>()

	const { data: fetchedMovie } = useQuery(
		getMovie({
			uuid: movie.type === "movie" ? movie.uuid : undefined,
		}),
	)

	const isSeen = useMemo(() => {
		if (!fetchedMovie) return movie.type === "movie" && !!movie.watched_date
		return !!fetchedMovie.watched_date
	}, [fetchedMovie, movie])

	const date = useMemo(
		() =>
			lastSeenDate ||
			fetchedMovie?.watched_date ||
			(movie.type === "movie" ? movie.watched_date : ""),
		[fetchedMovie, movie],
	)

	useEffect(() => {
		if (!fetchedMovie?.watched_date) return
		setLastSeenDate(date)
	}, [fetchedMovie, movie])

	if (movie.type === "discover") return <></>

	const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	})

	return (
		<p
			className={twMerge(
				"mb-4 border h-[2.125rem] w-fit px-3 py-0 text-sm border-indigo-500 rounded-md bg-gradient-to-br from-indigo-950 to-indigo-900 flex items-center gap-2 relative z-10",
				"transition-all duration-300",
				isSeen
					? "max-h-[2.125rem]"
					: "max-h-0 overflow-hidden mb-0  opacity-0 scale-0",
			)}
			style={{
				transform: "translateZ(0)",
			}}
		>
			<Icon name="eye" size={12} />
			Vu le {formattedDate}
		</p>
	)
}

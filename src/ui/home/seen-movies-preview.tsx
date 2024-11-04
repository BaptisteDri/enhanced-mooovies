"use client"

import { getSeenMovies } from "@/core/movies/queries/get-seen-movies"
import { MoviesListPreviewSection } from "@/ui/shared/movies/movies-list-preview-section"
import { useQuery } from "@tanstack/react-query"

type Props = {
	userId: string
}

export const SeenMoviesPreview = ({ userId }: Props) => {
	const { data } = useQuery(
		getSeenMovies({
			dto: {
				limit: 6,
				userId,
				orderBy: "watched_date",
			},
		}),
	)
	const { amount, movies } = { ...data }

	return movies && movies.length > 0 ? (
		<MoviesListPreviewSection
			amount={amount}
			href={"/vus"}
			title={"Vus"}
			movies={movies || []}
		/>
	) : (
		<></>
	)
}

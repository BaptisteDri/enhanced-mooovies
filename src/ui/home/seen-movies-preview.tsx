"use client"

import { getSeenMovies } from "@/core/movies/queries/get-seen-movies"
import { MoviesListPreviewSection } from "@/ui/shared/movies/movies-list-preview-section"
import { useQuery } from "@tanstack/react-query"

type Props = {
	userId: string
}

export const SeenMoviesPreview = ({ userId }: Props) => {
	const { data: movies } = useQuery(
		getSeenMovies({ dto: { limit: 10, userId } }),
	)

	return movies && movies.length > 0 ? (
		<MoviesListPreviewSection
			href={"#"}
			title={"Revoir"}
			movies={movies || []}
		/>
	) : (
		<></>
	)
}

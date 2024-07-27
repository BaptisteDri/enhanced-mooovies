"use client"

import { getNotSeenMovies } from "@/core/movies/queries/get-not-seen-movies"
import { MoviesListPreviewSection } from "@/ui/shared/movies/movies-list-preview-section"
import { useQuery } from "@tanstack/react-query"

type Props = {
	userId: string
}

export const NotSeenMoviesPreview = ({ userId }: Props) => {
	const { data: movies } = useQuery(
		getNotSeenMovies({ dto: { limit: 10, userId } }),
	)

	return (
		<MoviesListPreviewSection
			href={"#"}
			title={"À voir"}
			movies={movies || []}
		/>
	)
}

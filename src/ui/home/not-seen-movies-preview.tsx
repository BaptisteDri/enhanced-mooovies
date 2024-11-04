"use client"

import { getNotSeenMovies } from "@/core/movies/queries/get-not-seen-movies"
import { MoviesListPreviewSection } from "@/ui/shared/movies/movies-list-preview-section"
import { useQuery } from "@tanstack/react-query"

type Props = {
	userId: string
}

export const NotSeenMoviesPreview = ({ userId }: Props) => {
	const { data } = useQuery(getNotSeenMovies({ dto: { limit: 10, userId } }))
	const { amount, movies } = { ...data }

	return (
		<MoviesListPreviewSection
			amount={amount}
			href={"/a-voir"}
			title={"À voir"}
			movies={movies || []}
		/>
	)
}

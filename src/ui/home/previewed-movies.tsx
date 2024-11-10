"use client"

import { CommonMovie } from "@/core/common/types/common-movie"
import { getNotSeenMovies } from "@/core/movies/queries/get-not-seen-movies"
import { getSeenMovies } from "@/core/movies/queries/get-seen-movies"
import { Movie } from "@/core/movies/types/movie"
import { MovieDrawer } from "@/design-system/movie-drawer"
import { MoviesListPreviewSection } from "@/ui/shared/movies/movies-list-preview-section"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

type Props = {
	userId: string
}

export const PreviewedMovies = ({ userId }: Props) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [selectedMovie, setSelectedMovie] = useState<Movie>()

	const { data: seenMoviesData } = useQuery(
		getSeenMovies({
			dto: {
				limit: 6,
				userId,
				orderBy: "watched_date",
			},
			enabled: true,
		}),
	)
	const { amount: seenMoviesAmount, movies: seenMovies } = {
		...seenMoviesData,
	}

	const { data: notSeenMoviesData } = useQuery(
		getNotSeenMovies({ dto: { limit: 10, userId }, enabled: true }),
	)
	const { amount: notSeenMoviesAmount, movies: notSeenMovies } = {
		...notSeenMoviesData,
	}

	return (
		<>
			<MoviesListPreviewSection
				amount={notSeenMoviesAmount}
				href={"/a-voir"}
				title={"À voir"}
				movies={notSeenMovies || []}
				setSelectedMovie={(movie) => {
					setSelectedMovie(movie)
					setIsDrawerOpen(true)
				}}
			/>
			{seenMovies && seenMovies.length > 0 && (
				<MoviesListPreviewSection
					amount={seenMoviesAmount}
					href={"/vus"}
					title={"Vus"}
					movies={seenMovies || []}
					setSelectedMovie={(movie) => {
						setSelectedMovie(movie)
						setIsDrawerOpen(true)
					}}
				/>
			)}
			{selectedMovie && (
				<MovieDrawer
					movie={{ ...selectedMovie, type: "movie" }}
					open={isDrawerOpen}
					setOpen={setIsDrawerOpen}
					setSelectedMovie={
						setSelectedMovie as (movie?: CommonMovie) => void
					}
				/>
			)}
		</>
	)
}

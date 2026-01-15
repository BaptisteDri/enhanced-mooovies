"use client"

import { CommonMovie } from "@/core/common/types/common-movie"
import { getNotSeenMovies } from "@/core/movies/queries/get-not-seen-movies"
import { getSeenMovies } from "@/core/movies/queries/get-seen-movies"
import { Movie } from "@/core/movies/types/movie"
import { MoviesListPreviewSection } from "@/ui/shared/movies/movies-list-preview-section"
import { useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic"
import { useState } from "react"

const MovieDrawer = dynamic(() =>
	import("@/design-system/movie-drawer").then((mod) => mod.MovieDrawer),
)

type Props = {
	userId: string
}

export const PreviewedMovies = ({ userId }: Props) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [selectedMovie, setSelectedMovie] = useState<Movie>()

	const { data: seenMoviesData, isFetching: isSeenMoviesFetching } = useQuery(
		getSeenMovies({
			dto: {
				limit: 10,
				userId,
				orderBy: "watched_date",
			},
			enabled: true,
		}),
	)
	const { amount: seenMoviesAmount, movies: seenMovies } = {
		...seenMoviesData,
	}

	const { data: notSeenMoviesData, isFetching: isNotSeenMoviesFetching } =
		useQuery(
			getNotSeenMovies({ dto: { limit: 10, userId }, enabled: true }),
		)
	const { amount: notSeenMoviesAmount, movies: notSeenMovies } = {
		...notSeenMoviesData,
	}

	const totalAmount = (notSeenMoviesAmount || 0) + (seenMoviesAmount || 0)

	return (
		<>
			<h1 className="text-4xl font-semibold px-4">
				Mes films{" "}
				{!(
					isNotSeenMoviesFetching ||
					isSeenMoviesFetching ||
					totalAmount === 0
				) && (
					<span className="text-lg text-gray-400 font-normal">
						({totalAmount})
					</span>
				)}
			</h1>
			{notSeenMovies && notSeenMovies.length > 0 && (
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
			)}
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
					origin="library"
					id={selectedMovie.tmdb_id}
					open={isDrawerOpen}
					setOpen={setIsDrawerOpen}
					setSelectedMovie={
						setSelectedMovie as (movie?: CommonMovie) => void
					}
					userId={userId}
				/>
			)}
		</>
	)
}

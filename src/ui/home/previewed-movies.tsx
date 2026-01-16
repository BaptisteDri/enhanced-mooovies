"use client"

import { getNotSeenMovies } from "@/core/movies/queries/get-not-seen-movies"
import { getSeenMovies } from "@/core/movies/queries/get-seen-movies"
import { Movie } from "@/core/movies/types/movie"
import { DRAWER_IDS, useDrawer } from "@/ui/providers/drawer-provider"
import { MoviesListPreviewSection } from "@/ui/shared/movies/movies-list-preview-section"
import { useQuery } from "@tanstack/react-query"


type Props = {
	userId: string
}

export const PreviewedMovies = ({ userId }: Props) => {
	const { openDrawer } = useDrawer()

	const handleOpenDrawer = (movie: Movie) => {
		openDrawer({ id: DRAWER_IDS.MOVIE, data: { id: movie.tmdb_id, userId, origin: "library" } })
	}

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
			<h1 className="text-4xl font-semibold px-4 pt-4">
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
			{((notSeenMovies && notSeenMovies.length > 0) ||
				isNotSeenMoviesFetching) && (
				<MoviesListPreviewSection
					amount={notSeenMoviesAmount}
					href={"/a-voir"}
					title={"À voir"}
					movies={notSeenMovies || []}
					setSelectedMovie={(movie) => {
						if (!movie) return
						handleOpenDrawer(movie)
					}}
					isLoading={isNotSeenMoviesFetching}
				/>
			)}
			{((seenMovies && seenMovies.length > 0) ||
				isSeenMoviesFetching) && (
				<MoviesListPreviewSection
					amount={seenMoviesAmount}
					href={"/vus"}
					title={"Vus"}
					movies={seenMovies || []}
					setSelectedMovie={(movie) => {
						if (!movie) return
						handleOpenDrawer(movie)
					}}
					isLoading={isSeenMoviesFetching}
				/>
			)}
			
		</>
	)
}

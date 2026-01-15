"use client"

import { CommonMovie } from "@/core/common/types/common-movie"
import { GetMoviesDto } from "@/core/movies/infrastructure/movies.supabase"
import { getInfiniteSeenMovies } from "@/core/movies/queries/get-infinite-seen-movies"
import { Movie } from "@/core/movies/types/movie"
import { MovieCard } from "@/design-system/movie-card"
import { MovieDrawer } from "@/design-system/movie-drawer"
import { MoviesListSkeleton } from "@/design-system/movies-list-skeleton"
import { StickySearchBar } from "@/ui/shared/sticky-search-bar"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useRef, useState } from "react"

type Props = {
	userId: string
}

const LIMIT = 15

export const SeenList = ({ userId }: Props) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [selectedMovie, setSelectedMovie] = useState<Movie>()
	const [searchQuery, setSearchQuery] = useState("")
	const observerRef = useRef<HTMLDivElement>(null)

	const dto: GetMoviesDto = useMemo(
		() => ({
			userId,
			seen: true,
			limit: LIMIT,
			offset: 0,
			orderBy: "watched_date",
			searchQuery: searchQuery.trim() || undefined,
		}),
		[userId, searchQuery],
	)

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
		useInfiniteQuery(getInfiniteSeenMovies({ dto }))

	useEffect(() => {
		if (!hasNextPage) return

		const observer = new IntersectionObserver(
			(entries) => {
				if (
					entries[0].isIntersecting &&
					hasNextPage &&
					!isFetchingNextPage
				) {
					fetchNextPage()
				}
			},
			{
				rootMargin: "100px",
				threshold: 0.1,
			},
		)

		if (observerRef.current) {
			observer.observe(observerRef.current)
		}

		return () => observer.disconnect()
	}, [hasNextPage, isFetchingNextPage, fetchNextPage])

	const movies = useMemo(
		() => data?.pages.flatMap((page) => page.movies) ?? [],
		[data?.pages],
	)

	return (
		<>
			<StickySearchBar onSearchChange={setSearchQuery} />
			<h1 className="text-4xl font-semibold px-4">
				Vus
				{!!data?.pages[0].amount && (
					<span className="text-lg ml-2 text-gray-400 font-normal">
						({data?.pages[0].amount})
					</span>
				)}
			</h1>
			<section className="grid grid-cols-3 lg:grid-cols-5 gap-4 px-4">
				{isPending && <MoviesListSkeleton />}
				{movies.map((movie, i) => (
					<MovieCard
						movie={{ ...movie, type: "movie" }}
						key={`${movie.uuid}-${i}`}
						sizes="33vw"
						setSelectedMovie={(movie) => {
							if (movie.type === "discover") return
							setSelectedMovie(movie)
							setIsDrawerOpen(true)
						}}
					/>
				))}
				{isFetchingNextPage &&
					data?.pages[0].amount &&
					data?.pages[0].amount > LIMIT && <MoviesListSkeleton />}
			</section>
			<div ref={observerRef} className="text-center text-gray-300">
				{!hasNextPage && !searchQuery.trim() && "Fin de la liste 🎬"}
				{searchQuery.trim() &&
					movies.length === 0 &&
					"Aucun film trouvé"}
			</div>
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

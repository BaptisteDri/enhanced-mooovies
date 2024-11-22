"use client"

import { CommonMovie } from "@/core/common/types/common-movie"
import { getInfinitePopularMovies } from "@/core/discover/queries/get-infinite-popular-movies"
import { DiscoverMovie } from "@/core/discover/types/discover-movies"
import { MovieCard } from "@/design-system/movie-card"
import { MovieDrawer } from "@/design-system/movie-drawer"
import { MoviesListSkeleton } from "@/design-system/movies-list-skeleton"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"

type Props = {
	userId: string
}

export const PopularMovies = ({ userId }: Props) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [selectedMovie, setSelectedMovie] = useState<DiscoverMovie>()
	const observerRef = useRef<HTMLDivElement>(null)

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
		useInfiniteQuery(getInfinitePopularMovies())

	useEffect(() => {
		if (!hasNextPage || isFetchingNextPage) return

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

	return (
		<>
			<h1 className="text-4xl font-semibold px-4">Films populaires</h1>
			<section className="grid grid-cols-3 gap-4 px-4">
				{isFetching &&
					!isFetchingNextPage &&
					!data?.pages?.[0]?.discoverMovies && <MoviesListSkeleton />}
				{data?.pages.map((page) =>
					page.discoverMovies.map((movie, i) => (
						<MovieCard
							movie={{ ...movie, type: "discover" }}
							key={i}
							sizes="33vw"
							setSelectedMovie={(movie) => {
								if (movie.type === "movie") return
								setSelectedMovie(movie)
								setIsDrawerOpen(true)
							}}
						/>
					)),
				)}
				{isFetchingNextPage && <MoviesListSkeleton />}
			</section>
			<div ref={observerRef} className="text-center text-gray-300">
				{!hasNextPage && "Fin de la liste 🎬"}
			</div>
			{selectedMovie && (
				<MovieDrawer
					movie={{ ...selectedMovie, type: "discover" }}
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

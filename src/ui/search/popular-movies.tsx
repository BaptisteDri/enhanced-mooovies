"use client"

import { getInfinitePopularMovies } from "@/core/discover/queries/get-infinite-popular-movies"
import { MovieCard } from "@/design-system/movie-card"
import { MoviesListSkeleton } from "@/design-system/movies-list-skeleton"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"

export const PopularMovies = () => {
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
							// setSelectedMovie={(movie) => {
							// 	if (movie.type === "discover") return
							// 	setSelectedMovie(movie)
							// 	setIsDrawerOpen(true)
							// }}
						/>
					)),
				)}
				{isFetchingNextPage && <MoviesListSkeleton />}
			</section>
			<div ref={observerRef} className="text-center text-gray-300">
				{!hasNextPage && "Fin de la liste 🎬"}
			</div>
		</>
	)
}

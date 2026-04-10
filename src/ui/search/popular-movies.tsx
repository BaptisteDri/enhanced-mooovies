"use client"

import { GetDiscoverMoviesResponse } from "@/core/discover/infrastructure/discover-movies.api"
import { mergeDiscoverPagesDedupedById } from "@/core/discover/merge-discover-pages"
import { getInfinitePopularMovies } from "@/core/discover/queries/get-infinite-popular-movies"
import { DiscoverMovie } from "@/core/discover/types/discover-movies"
import { MovieCard } from "@/design-system/movie-card"
import { MoviesListSkeleton } from "@/design-system/movies-list-skeleton"
import { DRAWER_IDS, useDrawer } from "@/ui/providers/drawer-provider"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useRef } from "react"

export const PopularMovies = () => {
	const { openDrawer } = useDrawer()

	const handleOpenDrawer = (movie: DiscoverMovie) => {
		openDrawer({
			id: DRAWER_IDS.MOVIE,
			data: { id: movie.id, origin: "search" },
		})
	}

	const observerRef = useRef<HTMLDivElement>(null)

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
		useInfiniteQuery<GetDiscoverMoviesResponse>({
			...getInfinitePopularMovies(),
			queryFn: ({ pageParam }) =>
				getInfinitePopularMovies().queryFn({
					pageParam: pageParam as any,
				}),
		})

	const movies = useMemo(
		() => mergeDiscoverPagesDedupedById(data?.pages),
		[data?.pages],
	)

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
			{ rootMargin: "100px", threshold: 0.1 },
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
				{movies
					.filter(
						(movie) =>
							movie.poster_path !== null &&
							movie.poster_path !== "",
					)
					.map((movie) => (
						<MovieCard
							movie={{ ...movie, type: "discover" }}
							key={movie.id}
							sizes="33vw"
							setSelectedMovie={(movie) => {
								if (movie.type === "movie") return
								handleOpenDrawer(movie)
							}}
						/>
					))}
				{isFetchingNextPage && <MoviesListSkeleton />}
			</section>
			<div ref={observerRef} className="text-center text-gray-300">
				{!hasNextPage && "Fin de la liste 🎬"}
			</div>
		</>
	)
}

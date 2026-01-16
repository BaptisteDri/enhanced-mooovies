"use client"

import { SearchMoviesResponse } from "@/core/discover/infrastructure/discover-movies.api"
import { getInfiniteSearchMovies } from "@/core/discover/queries/get-infinite-search-movies"
import { DiscoverMovie } from "@/core/discover/types/discover-movies"
import { MovieCard } from "@/design-system/movie-card"
import { MoviesListSkeleton } from "@/design-system/movies-list-skeleton"
import { DRAWER_IDS, useDrawer } from "@/ui/providers/drawer-provider"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"

type Props = { userId: string; searchQuery: string }

export const SearchResults = ({ userId, searchQuery }: Props) => {
	const { openDrawer } = useDrawer()

	const handleOpenDrawer = (movie: DiscoverMovie) => {
		console.log(movie)	
		openDrawer({ id: DRAWER_IDS.MOVIE, data: { id: movie.id, userId, origin: "search" } })
	}

	const observerRef = useRef<HTMLDivElement>(null)

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
		useInfiniteQuery<SearchMoviesResponse>({
			...getInfiniteSearchMovies(searchQuery),
			queryFn: ({ pageParam }) =>
				getInfiniteSearchMovies(searchQuery).queryFn({
					pageParam: pageParam as any,
				}),
		})

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

	if (!searchQuery) return null

	return (
		<>
			<h1 className="text-4xl font-semibold px-4">
				Résultats de recherche pour "{searchQuery}"
			</h1>
			<section className="grid grid-cols-3 gap-4 px-4">
				{isFetching &&
					!isFetchingNextPage &&
					!data?.pages?.[0]?.discoverMovies && <MoviesListSkeleton />}
				{data?.pages
					.filter(
						(page): page is SearchMoviesResponse =>
							page !== undefined,
					)
					.map((page) =>
						page.discoverMovies
							.filter(
								(movie) =>
									movie.poster_path !== null &&
									movie.poster_path !== "",
							)
							.map((movie, i) => (
								<MovieCard
									movie={{ ...movie, type: "discover" }}
									key={i}
									sizes="33vw"
									setSelectedMovie={(movie) => {
										if (movie.type === "movie") return
										handleOpenDrawer(movie)
									}}
								/>
							)),
					)}
				{isFetchingNextPage && <MoviesListSkeleton />}
			</section>
			<div ref={observerRef} className="text-center text-gray-300">
				{!hasNextPage &&
					data?.pages?.[0]?.discoverMovies &&
					"Fin de la liste 🎬"}
				{!hasNextPage &&
					!isFetching &&
					data?.pages?.[0]?.discoverMovies?.length === 0 &&
					"Aucun résultat trouvé"}
			</div>
			
		</>
	)
}

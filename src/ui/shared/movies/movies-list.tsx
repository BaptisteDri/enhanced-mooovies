"use client"

import { GetMoviesResponse } from "@/core/movies/infrastructure/movies.supabase"
import { Movie } from "@/core/movies/types/movie"
import { MovieCard } from "@/design-system/movie-card"
import { MoviesListSkeleton } from "@/design-system/movies-list-skeleton"
import { DRAWER_IDS, useDrawer } from "@/ui/providers/drawer-provider"
import { StickySearchBar } from "@/ui/shared/sticky-search-bar"
import { InfiniteData } from "@tanstack/react-query"
import { useEffect, useMemo, useRef } from "react"

export const LIMIT = 15

type Props = {
	userId: string
	title: string
	data: InfiniteData<GetMoviesResponse> | undefined
	fetchNextPage: () => void
	hasNextPage: boolean
	isFetchingNextPage: boolean
	isPending: boolean
	searchQuery: string
	onSearchChange: (query: string) => void
}

export const MoviesList = ({
	userId,
	title,
	data,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
	isPending,
	searchQuery,
	onSearchChange,
}: Props) => {
	const observerRef = useRef<HTMLDivElement>(null)

	const { openDrawer } = useDrawer()

	const handleOpenDrawer = (movie: Movie) => {
		openDrawer({ id: DRAWER_IDS.MOVIE, data: { id: movie.tmdb_id, userId, origin: "library" } })
	}

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
			<StickySearchBar onSearchChange={onSearchChange} />
			<h1 className="text-4xl font-semibold px-4">
				{title}
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
							handleOpenDrawer(movie)
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
		</>
	)
}

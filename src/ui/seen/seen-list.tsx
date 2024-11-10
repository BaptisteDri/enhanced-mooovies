"use client"

import { GetMoviesDto } from "@/core/movies/infrastructure/movies.supabase"
import { getInfiniteSeenMovies } from "@/core/movies/queries/get-infinite-seen-movies"
import { MovieCard } from "@/design-system/movie-card"
import { MoviesListSkeleton } from "@/design-system/movies-list-skeleton"
import { useInfiniteQuery } from "@tanstack/react-query"
import React, { useEffect, useRef } from "react"

type Props = {
	userId: string
}

export const SeenList = ({ userId }: Props) => {
	const observerRef = useRef<HTMLDivElement>(null)

	const dto: GetMoviesDto = {
		userId,
		seen: true,
		limit: 15,
		offset: 0,
		orderBy: "watched_date",
	}

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
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

	return (
		<>
			<h1 className="text-4xl font-semibold px-4">
				Vus
				{!!data?.pages[0].amount && (
					<span className="text-lg ml-2 text-gray-400 font-normal">
						({data?.pages[0].amount})
					</span>
				)}
			</h1>
			<section className="grid grid-cols-3 gap-4 px-4">
				{isFetching && !isFetchingNextPage && <MoviesListSkeleton />}
				{data?.pages.map((page, i) =>
					page.movies.map((movie, i) => (
						<MovieCard
							movie={{ ...movie, type: "movie" }}
							key={i}
							sizes="33vw"
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
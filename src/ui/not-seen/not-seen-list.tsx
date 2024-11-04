"use client"

import { getInfiniteNotSeenMovies } from "@/core/movies/queries/get-infinite-not-seen-movies"
import { MovieCard } from "@/design-system/movie-card"
import { useInfiniteQuery } from "@tanstack/react-query"
import React, { useEffect, useRef } from "react"

type Props = {
	userId: string
}

export const NotSeenList = ({ userId }: Props) => {
	const observerRef = useRef<HTMLDivElement>(null)

	const dto = {
		userId,
		seen: false,
		limit: 15,
		offset: 0,
	}

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery(getInfiniteNotSeenMovies({ dto }))

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
			<h1 className="text-4xl font-semibold px-4">
				À voir
				{!!data?.pages[0].amount && (
					<span className="text-lg ml-2 text-gray-400 font-normal">
						({data?.pages[0].amount})
					</span>
				)}
			</h1>
			<section className="grid grid-cols-3 gap-4 px-4">
				{data?.pages.map((page, i) =>
					page.movies.map((movie, i) => (
						<MovieCard
							movie={{ ...movie, type: "movie" }}
							key={i}
							sizes="33vw"
						/>
					)),
				)}
			</section>
			<div ref={observerRef}>
				{isFetchingNextPage
					? "Loading more..."
					: hasNextPage
						? "Load More"
						: "Nothing more to load"}
			</div>
		</>
	)
}

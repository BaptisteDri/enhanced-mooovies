"use client"

import { getInfiniteMovies } from "@/core/movies/queries/get-infinite-movies"
import { MovieCard } from "@/design-system/movie-card"
import { useInfiniteQuery } from "@tanstack/react-query"
import React from "react"

type Props = {
	userId: string
}

export const SeenList = ({ userId }: Props) => {
	const dto = {
		userId,
		seen: true,
		limit: 15,
		offset: 0,
	}

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery(getInfiniteMovies({ dto }))

	return (
		<>
			<h1 className="text-4xl font-semibold px-4">
				Revoir
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
						/>
					)),
				)}
			</section>
			<button
				disabled={!hasNextPage || isFetchingNextPage}
				onClick={() => fetchNextPage()}
			>
				{isFetchingNextPage
					? "Loading more..."
					: hasNextPage
						? "Load More"
						: "Nothing more to load"}
			</button>
		</>
	)
}

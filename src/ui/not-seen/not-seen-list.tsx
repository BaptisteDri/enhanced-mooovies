"use client"

import { getInfiniteMovies } from "@/core/movies/queries/get-infinite-movies"
import { useInfiniteQuery } from "@tanstack/react-query"
import React from "react"

type Props = {
	userId: string
}

export const NotSeenList = ({ userId }: Props) => {
	const dto = {
		userId,
		seen: false,
		limit: 20,
		offset: 0,
	}

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery(getInfiniteMovies({ dto }))

	return (
		<section>
			<h1>Films à voir</h1>
			<ul>
				{data?.pages.map((page, i) => (
					<React.Fragment key={i}>
						{page?.movies.map((movie, i) => (
							<li key={i}>{movie.title}</li>
						))}
					</React.Fragment>
				))}
			</ul>
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
		</section>
	)
}

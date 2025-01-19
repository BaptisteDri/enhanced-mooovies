"use client"

import { CommonMovie } from "@/core/common/types/common-movie"
import { getInfiniteNotSeenMovies } from "@/core/movies/queries/get-infinite-not-seen-movies"
import { Movie } from "@/core/movies/types/movie"
import { MovieCard } from "@/design-system/movie-card"
import { MovieDrawer } from "@/design-system/movie-drawer"
import { MoviesListSkeleton } from "@/design-system/movies-list-skeleton"
import { useInfiniteQuery } from "@tanstack/react-query"
import React, { useEffect, useRef, useState } from "react"

type Props = {
	userId: string
}

export const NotSeenList = ({ userId }: Props) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [selectedMovie, setSelectedMovie] = useState<Movie>()
	const observerRef = useRef<HTMLDivElement>(null)

	const dto = {
		userId,
		seen: false,
		limit: 15,
		offset: 0,
	}

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
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
				{isFetching &&
					!isFetchingNextPage &&
					!data?.pages?.[0]?.movies && <MoviesListSkeleton />}
				{data?.pages.map((page) =>
					page.movies.map((movie, i) => (
						<MovieCard
							movie={{ ...movie, type: "movie" }}
							key={i}
							sizes="33vw"
							setSelectedMovie={(movie) => {
								if (movie.type === "discover") return
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

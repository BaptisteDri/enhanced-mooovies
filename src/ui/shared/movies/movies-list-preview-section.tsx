"use client"

import { CommonMovie } from "@/core/common/types/common-movie"
import { Movie } from "@/core/movies/types/movie"
import { Icon } from "@/design-system/icons"
import { MovieCard } from "@/design-system/movie-card"
import Link from "next/link"

type Props = {
	amount?: number | null
	href: string
	title: string
	movies: Movie[]
	setSelectedMovie: (movie?: Movie) => void
}

export const MoviesListPreviewSection = ({
	amount,
	href,
	title,
	movies,
	setSelectedMovie,
}: Props) => {
	return (
		<section className="space-y-4">
			<section className="px-4 flex justify-between items-baseline">
				<h2 className="font-medium text-xl">
					{title}
					{typeof amount !== "undefined" && !!amount && (
						<span className="text-sm ml-2 text-gray-400 font-normal">
							({amount})
						</span>
					)}
				</h2>
				<Link href={href} className="text-sm text-gray-400">
					voir plus
				</Link>
			</section>
			<div className="flex gap-4 overflow-x-auto no-scrollbar px-4">
				{movies.map((movie, i) => (
					<MovieCard
						setSelectedMovie={
							setSelectedMovie as (movie: CommonMovie) => void
						}
						movie={{ ...movie, type: "movie" }}
						key={i}
						className={"min-w-[33vw] lg:min-w-40"}
					/>
				))}
				{movies.length === 0 && (
					<Link
						href="/recherche"
						className="rounded-md aspect-2/3 bg-gray-900 min-w-[33vw] lg:min-w-40 flex items-center justify-center flex-col gap-2 text-sm text-gray-300"
					>
						<Icon name="plus-circle" size={24} />
						Ajouter un film
					</Link>
				)}
			</div>
		</section>
	)
}

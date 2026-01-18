"use client"

import Link from "next/link"
import Image from "next/image"
import { categories } from "@/core/categories/categories"
import { getOneMoviePerCategory } from "@/core/movies/queries/get-one-movie-per-category"
import { twMerge } from "tailwind-merge"
import { useQuery } from "@tanstack/react-query"

export const categoriesColor: Record<number, string> = {
	28: "to-red-700/30",
	12: "to-amber-700/30",
	16: "to-yellow-700/30",
	35: "to-sky-700/30",
	80: "to-gray-700/30",
	99: "to-blue-700/30",
	18: "to-orange-700/30",
	10751: "to-cyan-700/30",
	14: "to-yellow-700/30",
	36: "to-yellow-700/30",
	27: "to-gray-700/30",
	10402: "to-gray-700/30",
	9648: "to-stone-700/30",
	10749: "to-rose-700/30",
	878: "to-indigo-700/30",
	10770: "to-amber-700/30",
	53: "to-blue-700/30",
	10752: "to-lime-700/30",
	37: "to-yellow-700/30",
}

type Props = {
	userId: string
}

export const CategoriesListSection = ({ userId }: Props) => {
	const categoryIds = categories.map((category) => category.id)

	// @TODO: voir s'il faut invalider cette query ?
	const { data: moviesPerCategory, isPending } = useQuery(
		getOneMoviePerCategory({
			dto: {
				userId,
				categoryIds,
			},
			enabled: !!userId,
		}),
	)

	return (
		<section className="space-y-4 px-4">
			<h2 className="font-medium text-xl">À voir par catégories</h2>
			<div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{/* @TODO: ajouter un skeleton & mapper sur moviesPerCategory*/}
				{categories.map((category) => {
					const movie = moviesPerCategory?.[category.id]
					const hasMovie = !!movie && !!movie.poster

					return (
						<Link
							href={`/a-voir?category=${category.id}`}
							key={category.id}
							className={twMerge(
								"aspect-video rounded-md flex flex-col gap-2 justify-between py-2 px-3 shadow-lg relative overflow-hidden",
								"bg-linear-to-br from-transparent via-transparent bg-gray-900",
								categoriesColor[category.id],
							)}
						>
							{hasMovie && (
								<div className="absolute inset-0 opacity-50 blur-xs">
									<Image
										src={`https://image.tmdb.org/t/p/w342/${movie.poster}`}
										alt={`${movie.title} poster`}
										fill
										className="object-cover object-center"
										sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
									/>
								</div>
							)}
							<span className="font-medium relative z-10">
								{category.name}
							</span>
							<span className="text-4xl text-right relative z-10">
								{category.icon}
							</span>
						</Link>
					)
				})}
			</div>
		</section>
	)
}

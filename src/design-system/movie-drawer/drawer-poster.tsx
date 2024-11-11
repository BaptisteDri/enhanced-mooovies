"use client"

import { CommonMovie } from "@/core/common/types/common-movie"
import Image from "next/image"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
	movie: CommonMovie
}

export const DrawerPoster = ({ movie }: Props) => {
	const [isMainImageLoaded, setIsMainImageLoaded] = useState<boolean>(false)
	const [isBackgroundImageLoaded, setIsBackgroundImageLoaded] =
		useState<boolean>(false)

	return (
		<section
			className={twMerge(
				"relative aspect-[2/3] w-32 mb-6 bg-gray-800 rounded-md",
				!isMainImageLoaded &&
					!isBackgroundImageLoaded &&
					"animate-pulse",
			)}
		>
			<Image
				src={`https://image.tmdb.org/t/p/w342/${movie.type === "discover" ? movie.poster_path : movie.poster}`}
				alt={`${movie.title} poster`}
				fill
				className={twMerge(
					"object-cover object-top blur-3xl transition-all duration-300",
					isBackgroundImageLoaded ? "opacity-100" : "opacity-0",
				)}
				sizes="128px"
				onLoad={() => setIsBackgroundImageLoaded(true)}
				style={{
					transform: "translateZ(0)",
				}}
			/>
			<Image
				src={`https://image.tmdb.org/t/p/w342/${movie.type === "discover" ? movie.poster_path : movie.poster}`}
				alt={`${movie.title} poster`}
				fill
				className={twMerge(
					"object-cover object-top rounded-md transition-opacity duration-500",
					isMainImageLoaded ? "opacity-100" : "opacity-0",
				)}
				sizes="128px"
				onLoad={() => setIsMainImageLoaded(true)}
			/>
		</section>
	)
}

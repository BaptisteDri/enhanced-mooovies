import Link from "next/link"
import Image from "next/image"
import { twMerge } from "tailwind-merge"

type Props = {
	poster: string
	title: string
	className?: string
	clickable?: boolean
}

export const MovieCard = ({
	poster,
	title,
	className,
	clickable = true,
}: Props) => (
	<div
		className={twMerge(
			"relative overflow-hidden rounded-md aspect-[2/3] flex bg-gray-900",
			className,
		)}
		role={clickable ? "button" : undefined}
	>
		<Image
			src={`https://image.tmdb.org/t/p/w342/${poster}`}
			alt={`${title} poster`}
			fill
			className="object-cover object-center"
			sizes="300px"
			quality={20}
			priority
		/>
	</div>
)

import Link from "next/link"
import Image from "next/image"
import { twMerge } from "tailwind-merge"

type Props = {
	poster: string
	title: string
	className?: string
}

export const MovieCard = ({ poster, title, className }: Props) => (
	<Link
		href={"#"}
		className={twMerge(
			"relative overflow-hidden rounded-md aspect-[2/3] flex group bg-gray-900",
			className,
		)}
	>
		<Image
			src={`https://image.tmdb.org/t/p/original/${poster}`}
			alt={`${title} poster`}
			fill
			className="object-cover object-center md:group-hover:scale-105 transition-all duration-300 ease-in-out"
			sizes="33vw"
			quality={30}
		/>
	</Link>
)

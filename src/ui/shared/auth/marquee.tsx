import Image from "next/image"
import { twMerge } from "tailwind-merge"

type Props = {
	moviesPosters: string[]
	reverse?: boolean
}

const Posters = ({ moviesPosters }: Pick<Props, "moviesPosters">) => (
	<>
		{moviesPosters.map(({ poster_path }: any, i) => (
			<div
				key={i}
				className="relative overflow-hidden rounded-md border border-gray-700 aspect-[2/3]"
			>
				<Image
					src={`https://image.tmdb.org/t/p/original/${poster_path}`}
					alt={"movie poster"}
					height={450}
					width={300}
					className="object-cover object-center"
				/>
			</div>
		))}
	</>
)

export const Marquee = ({ moviesPosters, reverse }: Props) => (
	<div className="flex relative">
		<div
			className={twMerge(
				"w-full grid grid-cols-4 gap-4 pl-4",
				reverse ? "animate-reverse-marquee" : "animate-marquee",
			)}
		>
			<Posters moviesPosters={moviesPosters} />
		</div>
		<div
			className={twMerge(
				"w-full absolute top-0 grid grid-cols-4 gap-4 pl-4",
				reverse ? "animate-reverse-marquee2" : "animate-marquee2",
			)}
		>
			<Posters moviesPosters={moviesPosters} />
		</div>
	</div>
)

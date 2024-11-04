import { DiscoverMovie } from "@/core/discover/discover-movies"
import { Movie } from "@/core/movies/types/movie"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
import { Drawer } from "vaul"

type Props = {
	movie: ({ type: "movie" } & Movie) | ({ type: "discover" } & DiscoverMovie)
	className?: string
}

export const MovieDrawer = ({ movie, className }: Props) => (
	<Drawer.Root>
		<Drawer.Trigger asChild>
			<button
				className={twMerge(
					"relative overflow-hidden rounded-md aspect-[2/3] flex bg-gray-900",
					className,
				)}
			>
				<Image
					src={`https://image.tmdb.org/t/p/w342/${movie.type === "discover" ? movie.poster_path : movie.poster}`}
					alt={`${movie.title} poster`}
					fill
					className="object-cover object-center"
					sizes="300px"
					priority
				/>
			</button>
		</Drawer.Trigger>
		<Drawer.Portal>
			<Drawer.Overlay className="fixed inset-0 bg-gray-950/40 z-20" />
			<Drawer.Content className="bg-gray-900 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 z-30">
				<div className="bg-gray-900 rounded-t-[10px] flex-1 overflow-hidden">
					<div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-700 mt-5" />

					<div className="max-w-md mx-auto p-4">
						<section className="relative overflow-hidden rounded-md aspect-[2/3] flex bg-gray-900 w-32 mb-6">
							<Image
								src={`https://image.tmdb.org/t/p/w342/${movie.type === "discover" ? movie.poster_path : movie.poster}`}
								alt={`${movie.title} poster`}
								fill
								className="object-cover object-top"
								sizes="100vw"
							/>
						</section>

						<Drawer.Title className="font-medium mb-4" asChild>
							<h2 className="text-2xl font-semibold">
								{movie.title}
							</h2>
						</Drawer.Title>
						<p className="text-gray-400 mb-2">{movie.overview}</p>
					</div>
				</div>
			</Drawer.Content>
		</Drawer.Portal>
	</Drawer.Root>
)

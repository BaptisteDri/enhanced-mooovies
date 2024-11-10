import { DiscoverMovie } from "@/core/discover/discover-movies"
import { Movie } from "@/core/movies/types/movie"
import { Button } from "@/design-system/button"
import { Icon } from "@/design-system/icons"
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
			<Drawer.Content
				aria-describedby={""} // @TODO: Add aria-describedby with the movie id
				className="bg-gray-900 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 z-30"
			>
				<div className="bg-gray-900 rounded-t-[10px] flex-1 overflow-hidden">
					<div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-700 mt-5" />

					<div className="max-w-md mx-auto p-4">
						<section className="relative overflow-hidden rounded-md aspect-[2/3] flex bg-gray-900 w-32 mb-6">
							<Image
								src={`https://image.tmdb.org/t/p/w342/${movie.type === "discover" ? movie.poster_path : movie.poster}`}
								alt={`${movie.title} poster`}
								fill
								className="object-cover object-top"
								sizes="128px"
							/>
						</section>
						{movie.type === "movie" && !!movie.watched_date && (
							<p className="mb-4 border w-fit px-3 py-1.5 text-sm border-indigo-500 rounded-md bg-gradient-to-br from-indigo-950 to-indigo-900 flex items-center gap-2">
								<Icon name="eye" size={12} />
								Vu le{" "}
								{new Date(
									movie.watched_date,
								).toLocaleDateString()}
							</p>
						)}
						<Drawer.Title className="font-medium mb-4" asChild>
							<h2 className="text-2xl font-semibold">
								{movie.title}
								{movie.title !== movie.original_title && (
									<>
										<br />
										<span className="text-base text-gray-400 font-normal italic">
											{movie.original_title}
										</span>
									</>
								)}
							</h2>
						</Drawer.Title>

						<p className="mb-2 line-clamp-4">{movie.overview}</p>
						<section className="flex gap-4 mt-6 border-t border-gray-800 pt-4">
							{movie.type === "movie" && !!movie.watched_date ? (
								<Button
									intent={"secondary"}
									className="flex-1 [&>span]:flex [&>span]:items-center [&>span]:gap-3 py-0 h-12"
								>
									<Icon name="eye-slash" size={20} />
									Retirer des films vus
								</Button>
							) : (
								<Button className="flex-1 [&>span]:flex [&>span]:items-center [&>span]:gap-3 py-0 h-12">
									<Icon name="eye" size={20} />
									Marquer comme vu
								</Button>
							)}

							<Button
								className="w-12 p-0"
								intent={
									movie.type === "movie" && !!movie.added_date
										? "secondary"
										: "primary"
								}
							>
								<Icon
									name={
										movie.type === "movie" &&
										!!movie.added_date
											? "check"
											: "plus"
									}
									size={20}
								/>
							</Button>
						</section>
					</div>
				</div>
			</Drawer.Content>
		</Drawer.Portal>
	</Drawer.Root>
)

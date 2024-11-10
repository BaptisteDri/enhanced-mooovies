"use client"

import { CommonMovie } from "@/core/common/types/common-movie"
import { DrawerActions } from "@/design-system/movie-drawer/drawer-actions"
import { DrawerPoster } from "@/design-system/movie-drawer/drawer-poster"
import { DrawerTitle } from "@/design-system/movie-drawer/drawer-title"
import { SeenChip } from "@/design-system/movie-drawer/seen-chip"
import { Drawer } from "vaul"

type Props = {
	movie: CommonMovie
	className?: string
	setOpen: (open: boolean) => void
	open: boolean
	setSelectedMovie?: (movie?: CommonMovie) => void
}

export const MovieDrawer = ({
	movie,
	open,
	setOpen,
	setSelectedMovie,
}: Props) => {
	return (
		<>
			<Drawer.Root
				open={open}
				onOpenChange={setOpen}
				onAnimationEnd={() => setSelectedMovie?.(undefined)}
			>
				<Drawer.Portal>
					<Drawer.Overlay className="fixed inset-0 bg-gray-950/50 z-20" />
					<Drawer.Content
						aria-describedby={""} // @TODO: Add aria-describedby with the movie id
						className="bg-gray-900 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 z-30"
					>
						<div className="bg-gray-900 rounded-t-[10px] flex-1 overflow-hidden">
							<div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-700 mt-5" />
							<div className="max-w-md mx-auto p-4">
								<DrawerPoster movie={movie} />
								<SeenChip movie={movie} />
								<DrawerTitle
									original_title={movie.original_title}
									title={movie.title}
								/>

								<p className="mb-2 line-clamp-4">
									{movie.overview}
								</p>

								<DrawerActions movie={movie} />
							</div>
						</div>
					</Drawer.Content>
				</Drawer.Portal>
			</Drawer.Root>
		</>
	)
}

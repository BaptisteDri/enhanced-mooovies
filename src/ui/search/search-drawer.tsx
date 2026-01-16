"use client"

import { categories } from "@/core/categories/categories"
import { Icon } from "@/design-system/icons"
import { twMerge } from "tailwind-merge"
import { Drawer } from "vaul"
import type { DrawerProps } from "@/ui/providers/drawer-render"

export const SearchDrawer = ({
	closeDrawer,
	data,
	isOpen,
}: DrawerProps) => {
	const selectedGenres = (data?.selectedGenres as number[]) ?? []
	const onGenresChange = (data?.onGenresChange as (genreIds: number[]) => void) ?? (() => {})
	const toggleGenre = (genreId: number) => {
		const newGenres = selectedGenres.includes(genreId)
			? selectedGenres.filter((id) => id !== genreId)
			: [...selectedGenres, genreId]
		onGenresChange(newGenres)
	}

	const clearGenres = () => {
		onGenresChange([])
	}

	return (
		<Drawer.Root open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-gray-950/50 z-40" />
				<Drawer.Content className="bg-gray-900 flex flex-col fixed right-0 top-0 bottom-0 z-50 w-full sm:w-96 h-full rounded-l-lg border-l border-gray-800 shadow-xl translate-y-0! translate-x-full data-[state=open]:translate-x-0 transition-transform duration-300 ease-out">
					<div className="bg-gray-900 flex-1 overflow-hidden flex flex-col">
						<div className="p-4 border-b border-gray-800 flex items-center justify-between">
							<Drawer.Title className="text-lg font-semibold text-gray-200">
								Filtrer par genre
							</Drawer.Title>
							<div className="flex items-center gap-3">
								{selectedGenres.length > 0 && (
									<button
										type="button"
										onClick={clearGenres}
										className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
									>
										Tout effacer
									</button>
								)}
								<Drawer.Close asChild>
									<button
										type="button"
										className="text-gray-400 hover:text-gray-300 transition-colors"
									>
										<Icon name="x-mark" size={20} />
									</button>
								</Drawer.Close>
							</div>
						</div>
						<div className="flex-1 overflow-y-auto p-4">
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
								{categories.map((category) => {
									const isSelected = selectedGenres.includes(category.id)
									return (
										<button
											key={category.id}
											type="button"
											onClick={() => toggleGenre(category.id)}
											className={twMerge(
												"flex items-center gap-2 px-3 py-2 rounded-md text-sm",
												"transition-colors border",
												isSelected
													? "bg-indigo-950/50 border-indigo-600 text-indigo-300"
													: "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700",
											)}
										>
											<span>{category.icon}</span>
											<span className="truncate">{category.name}</span>
										</button>
									)
								})}
							</div>
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	)
}

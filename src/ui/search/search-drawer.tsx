"use client"

import { categories } from "@/core/categories/categories"
import { Icon } from "@/design-system/icons"
import { FilterButton } from "@/design-system/filter-button"
import { Drawer } from "vaul"
import type { DrawerProps } from "@/ui/providers/drawer-render"
import { useState } from "react"

type Data = {
	moviesType: "watched" | "all"
}

export const SearchDrawer = ({
	closeDrawer,
	isOpen,
	data,
}: DrawerProps) => {
	const { moviesType } = data as Data
	const [selectedGenre, setSelectedGenre] = useState<number | null>(null)

	const toggleGenre = (genreId: number) => {
		setSelectedGenre(genreId)
		closeDrawer()
	}

	const clearGenres = () => {
		setSelectedGenre(null)
	}

	return (
		<Drawer.Root open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-gray-950/50 z-20" />
				<Drawer.Content className="bg-gray-900 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 z-30">
					<div className="bg-gray-900 flex-1 overflow-hidden flex flex-col">
						<div className="p-4 border-b border-gray-800 flex items-center justify-between">
							<Drawer.Title className="text-lg font-semibold text-gray-200">
								Filtrer et trier les films
							</Drawer.Title>
							<div className="flex items-center gap-3">
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
						<div className="flex-1 overflow-y-auto p-4 space-y-4">
							<section>
								<h2 className="mb-2 font-medium text-gray-200">Trier par</h2>
								<div className="flex flex-wrap gap-2">
									{
										moviesType === "watched" && (
											<FilterButton
												icon="👀"
												label="Date de visionnage"
												isSelected={false}
												onClick={() => { }}
											/>
										)
									}
									<FilterButton
										icon="📆"
										label="Date d'ajout"
										isSelected={false}
										onClick={() => { }}
									/>
									<FilterButton
										icon="🎥"
										label="Date de sortie"
										isSelected={false}
										onClick={() => { }}
									/>
									<FilterButton
										icon="🔠"
										label="Titre"
										isSelected={false}
										onClick={() => { }}
									/>
								</div>
							</section>
							<section>
								<h2 className="mb-2 font-medium text-gray-200">Catégories</h2>
								<div className="flex flex-wrap gap-2">
									<FilterButton
										icon="🎬"
										label="Toutes"
										isSelected={!selectedGenre}
										onClick={clearGenres}
									/>
									{categories.map((category) => {
										const isSelected = selectedGenre === category.id
										return (
											<FilterButton
												key={category.id}
												icon={category.icon}
												label={category.name}
												isSelected={isSelected}
												onClick={() => toggleGenre(category.id)}
											/>
										)
									})}
								</div>
							</section>
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal >
		</Drawer.Root >
	)
}

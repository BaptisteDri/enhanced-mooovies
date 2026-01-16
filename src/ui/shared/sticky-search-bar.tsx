"use client"

import { Button } from "@/design-system/button"
import { Icon } from "@/design-system/icons"
import { Input } from "@/design-system/input"
import { DRAWER_IDS, useDrawer } from "@/ui/providers/drawer-provider"

type Props = {
	onSearchChange: (query: string) => void
	placeholder?: string
}

export const StickySearchBar = ({
	onSearchChange,
	placeholder = "Rechercher un titre de film...",
}: Props) => {
	const { openDrawer } = useDrawer()

	const handleOpenDrawer = () => {
		openDrawer({ id: DRAWER_IDS.SEARCH })
	}

	return (
		<div className="sticky top-0 z-10 bg-gray-950 py-3 px-4 mb-4! flex gap-2">
			<Input
				parentClassName="flex-1"
				type="text"
				placeholder={placeholder}
				icon="magnifying-glass"
				iconPosition="left"
				onChange={(e) => onSearchChange(e.target.value)}
			/>
			<Button intent="secondary" onClick={handleOpenDrawer} className="size-12 p-0">
				<Icon name="lock-closed" size={20} />
			</Button>
		</div>
	)
}

"use client"

import { Input } from "@/design-system/input"

type Props = {
	onSearchChange: (query: string) => void
	placeholder?: string
}

export const StickySearchBar = ({
	onSearchChange,
	placeholder = "Rechercher un titre de film...",
}: Props) => {
	return (
		<div className="sticky top-0 z-10 bg-gray-950 py-3 px-4 mb-4!">
			<Input
				type="text"
				placeholder={placeholder}
				icon="magnifying-glass"
				iconPosition="left"
				onChange={(e) => onSearchChange(e.target.value)}
			/>
		</div>
	)
}

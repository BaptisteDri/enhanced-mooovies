"use client"

import { Input } from "@/design-system/input"
import { useEffect, useState } from "react"

type Props = {
	onSearchChange: (query: string) => void
	placeholder?: string
}

export const StickySearchBar = ({
	onSearchChange,
	placeholder = "Rechercher un titre de film...",
}: Props) => {
	const [searchQuery, setSearchQuery] = useState("")

	useEffect(() => {
		const timer = setTimeout(() => {
			onSearchChange(searchQuery)
		}, 500)

		return () => clearTimeout(timer)
	}, [searchQuery, onSearchChange])

	return (
		<div className="sticky top-0 z-10 bg-gray-950 py-3 px-4 mb-4!">
			<Input
				type="text"
				placeholder={placeholder}
				icon="magnifying-glass"
				iconPosition="left"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
		</div>
	)
}

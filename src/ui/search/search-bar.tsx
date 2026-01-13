"use client"

import { Input } from "@/design-system/input"
import { useEffect, useState } from "react"

type Props = { onSearchChange: (query: string) => void }

export const SearchBar = ({ onSearchChange }: Props) => {
	const [searchQuery, setSearchQuery] = useState("")

	useEffect(() => {
		const timer = setTimeout(() => {
			onSearchChange(searchQuery)
		}, 500)

		return () => clearTimeout(timer)
	}, [searchQuery, onSearchChange])

	return (
		<div className="px-4">
			<Input
				type="text"
				placeholder="Rechercher un titre de film..."
				icon="magnifying-glass"
				iconPosition="left"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
		</div>
	)
}

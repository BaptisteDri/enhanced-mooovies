"use client"

import { Input } from "@/design-system/input"
import { useSearchQuery } from "@/ui/shared/hooks/use-search-query"

type Props = { onSearchChange: (query: string) => void }

export const SearchBar = ({ onSearchChange }: Props) => {
	const { searchQuery, setSearchQuery } = useSearchQuery({ onSearchChange })

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

import { useEffect, useState } from "react"

type Options = {
	onSearchChange?: (query: string) => void
	debounceDelay?: number
}

export const useSearchQuery = ({
	onSearchChange,
	debounceDelay = 500,
}: Options = {}) => {
	const [searchQuery, setSearchQuery] = useState("")
	const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchQuery(searchQuery)
			onSearchChange?.(searchQuery)
		}, debounceDelay)

		return () => clearTimeout(timer)
	}, [searchQuery, onSearchChange, debounceDelay])

	return { searchQuery, setSearchQuery, debouncedSearchQuery } as const
}

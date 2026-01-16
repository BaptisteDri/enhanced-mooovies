"use client"

import { createContext, useContext, useState, ReactNode } from "react"


export type SortOption =
	| "watched_date"
	| "added_date"
	| "year"
	| "title"

type SearchFiltersState = {
	selectedCategory: number | null
	sortBy: SortOption
}

type SearchFiltersContextType = {
	selectedCategory: number | null
	sortBy: SortOption
	setSelectedCategory: (category: number | null) => void
	setSortBy: (sort: SortOption) => void
	resetFilters: () => void
}

const SearchFiltersContext = createContext<
	SearchFiltersContextType | undefined
>(undefined)

type Props = {
	children: ReactNode
}

export const SearchFiltersProvider = ({ children }: Props) => {
	const [filters, setFilters] = useState<SearchFiltersState>({
		selectedCategory: null,
		sortBy: "added_date",
	})


	const setSelectedCategory = (category: number | null) => {
		setFilters((prev) => ({ ...prev, selectedCategory: category }))
	}

	const setSortBy = (sort: SortOption) => {
		setFilters((prev) => ({ ...prev, sortBy: sort }))
	}

	const resetFilters = () => {
		setFilters({
			selectedCategory: null,
			sortBy: "added_date",
		})
	}

	return (
		<SearchFiltersContext.Provider
			value={{
				selectedCategory: filters.selectedCategory,
				sortBy: filters.sortBy,
				setSelectedCategory,
				setSortBy,
				resetFilters,
			}}
		>
			{children}
		</SearchFiltersContext.Provider>
	)
}

export const useSearchFilters = () => {
	const context = useContext(SearchFiltersContext)
	if (!context) {
		throw new Error(
			"useSearchFilters doit être wrap par SearchFiltersProvider",
		)
	}
	return context
}

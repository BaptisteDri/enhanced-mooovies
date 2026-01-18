"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { getCategoryFromUrl } from "@/ui/shared/utils/get-category-from-url"


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
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	const [filters, setFilters] = useState<SearchFiltersState>({
		selectedCategory: getCategoryFromUrl(searchParams),
		sortBy: "added_date",
	})

	// Synchroniser l'état avec les search params quand l'URL change
	useEffect(() => {
		const category = getCategoryFromUrl(searchParams)
		setFilters((prev) => ({
			...prev,
			selectedCategory: category,
		}))
	}, [searchParams])

	const setSelectedCategory = (category: number | null) => {
		setFilters((prev) => ({ ...prev, selectedCategory: category }))

		// Synchroniser l'URL avec la nouvelle catégorie
		const params = new URLSearchParams(searchParams.toString())
		if (category !== null) {
			params.set("category", category.toString())
		} else {
			params.delete("category")
		}
		router.replace(`${pathname}?${params.toString()}`, { scroll: false })
	}

	const setSortBy = (sort: SortOption) => {
		setFilters((prev) => ({ ...prev, sortBy: sort }))
	}

	const resetFilters = () => {
		setFilters({
			selectedCategory: null,
			sortBy: "added_date",
		})

		// Synchroniser l'URL en supprimant la catégorie
		const params = new URLSearchParams(searchParams.toString())
		params.delete("category")
		router.replace(`${pathname}?${params.toString()}`, { scroll: false })
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

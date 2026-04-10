"use client"

import { PopularMovies } from "@/ui/search/popular-movies"
import { SearchResults } from "@/ui/search/search-results"
import { useSearchQuery } from "@/ui/shared/hooks/use-search-query"
import { StickySearchBar } from "@/ui/shared/sticky-search-bar"

export const SearchPage = () => {
	const { setSearchQuery, debouncedSearchQuery } = useSearchQuery()

	return (
		<>
			<StickySearchBar onSearchChange={setSearchQuery} moviesType="all" />
			{debouncedSearchQuery ? (
				<SearchResults searchQuery={debouncedSearchQuery} />
			) : (
				<PopularMovies />
			)}
		</>
	)
}

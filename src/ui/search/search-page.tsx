"use client"

import { PopularMovies } from "@/ui/search/popular-movies"
import { SearchResults } from "@/ui/search/search-results"
import { useSearchQuery } from "@/ui/shared/hooks/use-search-query"
import { StickySearchBar } from "@/ui/shared/sticky-search-bar"

type Props = { userId: string }

export const SearchPage = ({ userId }: Props) => {
	const { setSearchQuery, debouncedSearchQuery } = useSearchQuery()

	return (
		<>
			<StickySearchBar onSearchChange={setSearchQuery} />
			{debouncedSearchQuery ? (
				<SearchResults
					userId={userId}
					searchQuery={debouncedSearchQuery}
				/>
			) : (
				<PopularMovies userId={userId} />
			)}
		</>
	)
}

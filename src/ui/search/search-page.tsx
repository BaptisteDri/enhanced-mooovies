"use client"

import { PopularMovies } from "@/ui/search/popular-movies"
import { SearchBar } from "@/ui/search/search-bar"
import { SearchResults } from "@/ui/search/search-results"
import { useState } from "react"

type Props = { userId: string }

export const SearchPage = ({ userId }: Props) => {
	const [searchQuery, setSearchQuery] = useState("")

	return (
		<>
			<SearchBar onSearchChange={setSearchQuery} />
			{searchQuery ? (
				<SearchResults userId={userId} searchQuery={searchQuery} />
			) : (
				<PopularMovies userId={userId} />
			)}
		</>
	)
}

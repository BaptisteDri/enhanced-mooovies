"use client"

import { GetMoviesDto } from "@/core/movies/infrastructure/movies.supabase"
import { getInfiniteNotSeenMovies } from "@/core/movies/queries/get-infinite-not-seen-movies"
import { LIMIT, MoviesList } from "@/ui/shared/movies/movies-list"
import { useSearchQuery } from "@/ui/shared/hooks/use-search-query"
import { useSearchFilters } from "@/ui/providers/search-filters-provider"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useMemo } from "react"

export const NotSeenList = () => {
	const { setSearchQuery, debouncedSearchQuery } = useSearchQuery()
	const { sortBy, selectedCategory } = useSearchFilters()

	const dto: GetMoviesDto = useMemo(
		() => ({
			seen: false,
			limit: LIMIT,
			offset: 0,
			orderBy: sortBy,
			ascending: sortBy === "title" ? true : false,
			searchQuery: debouncedSearchQuery.trim() || undefined,
			categoryId: selectedCategory || undefined,
		}),
		[debouncedSearchQuery, sortBy, selectedCategory],
	)

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
		useInfiniteQuery(getInfiniteNotSeenMovies({ dto }))

	return (
		<MoviesList
			title="À voir"
			data={data}
			fetchNextPage={fetchNextPage}
			hasNextPage={hasNextPage ?? false}
			isFetchingNextPage={isFetchingNextPage}
			isPending={isPending}
			searchQuery={debouncedSearchQuery}
			onSearchChange={setSearchQuery}
			moviesType="not-seen"
		/>
	)
}

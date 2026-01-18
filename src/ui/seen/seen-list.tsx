"use client"

import { GetMoviesDto } from "@/core/movies/infrastructure/movies.supabase"
import { getInfiniteSeenMovies } from "@/core/movies/queries/get-infinite-seen-movies"
import { LIMIT, MoviesList } from "@/ui/shared/movies/movies-list"
import { useSearchQuery } from "@/ui/shared/hooks/use-search-query"
import { useSearchFilters } from "@/ui/providers/search-filters-provider"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useMemo } from "react"

type Props = {
	userId: string
}

export const SeenList = ({ userId }: Props) => {
	const { setSearchQuery, debouncedSearchQuery } = useSearchQuery()
	const { sortBy, selectedCategory } = useSearchFilters()

	const dto: GetMoviesDto = useMemo(
		() => ({
			userId,
			seen: true,
			limit: LIMIT,
			offset: 0,
			orderBy: sortBy,
			ascending: sortBy === "title",
			searchQuery: debouncedSearchQuery.trim() || undefined,
			categoryId: selectedCategory || undefined,
		}),
		[userId, debouncedSearchQuery, sortBy, selectedCategory],
	)

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
		useInfiniteQuery(getInfiniteSeenMovies({ dto }))

	return (
		<MoviesList
			userId={userId}
			title="Vus"
			data={data}
			fetchNextPage={fetchNextPage}
			hasNextPage={hasNextPage ?? false}
			isFetchingNextPage={isFetchingNextPage}
			isPending={isPending}
			searchQuery={debouncedSearchQuery}
			onSearchChange={setSearchQuery}
			moviesType="watched"
		/>
	)
}

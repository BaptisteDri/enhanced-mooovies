"use client"

import { GetMoviesDto } from "@/core/movies/infrastructure/movies.supabase"
import { getInfiniteNotSeenMovies } from "@/core/movies/queries/get-infinite-not-seen-movies"
import { LIMIT, MoviesList } from "@/ui/shared/movies/movies-list"
import { useSearchQuery } from "@/ui/shared/hooks/use-search-query"
import { useSearchFilters } from "@/ui/providers/search-filters-provider"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useMemo } from "react"

type Props = {
	userId: string
}

export const NotSeenList = ({ userId }: Props) => {
	const { setSearchQuery, debouncedSearchQuery } = useSearchQuery()
	const { sortBy } = useSearchFilters()

	const dto: GetMoviesDto = useMemo(
		() => ({
			userId,
			seen: false,
			limit: LIMIT,
			offset: 0,
			orderBy: sortBy === "added_date" ? "added_date" : undefined,
			ascending: sortBy === "title" ? true : false,
			searchQuery: debouncedSearchQuery.trim() || undefined,
		}),
		[userId, debouncedSearchQuery, sortBy],
	)

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
		useInfiniteQuery(getInfiniteNotSeenMovies({ dto }))

	return (
		<MoviesList
			userId={userId}
			title="À voir"
			data={data}
			fetchNextPage={fetchNextPage}
			hasNextPage={hasNextPage ?? false}
			isFetchingNextPage={isFetchingNextPage}
			isPending={isPending}
			searchQuery={debouncedSearchQuery}
			onSearchChange={setSearchQuery}
			moviesType="all"
		/>
	)
}

"use client"

import { GetMoviesDto } from "@/core/movies/infrastructure/movies.supabase"
import { getInfiniteNotSeenMovies } from "@/core/movies/queries/get-infinite-not-seen-movies"
import { LIMIT, MoviesList } from "@/ui/shared/movies/movies-list"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"

type Props = {
	userId: string
}

export const NotSeenList = ({ userId }: Props) => {
	const [searchQuery, setSearchQuery] = useState("")

	const dto: GetMoviesDto = useMemo(
		() => ({
			userId,
			seen: false,
			limit: LIMIT,
			offset: 0,
			searchQuery: searchQuery.trim() || undefined,
		}),
		[userId, searchQuery],
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
			searchQuery={searchQuery}
			onSearchChange={setSearchQuery}
		/>
	)
}

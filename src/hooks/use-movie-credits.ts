import { getTMDBMovieCredits } from "@/core/discover/queries/get-credits"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

export const useMovieCredits = (id: number) => {
	const { data: credits } = useQuery(
		getTMDBMovieCredits({ id, enabled: true }),
	)

	const directors = useMemo(() => {
		return (
			credits?.crew
				.filter((crewMember) => crewMember.job === "Director")
				?.map((director) => director.name)
				.join(", ") ?? ""
		)
	}, [credits])

	return {
		directors,
	}
}

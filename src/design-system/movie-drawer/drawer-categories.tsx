import { CommonMovie } from "@/core/common/types/common-movie"
import { DrawerCategorie } from "@/design-system/movie-drawer/drawer-categorie"
import { useMemo } from "react"

type Props = {
	movie: CommonMovie
}

export const DrawerCategories = ({ movie }: Props) => {
	const categoriesIds = useMemo(() => {
		let genreIds: number[] = []
		if (movie.type === "discover") genreIds = movie.genre_ids
		if (movie.type === "movie")
			genreIds = movie.genre_ids.split(", ").map(Number)

		return genreIds
	}, [movie])

	if (categoriesIds.length === 0) return <></>

	return (
		<section className="mb-4 flex flex-wrap gap-2">
			{categoriesIds.map((id) => (
				<DrawerCategorie key={id} id={id} />
			))}
		</section>
	)
}

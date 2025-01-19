import { DiscoverMovie } from "@/core/discover/types/discover-movies"
import { DrawerCategorie } from "@/design-system/movie-drawer/drawer-categorie"

type Props = {
	movie: DiscoverMovie
}

export const DrawerCategories = ({ movie }: Props) => {
	if (movie.genres?.length === 0) return <></>

	return (
		<section className="mb-4 flex flex-wrap gap-2">
			{movie.genres?.map(({ id }) => (
				<DrawerCategorie key={id} id={id} />
			))}
		</section>
	)
}

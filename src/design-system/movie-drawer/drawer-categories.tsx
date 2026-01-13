import { DiscoverMovie } from "@/core/discover/types/discover-movies"
import { DrawerCategorie } from "@/design-system/movie-drawer/drawer-categorie"
import { SeenChip } from "@/design-system/movie-drawer/seen-chip"

type Props = { movie: DiscoverMovie; userId: string }

export const DrawerCategories = ({ movie, userId }: Props) => {
	if (movie.genres?.length === 0) return <></>

	return (
		<section className="mb-4 flex flex-wrap gap-2">
			<SeenChip movie={movie} userId={userId} />
			{movie.genres?.map(({ id }) => (
				<DrawerCategorie key={id} id={id} />
			))}
		</section>
	)
}

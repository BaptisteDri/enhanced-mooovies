import { DiscoverMovie } from "@/core/discover/types/discover-movies"
import { DrawerCategorie } from "@/design-system/movie-drawer/drawer-categorie"
import { SeenChip } from "@/design-system/movie-drawer/seen-chip"

type Props = { movie: DiscoverMovie }

export const DrawerCategories = ({ movie }: Props) => {
	if (movie.genres?.length === 0) return <></>

	return (
		<section className="mb-4 space-y-2">
			<section className="flex flex-wrap gap-2">
				<SeenChip movie={movie} />
				{movie.genres?.map(({ id }) => (
					<DrawerCategorie key={id} id={id} />
				))}
			</section>
		</section>
	)
}

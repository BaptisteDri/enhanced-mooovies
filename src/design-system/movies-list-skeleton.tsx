import { MovieCardSkeleton } from "@/design-system/movie-card-skeleton"

export const MoviesListSkeleton = () => {
	return new Array(15).fill(null).map((_, i) => <MovieCardSkeleton key={i} />)
}

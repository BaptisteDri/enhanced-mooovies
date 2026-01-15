import { MovieCardSkeleton } from "@/design-system/movie-card-skeleton"

type Props = {
	className?: string
	amount?: number
}

export const MoviesListSkeleton = ({ className, amount = 15 }: Props) => {
	return new Array(amount)
		.fill(null)
		.map((_, i) => <MovieCardSkeleton key={i} className={className} />)
}

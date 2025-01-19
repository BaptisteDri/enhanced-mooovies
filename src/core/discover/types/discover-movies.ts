type Genre = {
	id: number
	name: string
}

export type DiscoverMovie = {
	adult: string
	backdrop_path: string
	genres: Genre[]
	id: number
	original_language: string
	original_title: string
	overview: string
	poster_path: string
	release_date: `${string}-${string}-${string}`
	title: string
}

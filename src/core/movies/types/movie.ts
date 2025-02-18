export type Movie = {
	uuid: string
	title: string
	director: string
	year: string
	runtime: string
	genre_ids: string
	poster: string
	original_title: string
	original_language: string
	overview: string
	watched_date: string | null // @TODO: better typing
	tmdb_id: number
	added_date: string | null // @TODO: better typing
	user_id: string
}

type Genre = {
	id: number
	name: string
}

export type DiscoverMovie = {
	adult: string
	backdrop_path: string | null
	genres: Genre[]
	id: number
	original_language: string
	original_title: string
	overview: string
	poster_path: string | null
	release_date: `${string}-${string}-${string}`
	title: string
}

type Crew = {
	id: number
	name: string
	original_name: string
	profile_path: string
	character: string
	job: "Director" | "Producer" | "Editor" | unknown
}

export type Credits = {
	id: number
	cast: Omit<Crew, "job">[]
	crew: Crew[]
}

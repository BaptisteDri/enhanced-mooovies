import { DiscoverMovie } from "@/core/discover/types/discover-movies"

type DiscoverPage = { discoverMovies: DiscoverMovie[] }

/**
 * Aplatit les pages d’une requête infinie TMDB et supprime les doublons par `id`.
 * L’API peut renvoyer le même film en fin de page N et début de page N+1 lorsque
 * le catalogue ou le tri évoluent entre deux appels (total_results qui bouge).
 */
export function mergeDiscoverPagesDedupedById(
	pages: (DiscoverPage | undefined)[] | undefined,
): DiscoverMovie[] {
	const seen = new Set<number>()
	const out: DiscoverMovie[] = []

	for (const page of pages ?? []) {
		if (!page) continue
		for (const movie of page.discoverMovies) {
			if (seen.has(movie.id)) continue
			seen.add(movie.id)
			out.push(movie)
		}
	}

	return out
}

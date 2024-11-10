import { getNotSeenMovies } from "@/core/movies/queries/get-not-seen-movies"
import { getSeenMovies } from "@/core/movies/queries/get-seen-movies"
import { createClient } from "@/libs/supabase/server"
import { PreviewedMovies } from "@/ui/home/previewed-movies"
import { CategoriesListSection } from "@/ui/shared/movies/categories-list-section"
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query"
import { Metadata, NextPage } from "next"

export const metadata: Metadata = {
	title: "Mooovies - Découvez les derniers films que vos amis ont vu !",
	description:
		"Partagez vos films préférés avec vos amis et découvrez les derniers films qu'ils ont vu.",
}

const Home: NextPage = async () => {
	const queryClient = new QueryClient()
	const supabase = createClient()
	const { data } = await supabase.auth.getUser()

	const notSeenMoviesData = await queryClient.fetchQuery(
		getNotSeenMovies({
			enabled: true,
			dto: { limit: 6, userId: data.user?.id || "" },
		}),
	)

	const seenMoviesData = await queryClient.fetchQuery(
		getSeenMovies({
			enabled: true,
			dto: {
				limit: 6,
				userId: data.user?.id || "",
				orderBy: "watched_date",
			},
		}),
	)

	const amount =
		(seenMoviesData?.amount || 0) + (notSeenMoviesData?.amount || 0)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<h1 className="text-4xl font-semibold px-4">
				Mes films
				{!!amount && (
					<span className="text-lg ml-2 text-gray-400 font-normal">
						({amount})
					</span>
				)}
			</h1>
			<PreviewedMovies userId={data.user?.id || ""} />
			<CategoriesListSection />
		</HydrationBoundary>
	)
}

export default Home

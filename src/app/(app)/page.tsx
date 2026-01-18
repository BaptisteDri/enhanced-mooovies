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

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PreviewedMovies userId={data.user?.id || ""} />
			<CategoriesListSection />
		</HydrationBoundary>
	)
}

export default Home

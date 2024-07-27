import { NotSeenMoviesPreview } from "@/ui/home/not-seen-movies-preview"
import { SeenMoviesPreview } from "@/ui/home/seen-movies-preview"
import { CategoriesListSection } from "@/ui/shared/movies/categories-list-section"
import { Metadata, NextPage } from "next"

export const metadata: Metadata = {
	title: "Mooovies - Découvez les derniers films que vos amis ont vu !",
	description:
		"Partagez vos films préférés avec vos amis et découvrez les derniers films qu'ils ont vu.",
}

const Home: NextPage = () => (
	<main className="space-y-6 py-4 pb-24">
		<h1 className="text-4xl font-semibold px-4">Mes films</h1>
		<NotSeenMoviesPreview />
		<SeenMoviesPreview />
		<CategoriesListSection />
	</main>
)

export default Home

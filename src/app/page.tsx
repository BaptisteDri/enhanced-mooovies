import { createClient } from "@/libs/supabase/server"
import { CategoriesListSection } from "@/ui/shared/movies/categories-list-section"
import { MoviesListPreviewSection } from "@/ui/shared/movies/movies-list-preview-section"
import { Metadata, NextPage } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
	title: "Mooovies - Découvez les derniers films que vos amis ont vu !",
	description:
		"Partagez vos films préférés avec vos amis et découvrez les derniers films qu'ils ont vu.",
}

const Home: NextPage = async () => {
	// const supabase = createClient()
	// const { data } = await supabase.auth.getUser()

	// if (!data.user) redirect("/connexion")

	return (
		<main className="space-y-6 py-4 pb-24">
			<h1 className="text-4xl font-semibold px-4">Mes films</h1>
			<MoviesListPreviewSection href={"#"} title={"À voir"} />
			<MoviesListPreviewSection href={"#"} title={"Vus"} />
			<CategoriesListSection />
		</main>
	)
}

export default Home

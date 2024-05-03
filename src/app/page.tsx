import { createClient } from "@/libs/supabase/server"
import { Metadata, NextPage } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
	title: "Mooovies - Découvez les derniers films que vos amis ont vu !",
	description:
		"Partagez vos films préférés avec vos amis et découvrez les derniers films qu'ils ont vu.",
}

const Home: NextPage = async () => {
	const supabase = createClient()
	const { data } = await supabase.auth.getUser()

	if (!data.user) redirect("/login")

	return (
		<main>
			<div>{data.user.email}</div>
		</main>
	)
}

export default Home

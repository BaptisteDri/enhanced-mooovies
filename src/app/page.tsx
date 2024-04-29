import { Metadata, NextPage } from "next"

export const metadata: Metadata = {
	title: "Mooovies - Découvez les derniers films que vos amis ont vu !",
	description:
		"Partagez vos films préférés avec vos amis et découvrez les derniers films qu'ils ont vu.",
}

const Home: NextPage = () => {
	return <main>Hello world</main>
}

export default Home

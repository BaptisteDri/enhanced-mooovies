import { createClient } from "@/libs/supabase/server"
import { PopularMovies } from "@/ui/search/popular-movies"

const ProfilePage = async () => {
	const supabase = createClient()
	const { data } = await supabase.auth.getUser()
	const userId = data.user?.id || ""

	return <PopularMovies userId={userId} />
}

export default ProfilePage

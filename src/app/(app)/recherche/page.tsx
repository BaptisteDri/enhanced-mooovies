import { createClient } from "@/libs/supabase/server"
import { SearchPage } from "@/ui/search/search-page"

const ProfilePage = async () => {
	const supabase = createClient()
	const { data } = await supabase.auth.getUser()
	const userId = data.user?.id || ""

	return <SearchPage userId={userId} />
}

export default ProfilePage

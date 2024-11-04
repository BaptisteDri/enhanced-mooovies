import { createClient } from "@/libs/supabase/server"
import { NotSeenList } from "@/ui/not-seen/not-seen-list"
import { SeenList } from "@/ui/seen/seen-list"

const RevoirPage = async () => {
	const supabase = createClient()
	const { data } = await supabase.auth.getUser()
	const userId = data.user?.id || ""

	return <SeenList userId={userId} />
}

export default RevoirPage

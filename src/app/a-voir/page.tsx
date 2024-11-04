import { createClient } from "@/libs/supabase/server"
import { NotSeenList } from "@/ui/not-seen/not-seen-list"

const AVoirPage = async () => {
	const supabase = createClient()
	const { data } = await supabase.auth.getUser()
	const userId = data.user?.id || ""

	return <NotSeenList userId={userId} />
}

export default AVoirPage

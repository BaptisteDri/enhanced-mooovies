import { createClient } from "@/libs/supabase/server"
import { NotSeenList } from "@/ui/not-seen/not-seen-list"

const AVoirPage = async () => {
	const supabase = createClient()
	const {
		data: { session },
	} = await supabase.auth.getSession()
	const userId = session?.user?.id ?? ""

	return <NotSeenList userId={userId} />
}

export default AVoirPage

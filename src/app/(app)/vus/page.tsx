import { createClient } from "@/libs/supabase/server"
import { SeenList } from "@/ui/seen/seen-list"

const VusPage = async () => {
	const supabase = createClient()
	const { data } = await supabase.auth.getUser()
	const userId = data.user?.id || ""

	return <SeenList userId={userId} />
}

export default VusPage

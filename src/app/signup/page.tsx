import { createClient } from "@/libs/supabase/server"
import { NextPage } from "next"
import { redirect } from "next/navigation"

const Registration: NextPage = async () => {
	const supabase = createClient()

	const { data } = await supabase.auth.getUser()
	if (!!data?.user) redirect("/")

	return <main></main>
}

export default Registration

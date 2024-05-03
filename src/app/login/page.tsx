import { createClient } from "@/libs/supabase/server"
import { LoginLayout } from "@/ui/login/login-layout"
import { NextPage } from "next"
import { redirect } from "next/navigation"

const Login: NextPage = async () => {
	const supabase = createClient()
	const { data } = await supabase.auth.getUser()

	if (data.user) redirect("/")

	return <LoginLayout />
}

export default Login

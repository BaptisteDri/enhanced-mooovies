import { createClient } from "@/libs/supabase/server"
import { AuthLayout } from "@/ui/shared/auth/auth-layout"
import { NextPage } from "next"
import { redirect } from "next/navigation"

const Login: NextPage = async () => {
	const supabase = createClient()
	const { data } = await supabase.auth.getUser()

	if (data.user) redirect("/")

	return <AuthLayout type="signup" />
}

export default Login

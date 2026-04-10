import { LoginForm } from "@/ui/login/login-form"
import { NextPage } from "next"
import Link from "next/link"

const Login: NextPage = () => {
	return (
		<div>
			<LoginForm />
			<Link
				href={"/inscription"}
				className="mt-4 flex gap-2 text-gray-400 text-sm hover:opacity-80 transition-all duration-150 justify-center"
			>
				Pas de compte ?
				<span className="text-indigo-400">S'inscrire</span>
			</Link>
		</div>
	)
}

export default Login

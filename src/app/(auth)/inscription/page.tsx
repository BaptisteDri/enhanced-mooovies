import { SignupForm } from "@/ui/signup/signup-form"
import { NextPage } from "next"
import Link from "next/link"

const Signup: NextPage = () => {
	return (
		<div>
			<SignupForm />
			<Link
				href={"/connexion"}
				className="mt-4 flex gap-2 text-gray-400 text-sm hover:opacity-80 transition-all duration-150 justify-center"
			>
				Déjà inscrit ?
				<span className="text-indigo-400">Se connecter</span>
			</Link>
		</div>
	)
}

export default Signup

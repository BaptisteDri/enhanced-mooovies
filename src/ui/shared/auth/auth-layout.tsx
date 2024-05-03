import { AnimatedMovies } from "@/ui/shared/auth/animated-movies"
import { LoginForm } from "@/ui/login/login-form"
import Link from "next/link"
import { twMerge } from "tailwind-merge"
import { SignupForm } from "@/ui/signup/signup-form"
import Image from "next/image"

type Props = {
	type: "login" | "signup"
}

export const AuthLayout = ({ type }: Props) => {
	return (
		<main className="min-h-dvh flex">
			<div
				className={twMerge(
					"bg-gray-900 w-full grid place-items-center p-6 max-md:py-10 shadow-2xl shadow-gray-950",
					"max-md:absolute inset-0 max-md:flex max-md:my-auto max-md:mx-6 z-10 max-md:w-fit max-md:h-fit max-md:rounded-xl",
				)}
			>
				<div className="space-y-6 lg:w-[30rem]">
					<div className="relative w-14 h-14 md:w-16 md:h-16 max-md:mx-auto">
						<Image
							src={"/img/mooovies-logo.svg"}
							alt={"Mooovies logo"}
							fill
						/>
					</div>
					<div className="space-y-4">
						<h1 className="text-4xl md:text-6xl text-white font-semibold max-md:text-center">
							Mooovies
						</h1>

						<p className="text-gray-400 md:text-md max-md:text-center">
							Suivez les films que vous avez regardés, enregistrez
							ceux que vous souhaitez voir.
						</p>
					</div>
					<div>
						{type === "login" ? <LoginForm /> : <SignupForm />}
						<Link
							href={
								type === "login" ? "/inscription" : "/connexion"
							}
							className="mt-4 flex gap-2 text-gray-400 text-sm hover:opacity-80 transition-all duration-150 justify-center"
						>
							{type === "login"
								? "Pas de compte ?"
								: "Déjà inscrit ?"}
							<span className="text-indigo-400">
								{type === "login"
									? "S'inscrire"
									: "Se connecter"}
							</span>
						</Link>
					</div>
				</div>
			</div>
			<aside
				className={twMerge(
					"md:max-w-md lg:max-w-lg xl:max-w-2xl w-full overflow-hidden max-h-dvh",
					"max-md:max-w-full max-md:blur-sm",
				)}
			>
				<AnimatedMovies />
			</aside>
		</main>
	)
}

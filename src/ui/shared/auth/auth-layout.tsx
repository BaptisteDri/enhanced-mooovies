import { AnimatedMovies } from "@/ui/login/animated-movies"
import { LoginForm } from "@/ui/login/login-form"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

type Props = {
	type: "login" | "signup"
}

export const AuthLayout = ({ type }: Props) => {
	return (
		<main className="min-h-dvh flex">
			<div
				className={twMerge(
					"bg-slate-950 w-full grid place-items-center p-6 max-md:py-10",
					"max-md:absolute inset-0 max-md:flex max-md:my-auto max-md:mx-6 z-10 max-md:w-fit max-md:h-fit max-md:rounded-xl",
				)}
			>
				<div className="space-y-6 lg:w-[30rem]">
					<div className="space-y-4">
						<h1 className="text-6xl text-white font-semibold">
							Mooovies
						</h1>

						<p className="text-slate-400 text-md">
							Suivez les films que vous avez regardés, enregistrez
							ceux que vous souhaitez voir.
						</p>
					</div>
					<div>
						<LoginForm />
						<Link
							href="/register"
							className="mt-4 flex gap-2 text-slate-400 text-sm hover:opacity-80 transition-all duration-150 justify-center"
						>
							Pas encore de compte ?
							<span className="underline text-indigo-600">
								S'inscrire
							</span>
						</Link>
					</div>
				</div>
			</div>
			<aside
				className={twMerge(
					"md:max-w-md lg:max-w-lg xl:max-w-2xl w-full overflow-hidden max-h-dvh",
					"max-md:max-w-full",
				)}
			>
				<AnimatedMovies />
			</aside>
		</main>
	)
}

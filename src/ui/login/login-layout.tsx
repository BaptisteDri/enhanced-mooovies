import { AnimatedMovies } from "@/ui/login/animated-movies"
import { LoginForm } from "@/ui/login/login-form"

export const LoginLayout = () => {
	return (
		<main className="min-h-dvh flex">
			<div className="bg-slate-950 w-full grid place-items-center">
				<div className="space-y-6 max-md:w-full lg:w-[30rem]">
					<div className="space-y-4">
						<h1 className="text-6xl text-white font-semibold">
							Mooovies
						</h1>

						<p className="text-slate-400 text-md">
							Suivez les films que vous avez regardés, enregistrez
							ceux que vous souhaitez voir.
						</p>
					</div>
					<LoginForm />
					{/* @TODO: pas encore de compte ? inscription */}
				</div>
			</div>
			<aside className="max-w-2xl w-full overflow-hidden max-h-dvh">
				<AnimatedMovies />
			</aside>
		</main>
	)
}

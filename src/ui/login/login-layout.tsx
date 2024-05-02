import { AnimatedMovies } from "@/ui/login/animated-movies"
import { LoginForm } from "@/ui/login/login-form"

export const LoginLayout = () => {
	return (
		<main className="min-h-dvh flex">
			<div className="bg-slate-950 w-full grid place-items-center">
				<LoginForm />
			</div>
			<aside className="max-w-2xl w-full overflow-hidden max-h-dvh">
				<AnimatedMovies />
			</aside>
		</main>
	)
}

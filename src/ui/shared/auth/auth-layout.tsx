import { AnimatedMovies } from "@/ui/shared/auth/animated-movies"
import { twMerge } from "tailwind-merge"

type Props = {
	children: React.ReactNode
}

export const AuthLayout = ({ children }: Props) => {
	return (
		<main className="min-h-dvh flex">
			<div
				className={twMerge(
					"bg-gray-900 w-full grid place-items-center p-6 max-md:py-10 shadow-2xl shadow-gray-950",
					"max-md:absolute inset-0 max-md:flex max-md:my-auto max-md:mx-6 z-10 max-md:w-fit max-md:h-fit max-md:rounded-xl",
				)}
			>
				{children}
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

import { AnimatedMovies } from "@/ui/shared/auth/animated-movies"
import { Footer } from "@/ui/shared/auth/footer"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

type Props = {
	children: React.ReactNode
}

export const AuthLayout = ({ children }: Props) => {
	return (
		<main className="min-h-dvh flex">
			<div
				className={twMerge(
					"bg-gray-900 w-full",
					"flex flex-col justify-between",
					"max-md:grid place-items-center",
					"p-6 max-md:py-10 max-md:shadow-2xl shadow-gray-950",
					"max-md:absolute inset-0 max-md:flex max-md:my-auto max-md:mx-6 z-10 max-md:w-fit max-md:h-fit max-md:rounded-xl",
				)}
			>
				<div></div>
				{children}
				<div className="mt-8">
					<Footer />
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

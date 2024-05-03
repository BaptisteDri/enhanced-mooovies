import { Marquee } from "@/ui/shared/auth/marquee"

export const AnimatedMovies = async () => {
	const staticData: any = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/movie/popular`,
		{
			cache: "force-cache",
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
			},
		},
	)

	const parsedData = await staticData.json()
	const parsedMovies = await parsedData.results

	return (
		<div className="overflow-hidden p-4 relative h-full bg-slate-900">
			<div className="rotate-6 scale-150 md:scale-[200%] lg:scale-150 xl:scale-125 translate-y-32 xl:-translate-y-10 space-y-4">
				<Marquee moviesPosters={parsedMovies.slice(0, 4)} />
				<Marquee moviesPosters={parsedMovies.slice(4, 8)} reverse />
				<Marquee moviesPosters={parsedMovies.slice(8, 12)} />
				<Marquee moviesPosters={parsedMovies.slice(12, 16)} reverse />
				<Marquee moviesPosters={parsedMovies.slice(16, 20)} />
			</div>
			<div className="absolute left-0 top-0 bg-gradient-to-r from-slate-950 to-transparent h-full w-14"></div>
		</div>
	)
}

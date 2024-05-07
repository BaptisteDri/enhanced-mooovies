import Image from "next/image"
import { twMerge } from "tailwind-merge"

export const LayoutMainContent = ({
	children,
}: {
	children: React.ReactNode
}) => {
	return (
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
					Suivez les films que vous avez regardés, enregistrez ceux
					que vous souhaitez voir.
				</p>
			</div>
			{children}
		</div>
	)
}

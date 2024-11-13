import { Movie } from "@/core/movies/types/movie"
import { Drawer } from "vaul"

type Props = Pick<Movie, "title" | "original_title">

export const DrawerTitle = ({ original_title, title }: Props) => {
	const displayOriginalTitle = original_title !== title

	return (
		<Drawer.Title className="font-medium mb-4 leading-none" asChild>
			<h2 className="text-2xl font-semibold">
				{title}
				{displayOriginalTitle && (
					<>
						<br />
						<span className="text-base text-gray-400 font-normal italic">
							{original_title}
						</span>
					</>
				)}
			</h2>
		</Drawer.Title>
	)
}

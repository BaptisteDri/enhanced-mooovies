import { Movie } from "@/core/movies/types/movie"
import { Drawer } from "vaul"

type Props = Pick<Movie, "title" | "original_title"> & {
	year?: string
}

export const DrawerTitle = ({ original_title, title, year }: Props) => {
	const displayOriginalTitle = original_title !== title

	return (
		<Drawer.Title className="font-medium mb-4 leading-none" asChild>
			<h2 className="text-2xl font-semibold">
				{title}
				<br />
				<span className="text-sm text-gray-400 font-normal italic">
					{!!year && year}
					{displayOriginalTitle && !!year && " • "}
					{displayOriginalTitle && original_title}
				</span>
			</h2>
		</Drawer.Title>
	)
}

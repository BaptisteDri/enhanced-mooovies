import { categories } from "@/core/categories/categories"
import { categoriesColor } from "@/ui/shared/movies/categories-list-section"
import { useMemo } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
	id: number
}

export const categoriesBorderColor: Record<number, string> = {
	28: "border-red-700/40",
	12: "border-amber-700/40",
	16: "border-yellow-700/40",
	35: "border-sky-700/40",
	80: "border-gray-700/40",
	99: "border-blue-700/40",
	18: "border-orange-700/40",
	10751: "border-cyan-700/40",
	14: "border-yellow-700/40",
	36: "border-yellow-700/40",
	27: "border-gray-700/40",
	10402: "border-gray-700/40",
	9648: "border-stone-700/40",
	10749: "border-rose-700/40",
	878: "border-indigo-700/40",
	10770: "border-amber-700/40",
	53: "border-blue-700/40",
	10752: "border-lime-700/40",
	37: "border-yellow-700/40",
}

export const DrawerCategorie = ({ id }: Props) => {
	const categorie = useMemo(
		() => categories.find((categorie) => categorie.id === id),
		[id],
	)

	const gradientColor = categoriesColor[id]
	const borderColor = categoriesBorderColor[id]

	return (
		<p
			className={twMerge(
				"flex items-center border border-gray-700 bg-gray-900 w-fit rounded-md px-2 py-1 text-sm",
				"bg-gradient-to-br from-transparent via-transparent bg-gray-900",
				gradientColor,
				borderColor,
			)}
		>
			{categorie?.icon}&nbsp;&nbsp;
			{categorie?.name}
		</p>
	)
}

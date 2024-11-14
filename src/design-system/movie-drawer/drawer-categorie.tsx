import { categories } from "@/core/categories/categories"
import { useMemo } from "react"

type Props = {
	id: number
}

export const DrawerCategorie = ({ id }: Props) => {
	const categorie = useMemo(
		() => categories.find((categorie) => categorie.id === id),
		[id],
	)

	return (
		<p className="flex items-center border border-gray-700 bg-gray-800 w-fit rounded-md px-1.5 py-0.5 text-sm font-light">
			{categorie?.icon}&nbsp;&nbsp;
			{categorie?.name}
		</p>
	)
}

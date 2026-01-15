import Link from "next/link"
import { categories } from "@/core/categories/categories"
import { twMerge } from "tailwind-merge"

export const categoriesColor: Record<number, string> = {
	28: "to-red-700/30",
	12: "to-amber-700/30",
	16: "to-yellow-700/30",
	35: "to-sky-700/30",
	80: "to-gray-700/30",
	99: "to-blue-700/30",
	18: "to-orange-700/30",
	10751: "to-cyan-700/30",
	14: "to-yellow-700/30",
	36: "to-yellow-700/30",
	27: "to-gray-700/30",
	10402: "to-gray-700/30",
	9648: "to-stone-700/30",
	10749: "to-rose-700/30",
	878: "to-indigo-700/30",
	10770: "to-amber-700/30",
	53: "to-blue-700/30",
	10752: "to-lime-700/30",
	37: "to-yellow-700/30",
}

export const CategoriesListSection = () => {
	return (
		<section className="space-y-4 px-4">
			<h2 className="font-medium text-xl">À voir par catégories</h2>
			<div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{categories.map((category, i) => (
					<Link
						href={"#"}
						key={i}
						className={twMerge(
							"aspect-video rounded-md flex flex-col gap-2 justify-between py-2 px-3 shadow-lg",
							"bg-linear-to-br from-transparent via-transparent bg-gray-900",
							categoriesColor[category.id],
						)}
					>
						<span className="font-medium">{category.name}</span>
						<span className="text-4xl text-right">
							{category.icon}
						</span>
					</Link>
				))}
			</div>
		</section>
	)
}

import Link from "next/link"
import { categories } from "@/core/categories/categories"
import { twMerge } from "tailwind-merge"

const categoriesColor: Record<number, string> = {
	28: "bg-gradient-to-r from-red-500 to-orange-500",
	12: "bg-gradient-to-r from-rose-400 to-red-500",
	16: "bg-gradient-to-r from-fuchsia-600 to-pink-600",
	35: "bg-gradient-to-r from-slate-500 to-slate-800",
	80: "bg-gradient-to-r from-rose-400 to-orange-300",
	99: "bg-gradient-to-r from-fuchsia-600 to-purple-600",
	18: "bg-gradient-to-r from-emerald-500 to-emerald-900",
	10751: "bg-gradient-to-r from-red-400 to-red-900",
	14: "bg-gradient-to-r from-teal-400 to-gray-800",
	36: "bg-gradient-to-r from-stone-500 to-stone-700",
	27: "bg-gradient-to-r from-orange-400 to-rose-400",
	10402: "bg-gradient-to-r from-yellow-600 to-red-600",
	9648: "bg-gradient-to-r from-blue-800 to-indigo-900",
	10749: "bg-gradient-to-r from-pink-500 to-rose-500",
	878: "bg-gradient-to-r from-slate-500 to-stone-700",
	10770: "bg-gradient-to-r from-blue-400 to-emerald-400",
	53: "bg-gradient-to-r from-amber-500 to-pink-500",
	10752: "bg-gradient-to-r from-red-500 to-orange-500",
	37: "bg-gradient-to-r from-amber-400 to-yellow-600",
}

export const CategoriesListSection = () => {
	return (
		<section className="space-y-4 px-4">
			<h2 className="font-medium text-xl">À voir par catégories</h2>
			<div className="grid grid-cols-2 gap-4">
				{categories.map((category, i) => (
					<Link
						href={"#"}
						key={i}
						className={twMerge(
							"aspect-video rounded-md flex flex-col gap-2 justify-between py-2 px-3",
							"bg-gradient-to-br shadow-lg",
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

"use client"

import { twMerge } from "tailwind-merge"

type Props = {
	icon: string
	label: string
	isSelected?: boolean
	onClick: () => void
}

export const FilterButton = ({
	icon,
	label,
	isSelected = false,
	onClick,
}: Props) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={twMerge(
				"flex items-center gap-2 px-2 py-1 rounded-md text-sm",
				"transition-colors border",
				isSelected
					? "bg-indigo-950/50 border-indigo-600 text-indigo-300"
					: "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700",
			)}
		>
			<span>{icon}</span>
			<span className="truncate">{label}</span>
		</button>
	)
}

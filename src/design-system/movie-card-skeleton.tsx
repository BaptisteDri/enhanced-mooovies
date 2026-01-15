import Image from "next/image"
import { twMerge } from "tailwind-merge"

type Props = {
	className?: string
}

export const MovieCardSkeleton = ({ className }: Props) => (
	<div
		className={twMerge(
			"relative overflow-hidden rounded-md aspect-2/3 flex bg-gray-800 animate-pulse",
			className,
		)}
	></div>
)

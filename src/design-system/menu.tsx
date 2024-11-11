"use client"

import { Icon } from "@/design-system/icons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { twMerge } from "tailwind-merge"

export const Menu = () => {
	const pathname = usePathname()

	return (
		<nav
			className={twMerge(
				"border-t border-gray-800 bg-gray-900 bg-opacity-70 backdrop-blur-lg",
				"fixed bottom-0 left-0 z-30",
				"w-full h-20",
				"grid grid-cols-3 place-items-center",
				"*:text-sm *:pb-6",
			)}
		>
			<Link
				href="/"
				className={twMerge(
					"w-full h-full grid place-items-center",
					pathname === "/" ? "text-gray-50" : "text-gray-400",
				)}
			>
				<Icon
					name="home"
					size={24}
					style={pathname === "/" ? "solid" : "outline"}
				/>
			</Link>
			<Link
				href="/recherche"
				className={twMerge(
					"w-full h-full grid place-items-center",
					pathname === "/recherche"
						? "text-gray-50"
						: "text-gray-400",
				)}
			>
				<Icon name="magnifying-glass" size={24} />
			</Link>
			<Link
				href="/profil"
				className={twMerge(
					"w-full h-full grid place-items-center",
					pathname === "/profil" ? "text-gray-50" : "text-gray-400",
				)}
			>
				<Icon
					name="user-circle"
					size={24}
					style={pathname === "/profil" ? "solid" : "outline"}
				/>
			</Link>
		</nav>
	)
}

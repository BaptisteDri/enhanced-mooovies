"use client"

import { twMerge } from "tailwind-merge"
import { cva, type VariantProps } from "class-variance-authority"

const input = cva(
	[
		"w-full",
		"bg-gray-800 ring-indigo-600",
		"placeholder:text-chicago-600",
		"rounded-md py-3 px-5",
		"border border-gray-700 h-12",
		"hover:bg-black-haze-50 transition-all duration-150",
		"focus:outline-none",
		"focus-visible:ring-1",
		"disabled:bg-gray-700 disabled:cursor-not-allowed",
		"placeholder:text-gray-400",
	],
	{
		variants: {
			iconPosition: {
				none: "",
				left: "pl-14",
			},
		},
		defaultVariants: {
			iconPosition: "none",
		},
	},
)

type Props = VariantProps<typeof input> &
	React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({ className, ...rest }: Props) => {
	return <input className={twMerge(input({ className }))} {...rest} />
}

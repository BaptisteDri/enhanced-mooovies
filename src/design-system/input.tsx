// "use client"

// import { twMerge } from "tailwind-merge"
// import { cva, type VariantProps } from "class-variance-authority"

// const input = cva(
// 	[
// 		"w-full",
// 		"bg-gray-800 ring-indigo-600",
// 		"placeholder:text-chicago-600",
// 		"rounded-md py-3 px-5",
// 		"border border-gray-700 h-12",
// 		"hover:bg-black-haze-50 transition-all duration-150",
// 		"focus:outline-none",
// 		"focus-visible:ring-1",
// 		"disabled:bg-gray-700 disabled:cursor-not-allowed",
// 		"placeholder:text-gray-400",
// 	],
// 	{
// 		variants: {
// 			iconPosition: {
// 				none: "",
// 				left: "pl-14",
// 			},
// 		},
// 		defaultVariants: {
// 			iconPosition: "none",
// 		},
// 	},
// )

// type Props = VariantProps<typeof input> &
// 	React.InputHTMLAttributes<HTMLInputElement>

// export const Input = ({ className, ...rest }: Props) => {
// 	return <input className={twMerge(input({ className }))} {...rest} />
// }

"use client"

import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { cva, type VariantProps } from "class-variance-authority"
import { Icon, IconName } from "@/design-system/icons"

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
	React.InputHTMLAttributes<HTMLInputElement> & {
		icon?: IconName
		iconClassName?: string
		parentClassName?: string
	}

export const Input = ({
	className,
	icon,
	iconClassName,
	iconPosition,
	parentClassName,
	type = "text",
	...rest
}: Props) => {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className={twMerge("relative", parentClassName)}>
			{!!icon && iconPosition === "left" && (
				<span
					className={twMerge(
						"absolute text-gray-400 inset-y-O grid place-items-center h-full left-5",
						iconClassName,
					)}
				>
					<Icon name={icon} size={24} />
				</span>
			)}
			<input
				className={twMerge(
					input({ className, iconPosition }),
					type === "password" && "pr-14",
				)}
				type={
					type === "password"
						? showPassword
							? "text"
							: "password"
						: type
				}
				{...rest}
			/>
			{type === "password" && (
				<button
					type="button"
					className={twMerge(
						"absolute grid place-items-center h-fit my-auto bottom-0 top-0 right-5 text-gray-300",
						iconClassName,
					)}
					onClick={() => setShowPassword(!showPassword)}
				>
					<Icon name={showPassword ? "eye-slash" : "eye"} size={24} />
				</button>
			)}
		</div>
	)
}

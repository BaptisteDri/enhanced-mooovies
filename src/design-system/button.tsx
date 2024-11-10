import { twMerge } from "tailwind-merge"
import { cva, type VariantProps } from "class-variance-authority"
import { Spinner } from "@/design-system/spinner"

type PolymorphicProps<Element extends React.ElementType, Props> = Props &
	Omit<React.ComponentProps<Element>, "as"> & {
		as?: Element
	}

const button = cva(
	[
		"whitespace-nowrap",
		"leading-none",
		"flex",
		"items-center",
		"justify-center",
		"focus:outline-none",
		"focus-visible:ring-4",
		"transition-all",
		"disabled:cursor-not-allowed",
		"font-medium",
		"relative",
	],
	{
		variants: {
			intent: {
				primary: [
					"bg-indigo-600",
					"text-gray-50",
					"hover:bg-indigo-500",
					"active:bg-indigo-700",
					"focus-visible:bg-indigo-700",
					"disabled:bg-indigo-400 disabled:text-gray-200",
					"ring-indigo-400",
				],
				secondary: [
					"bg-gray-800",
					"text-gray-200",
					"hover:bg-gray-700",
					"active:bg-gray-600",
					"focus-visible:bg-gray-600",
					"disabled:bg-gray-800 disabled:text-gray-400",
					"ring-gray-400",
				],
			},
			size: {
				base: ["py-4", "px-7", "rounded-md"],
			},
		},

		defaultVariants: {
			intent: "primary",
			size: "base",
		},
	},
)

type Props = VariantProps<typeof button> & {
	loading?: boolean
}

const defaultElement = "button"

export const Button = <
	Element extends React.ElementType = typeof defaultElement,
>(
	props: PolymorphicProps<Element, Props>,
) => {
	const {
		as: Component = defaultElement,
		className,
		intent,
		size,
		btnType,
		children,
		loading,
		...rest
	} = props
	return (
		<Component
			className={twMerge(button({ className, intent, size }))}
			{...rest}
		>
			{loading && <Spinner className="absolute" />}
			<span
				className={twMerge(
					"transition-opacity duration-150",
					loading && "opacity-0",
				)}
			>
				{children}
			</span>
		</Component>
	)
}

import Link from "next/link"

type Props = {
	href: string
	title: string
}

export const MoviesListPreviewSection = ({ href, title }: Props) => (
	<section className="space-y-4">
		<Link href={href} className="px-4 flex justify-between items-baseline">
			<h2 className="font-medium text-xl">{title}</h2>
			<span className="text-sm text-gray-300">voir plus</span>
		</Link>
		<div className="flex gap-4 overflow-x-auto no-scrollbar px-4">
			<div className="w-24 min-w-24 h-36 bg-gray-800 rounded-md"></div>
			<div className="w-24 min-w-24 h-36 bg-gray-800 rounded-md"></div>
			<div className="w-24 min-w-24 h-36 bg-gray-800 rounded-md"></div>
			<div className="w-24 min-w-24 h-36 bg-gray-800 rounded-md"></div>
			<div className="w-24 min-w-24 h-36 bg-gray-800 rounded-md"></div>
			<div className="w-24 min-w-24 h-36 bg-gray-800 rounded-md"></div>
		</div>
	</section>
)

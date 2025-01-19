export const Skeleton = () => {
	return (
		<>
			<section className="animate-pulse transition-opacity bg-gray-800 rounded-md w-32 h-48 mb-6" />
			<p className="animate-pulse transition-opacity mb-4 bg-gray-800 rounded-md h-[2.125rem] w-48"></p>
			<p className="animate-pulse transition-opacity bg-gray-800 rounded-md h-[1.5rem] mb-2 w-[90%]"></p>
			<section className="animate-pulse transition-opacity mb-4 flex flex-wrap gap-2">
				<div className="animate-pulse transition-opacity w-[80px] h-[26px] bg-gray-800 rounded-md"></div>
				<div className="animate-pulse transition-opacity w-[72px] h-[26px] bg-gray-800 rounded-md"></div>
				<div className="animate-pulse transition-opacity w-[92px] h-[26px] bg-gray-800 rounded-md"></div>
			</section>
			<p className="animate-pulse transition-opacity mb-2 bg-gray-800 rounded-md h-3 w-[98%]"></p>
			<p className="animate-pulse transition-opacity mb-2 bg-gray-800 rounded-md h-3 w-[95%]"></p>
			<p className="animate-pulse transition-opacity mb-2 bg-gray-800 rounded-md h-3"></p>
			<p className="animate-pulse transition-opacity mb-2 bg-gray-800 rounded-md h-3 w-[96%]"></p>

			<section className="animate-pulse transition-opacity flex gap-4 mt-6 border-t border-gray-800 pt-4 pb-6">
				<section className="flex gap-4 w-full">
					<section className="bg-gray-800 h-12 rounded-md w-full"></section>
					<section className="bg-gray-800 h-12 min-w-12 rounded-md"></section>
				</section>
			</section>
		</>
	)
}

"use client"

import Image from "next/image"

const MOVIES_POSTER: string[] = [
	"https://www.themoviedb.org/t/p/w1280/rL1YQLqUtHK3HdQyenHvuOCuWzO.jpg",
	"https://www.themoviedb.org/t/p/w1280/wnDNKCeBQzioXYQrXcSyrmRHVxf.jpg",
	"https://www.themoviedb.org/t/p/w1280/chMfGLOf5EMz0o10Duukmb9oj0P.jpg",
	"https://www.themoviedb.org/t/p/w1280/vHgf8NE7tXV4DJPEnqVLZDof8fT.jpg",
	"https://www.themoviedb.org/t/p/w1280/bPImGSvZtG2tvsJ9bVLrIECRDnB.jpg",
	"https://www.themoviedb.org/t/p/w1280/12TAqK0AUgdcYE9ZYZ9r7ASbH5Q.jpg",
	"https://www.themoviedb.org/t/p/w1280/pyNXnq8QBWoK3b37RS6C3axwUOy.jpg",
	"https://www.themoviedb.org/t/p/w1280/7hLSzZX2jROmEXz2aEoh6JKUFy2.jpg",
	"https://www.themoviedb.org/t/p/w1280/mVGSetYx6kmJCf4T8YOYs1z6M00.jpg",
]

export const AnimatedMovies = () => {
	return (
		<div className="overflow-hidden p-4 relative h-full bg-slate-900">
			<div className="rotate-6 scale-125 space-y-4">
				<div className="flex relative">
					<div className="animate-marquee w-full grid grid-cols-3 gap-4 pl-4">
						{MOVIES_POSTER.slice(0, 3).map((poster, i) => (
							<div
								key={i}
								className="relative overflow-hidden rounded-md aspect-[2/3]"
							>
								<Image
									src={poster}
									alt={poster}
									height={450}
									width={300}
								/>
							</div>
						))}
					</div>
					<div className="animate-marquee2 w-full absolute top-0 grid grid-cols-3 gap-4 pl-4">
						{MOVIES_POSTER.slice(0, 3).map((poster, i) => (
							<div
								key={i}
								className="relative overflow-hidden rounded-md aspect-[2/3]"
							>
								<Image
									src={poster}
									alt={poster}
									height={450}
									width={300}
								/>
							</div>
						))}
					</div>
				</div>
				<div className="flex relative">
					<div className="animate-reverse-marquee w-full grid grid-cols-3 gap-4 pl-4">
						{MOVIES_POSTER.slice(3, 6).map((poster, i) => (
							<div
								key={i}
								className="relative overflow-hidden rounded-md aspect-[2/3]"
							>
								<Image
									src={poster}
									alt={poster}
									height={450}
									width={300}
								/>
							</div>
						))}
					</div>
					<div className="animate-reverse-marquee2 w-full absolute top-0 grid grid-cols-3 gap-4 pl-4">
						{MOVIES_POSTER.slice(3, 6).map((poster, i) => (
							<div
								key={i}
								className="relative overflow-hidden rounded-md aspect-[2/3]"
							>
								<Image
									src={poster}
									alt={poster}
									height={450}
									width={300}
								/>
							</div>
						))}
					</div>
				</div>
				<div className="flex relative">
					<div className="animate-marquee w-full grid grid-cols-3 gap-4 pl-4">
						{MOVIES_POSTER.slice(6, 9).map((poster, i) => (
							<div
								key={i}
								className="relative overflow-hidden rounded-md aspect-[2/3]"
							>
								<Image
									src={poster}
									alt={poster}
									height={450}
									width={300}
								/>
							</div>
						))}
					</div>
					<div className="animate-marquee2 w-full absolute top-0 grid grid-cols-3 gap-4 pl-4">
						{MOVIES_POSTER.slice(6, 9).map((poster, i) => (
							<div
								key={i}
								className="relative overflow-hidden rounded-md aspect-[2/3]"
							>
								<Image
									src={poster}
									alt={poster}
									height={450}
									width={300}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="absolute left-0 top-0 bg-gradient-to-r from-slate-950 to-transparent h-full w-14"></div>
		</div>
	)
}

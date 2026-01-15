export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className="space-y-6 py-4 pb-24 lg:container lg:mx-auto">
			{children}
		</main>
	)
}

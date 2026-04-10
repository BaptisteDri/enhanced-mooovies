import { Menu } from "@/design-system/menu"

export default async function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<main className="space-y-6  pb-24 lg:container lg:mx-auto">
				{children}
			</main>
			<Menu />
		</>
	)
}

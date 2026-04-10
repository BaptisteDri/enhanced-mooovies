import { Inter } from "next/font/google"
import "./globals.css"
import ReactQueryProvider from "@/ui/providers/react-query-provider"
import { DrawerProvider } from "@/ui/providers/drawer-provider"
import { SearchFiltersProvider } from "@/ui/providers/search-filters-provider"
import { DrawerRender } from "@/ui/providers/drawer-render"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="fr">
			<body className={inter.className}>
				<ReactQueryProvider>
					<DrawerProvider>
						<SearchFiltersProvider>
							{children}
							<DrawerRender />
						</SearchFiltersProvider>
					</DrawerProvider>
				</ReactQueryProvider>
			</body>
		</html>
	)
}

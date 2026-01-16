import { Inter } from "next/font/google"
import "./globals.css"
import { Menu } from "@/design-system/menu"
import ReactQueryProvider from "@/ui/providers/react-query-provider"
import { DrawerProvider } from "@/ui/providers/drawer-provider"
import { SearchFiltersProvider } from "@/ui/providers/search-filters-provider"
import { createClient } from "@/libs/supabase/server"
import { DrawerRender } from "@/ui/providers/drawer-render"

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const supabase = createClient()
	const { data } = await supabase.auth.getUser()

	return (
		<html lang="fr">
			<body className={inter.className}>
				<ReactQueryProvider>
					<DrawerProvider>
						<SearchFiltersProvider>
							{children}
							{data.user && <Menu />}
							<DrawerRender />
						</SearchFiltersProvider>
					</DrawerProvider>
				</ReactQueryProvider>
			</body>
		</html>
	)
}

import { Inter } from "next/font/google"
import "./globals.css"
import { Menu } from "@/design-system/menu"
import ReactQueryProvider from "@/ui/providers/react-query-provider"

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="fr">
			<body className={inter.className}>
				<ReactQueryProvider>
					{children}
					<Menu />
				</ReactQueryProvider>
			</body>
		</html>
	)
}

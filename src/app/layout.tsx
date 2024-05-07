import { Inter } from "next/font/google"
import "./globals.css"
import { createClient } from "@/libs/supabase/server"

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
				{/* {data.user ? children : <AuthLayout>{children}</AuthLayout>} */}
				{children}
			</body>
		</html>
	)
}

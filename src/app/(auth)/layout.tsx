import { AuthLayout } from "@/ui/shared/auth/auth-layout"
import { LayoutMainContent } from "@/ui/shared/auth/layout-main-content"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<AuthLayout>
			<LayoutMainContent>{children}</LayoutMainContent>
		</AuthLayout>
	)
}

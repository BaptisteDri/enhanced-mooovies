import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	})

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll()
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) => {
						request.cookies.set({ name, value, ...options })
					})
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					})
					cookiesToSet.forEach(({ name, value, options }) => {
						response.cookies.set({ name, value, ...options })
					})
				},
			},
		},
	)

	const user = await supabase.auth.getUser()

	if (
		(request.nextUrl.pathname === "/" ||
			request.nextUrl.pathname === "/recherche" ||
			request.nextUrl.pathname === "/profil") &&
		user.error
	) {
		return NextResponse.redirect(new URL("/connexion", request.url))
	}

	if (
		(request.nextUrl.pathname === "/connexion" ||
			request.nextUrl.pathname === "/inscription") &&
		!user.error &&
		user.data.user
	) {
		return NextResponse.redirect(new URL("/", request.url))
	}

	return response
}

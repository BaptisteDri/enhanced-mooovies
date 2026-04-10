import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createClient() {
	const cookieStore = cookies()

	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				async getAll() {
					return (await cookieStore).getAll()
				},
				async setAll(cookiesToSet) {
					try {
						const store = await cookieStore
						cookiesToSet.forEach(({ name, value, options }) => {
							store.set({ name, value, ...options })
						})
					} catch {
						// Appel depuis un Server Component : ignoré si le proxy /
						// middleware rafraîchit déjà la session.
					}
				},
			},
		},
	)
}

"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/libs/supabase/server"

export async function signout() {
	const supabase = createClient()

	const { error } = await supabase.auth.signOut()

	if (error) return error

	revalidatePath("/connexion", "layout")
	redirect("/connexion")
}

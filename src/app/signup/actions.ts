"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/libs/supabase/server"

export async function signup(formData: FormData): Promise<void> {
	const supabase = createClient()

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	}

	try {
		const { error } = await supabase.auth.signUp(data)

		if (error) {
			throw new Error(error.message)
		}
	} catch (error) {
		throw new Error("Une erreur est survenue lors de l'inscription")
	}

	revalidatePath("/", "layout")
	redirect("/")
}

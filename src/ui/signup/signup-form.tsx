"use client"

import { signup } from "@/app/signup/actions"
import { Button } from "@/design-system/button"
import { Input } from "@/design-system/input"
import Link from "next/link"
import { useFormStatus } from "react-dom"

const Submit = () => {
	const { pending } = useFormStatus()
	return (
		<Button
			type="submit"
			className="w-full"
			formAction={signup}
			loading={pending}
			disabled={pending}
		>
			S'inscrire
		</Button>
	)
}

export const SignupForm = () => {
	return (
		<form className="space-y-6 sm:space-y-8">
			<div className="space-y-4">
				<Input
					name="email"
					placeholder="Email"
					required
					type="email"
					icon="envelope"
					iconPosition={"left"}
				/>
				<Input
					name="password"
					placeholder="Mot de passe"
					required
					type="password"
					minLength={6}
					icon="lock-closed"
					iconPosition={"left"}
				/>
				<div className="flex items-center space-x-2">
					<input type="checkbox" id="acceptCguPrivacy" required />

					<label
						htmlFor="acceptCguPrivacy"
						className="cursor-pointer text-gray-400 text-xs"
					>
						J'ai lu et j'accepte les{" "}
						<Link
							href="/conditions-generales-d-utilisation"
							className="text-indigo-400 hover:opacity-80 transition-opacity duration-150"
						>
							CGU
						</Link>{" "}
						et la{" "}
						<Link
							href="/politique-de-confidentialite"
							className="text-indigo-400 hover:opacity-80 transition-opacity duration-150"
						>
							Politique de Confidentialité
						</Link>
						.
					</label>
				</div>
			</div>

			<Submit />
		</form>
	)
}

"use client"

import { login } from "@/app/login/actions"
import { Button } from "@/design-system/button"
import { Input } from "@/design-system/input"
import { useFormStatus } from "react-dom"

const Submit = () => {
	const { pending } = useFormStatus()
	return (
		<Button
			type="submit"
			className="w-full"
			formAction={login}
			loading={pending}
		>
			Se connecter
		</Button>
	)
}

export const LoginForm = () => {
	return (
		<div className="space-y-6 sm:space-y-8">
			<form className="space-y-6 sm:space-y-8">
				<div className="space-y-4">
					<Input
						name="email"
						placeholder="Email"
						required
						type="email"
					/>
					<Input
						className="w-full"
						name="password"
						placeholder="Mot de passe"
						required
						type="password"
						minLength={6}
					/>
				</div>
				<Submit />
			</form>
		</div>
	)
}

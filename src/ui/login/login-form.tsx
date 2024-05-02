import { login } from "@/app/login/actions"
import { Button } from "@/design-system/button"
import { Input } from "@/design-system/input"

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
					{/* @TODO: checkbox pour accepter les CGU / Privacy */}
				</div>
				<Button type="submit" className="w-full" formAction={login}>
					Se connecter
				</Button>
			</form>
		</div>
	)
}

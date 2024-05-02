import { login } from "@/app/login/actions"

export const LoginForm = () => {
	return (
		<div className="space-y-6 sm:space-y-8 max-md:w-full lg:w-[30rem]">
			<form className="space-y-6 sm:space-y-8">
				<div className="space-y-6">
					<input
						name="email"
						placeholder="Email Address"
						required
						type="email"
					/>
					<input
						className="w-full"
						name="password"
						placeholder="Password"
						required
						type="password"
						minLength={6}
					/>
				</div>
				<button type="submit" className="w-full" formAction={login}>
					Login
				</button>
			</form>
		</div>
	)
}

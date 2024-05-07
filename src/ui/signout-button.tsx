"use client"

import { signout } from "@/app/signout/actions"
import { Button } from "@/design-system/button"
import { useTransition } from "react"

export const SignoutButton = () => {
	let [pending, startTransition] = useTransition()

	const onSignout = async () => {
		startTransition(() => {
			signout()
		})
	}

	return (
		<Button onClick={onSignout} loading={pending} disabled={pending}>
			Se déconnecter
		</Button>
	)
}

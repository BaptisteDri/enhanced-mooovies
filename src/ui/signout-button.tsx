"use client"

import { signout } from "@/app/signout/actions"
import { Button } from "@/design-system/button"
import { Spinner } from "@/design-system/spinner"
import { useTransition } from "react"

export const SignoutButton = () => {
	let [pending, startTransition] = useTransition()

	const onSignout = async () => {
		startTransition(() => {
			signout()
		})
	}

	return (
		<Button onClick={onSignout} loading={pending}>
			Se déconnecter
		</Button>
	)
}

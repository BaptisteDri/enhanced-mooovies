"use client"

import dynamic from "next/dynamic"
import React from "react"

import { useDrawer, DRAWER_IDS, type DrawerId } from "./drawer-provider"

export type DrawerProps = {
	closeDrawer: () => void
	data?: Record<string, unknown>
	isOpen: boolean
}

const drawers: Record<DrawerId, React.FC<DrawerProps>> = {
	[DRAWER_IDS.SEARCH]: dynamic(() =>
		import("@/ui/search/search-drawer").then((mod) => ({
			default: mod.SearchDrawer,
		})),
	) as React.FC<DrawerProps>,
	[DRAWER_IDS.MOVIE]: dynamic(() =>
		import("@/design-system/movie-drawer").then((mod) => ({
			default: mod.MovieDrawer,
		})),
	) as React.FC<DrawerProps>,
}

export const DrawerRender = () => {
	const { isActiveDrawer, isOpen, closeDrawer, data } = useDrawer()

	const activeDrawerId = Object.keys(drawers).find((drawerId) =>
		isActiveDrawer(drawerId as DrawerId),
	) as DrawerId | undefined

	const ActiveDrawer = activeDrawerId ? drawers[activeDrawerId] : null

	if (!ActiveDrawer) return <></>

	return <ActiveDrawer closeDrawer={closeDrawer} data={data} isOpen={isOpen} />
}

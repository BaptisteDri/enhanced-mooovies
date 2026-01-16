"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export const DRAWER_IDS = {
	SEARCH: "search",
	MOVIE: "movie",
} as const

export type DrawerId = (typeof DRAWER_IDS)[keyof typeof DRAWER_IDS]

type DrawerState = {
	data?: Record<string, unknown>
	id: DrawerId | null
}

type DrawerContextType = {
	closeDrawer: () => void
	data?: Record<string, unknown>
	isActiveDrawer: (id: DrawerId) => boolean
	isOpen: boolean
	isOpenDrawer: boolean
	openDrawer: (state: DrawerState) => void
	updateDrawerData: (newData: Partial<DrawerState["data"]>) => void
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined)

type Props = {
	children: ReactNode
}

export const DrawerProvider = ({ children }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [drawerState, setDrawerState] = useState<DrawerState>({
		id: null,
		data: undefined,
	})

	const openDrawer = (state: DrawerState) => {
		setDrawerState(state)
		setIsOpen(true)
	}

	const closeDrawer = () => {
		setIsOpen(false)

		setTimeout(() => {
			setDrawerState({ id: null, data: undefined })
		}, 200)
	}

	const updateDrawerData = (newData: Partial<DrawerState["data"]>) => {
		setDrawerState((prevState) => ({
			...prevState,
			data: {
				...(prevState.data as object),
				...newData,
			},
		}))
	}

	const isActiveDrawer = (id: DrawerId) => drawerState.id === id

	const isOpenDrawer: boolean = !!drawerState.id && isOpen

	return (
		<DrawerContext.Provider
			value={{
				closeDrawer,
				data: drawerState.data,
				isOpen,
				isOpenDrawer,
				isActiveDrawer,
				openDrawer,
				updateDrawerData,
			}}
		>
			{children}
		</DrawerContext.Provider>
	)
}

export const useDrawer = () => {
	const context = useContext(DrawerContext)
	if (!context) {
		throw new Error("useDrawer doit être wrap par DrawerProvider")
	}
	return context
}

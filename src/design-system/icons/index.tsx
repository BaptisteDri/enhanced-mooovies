import { Check } from "@/design-system/icons/check"
import { Envelope } from "@/design-system/icons/envelope"
import { Eye } from "@/design-system/icons/eye"
import { EyeSlash } from "@/design-system/icons/eye-slash"
import { Home } from "@/design-system/icons/home"
import { LockClosed } from "@/design-system/icons/lock-closed"
import { MagnifyingGlass } from "@/design-system/icons/magnifying-glass"
import { Plus } from "@/design-system/icons/plus"
import { PlusCircle } from "@/design-system/icons/plus-circle"
import { UserCircle } from "@/design-system/icons/user-circle"
import { XMark } from "@/design-system/icons/x-mark"

const ICONS = {
	envelope: Envelope,
	eye: Eye,
	"eye-slash": EyeSlash,
	home: Home,
	"lock-closed": LockClosed,
	"magnifying-glass": MagnifyingGlass,
	"user-circle": UserCircle,
	check: Check,
	plus: Plus,
	"x-mark": XMark,
	"plus-circle": PlusCircle,
} as const

export type IconName = keyof typeof ICONS

type Props = {
	name: IconName
	size?: number
	style?: "solid" | "outline"
}

export type IconProps = Pick<Props, "size" | "style">

export const Icon = ({ name, size = 16, style = "outline" }: Props) => {
	const IconComponent = ICONS[name]

	return <IconComponent size={size} style={style} />
}

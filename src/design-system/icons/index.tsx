import { Envelope } from "@/design-system/icons/envelope"
import { Eye } from "@/design-system/icons/eye"
import { EyeSlash } from "@/design-system/icons/eye-slash"
import { LockClosed } from "@/design-system/icons/lock-closed"

const ICONS = {
	envelope: Envelope,
	eye: Eye,
	"eye-slash": EyeSlash,
	"lock-closed": LockClosed,
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

import { IconArrowRight } from "@tabler/icons-react"

import LinkButton from "./LinkButton"

interface CtaButtonProps {
  label: string
  action: string | (() => void)
}

export default function CtaButton({ label, action }: CtaButtonProps) {
  return (
    <LinkButton action={action} className="gap-1">
      {label}
      <IconArrowRight role="presentation" size={18} />
    </LinkButton>
  )
}

import type { PropsWithChildren } from "react"

import { cn } from "~/lib/cn"

type LinkButtonProps = PropsWithChildren<{
  className?: string
  action: string | (() => void)
}>

export default function LinkButton({ children, className, action }: LinkButtonProps) {
  className = cn(
    "inline-flex items-center rounded-xl px-6 py-3 leading-none duration-200 select-none active:scale-95",
    "text-neutral-0 bg-indigo-600 hover:bg-indigo-500",
    className,
  )

  if (typeof action === "string") {
    const external = !action.startsWith("/") && !action.startsWith("#")
    return (
      <a
        href={action}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        draggable={false}
        className={className}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button type="button" onClick={action} className={className}>
        {children}
      </button>
    )
  }
}

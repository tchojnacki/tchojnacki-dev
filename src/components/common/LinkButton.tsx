import clsx from "clsx"
import type { ReactNode } from "react"

interface LinkButtonProps {
  children: ReactNode
  href: string
  className?: string
  size?: "small" | "normal"
}

export default function LinkButton({
  children,
  href,
  className,
  size = "normal",
}: LinkButtonProps) {
  const external = href && !href.startsWith("/") && !href.startsWith("#")

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={clsx(
        "text-neutral-0 inline-block rounded-xl bg-indigo-600 leading-none duration-200 hover:bg-indigo-500",
        size === "normal" ? "px-6 py-3" : "px-4 py-2",
        className,
      )}
    >
      {children}
    </a>
  )
}

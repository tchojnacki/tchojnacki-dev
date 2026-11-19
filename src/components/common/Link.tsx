import type { ComponentProps } from "react"

export default function Link({ children, href, ...props }: ComponentProps<"a">) {
  const external = href !== undefined && !href.startsWith("/") && !href.startsWith("#")

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="text-purple-700 duration-200 hover:text-neutral-1000 hover:underline dark:text-purple-300 dark:hover:text-neutral-0"
      {...props}
    >
      {children}
    </a>
  )
}

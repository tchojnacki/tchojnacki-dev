import type { ComponentProps } from "react"

export default function Link({ children, href, ...props }: ComponentProps<"a">) {
  const external = href && !href.startsWith("/") && !href.startsWith("#")

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="hover:text-neutral-1000 dark:hover:text-neutral-0 text-purple-700 duration-200 hover:underline dark:text-purple-300"
      {...props}
    >
      {children}
    </a>
  )
}

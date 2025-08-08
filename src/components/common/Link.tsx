import type { ComponentProps } from 'react'

export default function Link({ children, href, ...props }: ComponentProps<'a'>) {
  const external = href && !href.startsWith('/') && !href.startsWith('#')

  return (
    <a
      {...props}
      className="hover:text-neutral-1000 dark:hover:text-neutral-0 text-purple-700 duration-200 hover:underline dark:text-purple-300"
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      href={href}
    >
      {children}
    </a>
  )
}

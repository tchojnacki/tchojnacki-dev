import clsx from 'clsx'
import type { ComponentProps } from 'react'

type LinkProps = { text: string; external?: boolean } & Omit<ComponentProps<'a'>, 'children'>

export default function Link({ text, className, external = false, ...props }: LinkProps) {
  return (
    <a
      className={clsx(
        'text-purple-700 dark:text-purple-300 hover:text-neutral-1000 dark:hover:text-neutral-0 duration-200 hover:underline',
        className,
      )}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...props}
    >
      {text}
    </a>
  )
}

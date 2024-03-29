import clsx from 'clsx'
import type { ReactNode } from 'react'

interface LinkButtonProps {
  children: ReactNode
  href: string
  className?: string
  external?: boolean
  size?: 'small' | 'normal'
}

export default function LinkButton({
  children,
  href,
  className,
  external = false,
  size = 'normal',
}: LinkButtonProps) {
  return (
    <a
      href={href}
      className={clsx(
        'bg-indigo-600 text-neutral-0 hover:bg-indigo-500 inline-block rounded-xl leading-none duration-200',
        size === 'normal' ? 'px-6 py-3' : 'px-4 py-2',
        className,
      )}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

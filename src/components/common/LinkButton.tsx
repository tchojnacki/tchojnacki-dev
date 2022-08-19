import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

interface LinkButtonProps {
  children: ReactNode
  href: string
  className?: string
  type?: 'internal' | 'external'
  size?: 'small' | 'normal'
}

export function LinkButton({
  children,
  href,
  className,
  type = 'internal',
  size = 'normal',
}: LinkButtonProps) {
  const styling = clsx(
    'inline-block rounded-xl bg-indigo-8 leading-none text-slate-12 duration-200 hover:brightness-150',
    size === 'normal' ? 'px-6 py-3' : 'px-4 py-2',
    className
  )

  return type === 'internal' ? (
    <Link href={href}>
      <a className={styling}>{children}</a>
    </Link>
  ) : (
    <a href={href} className={styling} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

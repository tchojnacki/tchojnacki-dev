import Link from 'next/link'

interface LinkButtonProps {
  children: string
  href: string
}

export function LinkButton({ children, href }: LinkButtonProps) {
  return (
    <Link href={href}>
      <a className="inline-block rounded-xl bg-indigo-8 px-6 py-3 leading-none text-slate-12 duration-200 hover:brightness-150">
        {children}
      </a>
    </Link>
  )
}

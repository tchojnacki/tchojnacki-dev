import Link from 'next/link'

interface LinkButtonProps {
  children: string
  href: string
}

export function LinkButton({ children, href }: LinkButtonProps) {
  return (
    <Link href={href}>
      <a className="inline-block rounded-xl bg-indigo-9 px-6 py-3 leading-none text-pure-white duration-200 hover:bg-indigo-11">
        {children}
      </a>
    </Link>
  )
}

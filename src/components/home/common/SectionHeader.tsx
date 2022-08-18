import { Link } from 'tabler-icons-react'

interface SectionHeaderProps {
  children: string
  slug?: string
}

const textToSlug = (text: string) => text.toLowerCase().replace(/\s+/g, '-')

export function SectionHeader({ children, slug }: SectionHeaderProps) {
  const id = slug ?? textToSlug(children)

  return (
    <h3
      id={id}
      className="text-center text-4xl font-bold capitalize pt-4 flex justify-center items-center"
    >
      <a className="px-10 peer" href={`#${id}`}>
        {children}
      </a>
      <Link className="-order-1 -mr-8 opacity-0 peer-hover:opacity-50 duration-200" />
    </h3>
  )
}

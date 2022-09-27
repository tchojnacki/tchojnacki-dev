import { Link } from 'tabler-icons-react'

interface SectionHeaderProps {
  children: string
  slug?: string
}

const textToSlug = (text: string) => text.toLowerCase().replace(/\s+/g, '-')

export function SectionHeader({ children, slug }: SectionHeaderProps) {
  const id = slug ?? textToSlug(children)

  return (
    <h2
      id={id}
      className="group text-center text-4xl font-bold capitalize pt-4 flex justify-center items-center"
    >
      <a className="px-10" href={`#${id}`}>
        {children}
      </a>
      <Link
        aria-label="Section link"
        className="-order-1 -mr-8 opacity-0 group-hover:opacity-50 duration-200"
      />
    </h2>
  )
}

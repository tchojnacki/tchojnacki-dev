interface SectionHeaderProps {
  children: string
  slug?: string
}

const textToSlug = (text: string) => text.toLowerCase().replace(/\s+/g, '-')

export function SectionHeader({ children, slug }: SectionHeaderProps) {
  const id = slug ?? textToSlug(children)

  return (
    <h3 id={id} className="text-center text-4xl font-bold capitalize pt-4">
      <a href={`#${id}`}>{children}</a>
    </h3>
  )
}

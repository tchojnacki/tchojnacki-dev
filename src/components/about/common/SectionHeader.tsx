interface SectionHeaderProps {
  children: string
}

export function SectionHeader({ children }: SectionHeaderProps) {
  return <h3 className="text-center text-4xl font-bold capitalize">{children}</h3>
}

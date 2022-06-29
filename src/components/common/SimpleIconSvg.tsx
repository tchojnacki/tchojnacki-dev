import { SimpleIcon } from 'simple-icons'

interface SimpleIconProps {
  icon: SimpleIcon
  className?: string
  pathClassName?: string
}

export function SimpleIconSvg({ icon, pathClassName, className }: SimpleIconProps) {
  return (
    <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>{icon.title}</title>
      <path className={pathClassName} d={icon.path} />
    </svg>
  )
}

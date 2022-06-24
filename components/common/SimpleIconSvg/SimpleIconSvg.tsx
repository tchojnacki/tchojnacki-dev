import { SimpleIcon } from 'simple-icons'

interface SimpleIconProps {
  icon: SimpleIcon
  pathClassName?: string
}

export function SimpleIconSvg({ icon, pathClassName }: SimpleIconProps) {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>{icon.title}</title>
      <path className={pathClassName} d={icon.path} />
    </svg>
  )
}

import clsx from 'clsx'
import type { SimpleIcon } from 'simple-icons'

interface SimpleIconProps {
  icon: SimpleIcon | string
  title?: string
  className?: string
  pathClassName?: string
}

export function SimpleIconSvg({ icon, title, pathClassName, className }: SimpleIconProps) {
  return (
    <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>{title ? title : typeof icon === 'string' ? icon : icon.title}</title>
      {typeof icon === 'string' ? (
        <text
          x="50%"
          y="50%"
          fontSize={24}
          fontWeight="bold"
          fontFamily="monospace"
          textAnchor="middle"
          dominantBaseline="central"
          className={clsx(pathClassName, 'select-none')}
        >
          {icon.charAt(0)}
        </text>
      ) : (
        <path className={pathClassName} d={icon.path} />
      )}
    </svg>
  )
}

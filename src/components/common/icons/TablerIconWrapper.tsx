import { ReactNode } from 'react'

export interface IconProps {
  className: string
}

interface TablerIconWrapperProps {
  className: string
  children: ReactNode
}

export function TablerIconWrapper({ className, children }: TablerIconWrapperProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  )
}

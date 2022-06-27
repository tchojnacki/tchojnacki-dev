import { CSSProperties, ReactElement } from 'react'

import { SkillCardProps } from '../SkillCard'

interface SkillCardWrapperProps {
  children: ReactElement<SkillCardProps> | Array<ReactElement<SkillCardProps>>
  width: number
  height: number
  largest?: number
}

export function SkillCardWrapper({ children, width, height, largest = 1 }: SkillCardWrapperProps) {
  return (
    <ul
      className="grid grid-flow-col-dense grid-cols-[repeat(var(--grid-height),1fr)] grid-rows-[repeat(var(--grid-width),1fr)] gap-2 sm:grid-flow-row-dense sm:grid-cols-[repeat(var(--grid-width),calc(8rem/var(--grid-largest)))] sm:grid-rows-[repeat(var(--grid-height),calc(8rem/var(--grid-largest)))]"
      style={
        {
          '--grid-width': width,
          '--grid-height': height,
          '--grid-largest': largest,
        } as CSSProperties
      }
    >
      {children}
    </ul>
  )
}

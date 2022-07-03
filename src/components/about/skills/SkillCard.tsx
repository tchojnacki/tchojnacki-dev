import { CSSProperties } from 'react'

import { SimpleIconSvg } from 'components'
import { TechnologyDefinition } from 'data'

export interface SkillCardProps {
  skill: Omit<TechnologyDefinition, 'type'>
  size?: number
}

export function SkillCard({ skill, size = 1 }: SkillCardProps) {
  return (
    <li
      className="col-[span_var(--skill-size)] row-[span_var(--skill-size)] flex flex-col items-center gap-2 rounded-xl bg-slate-12 dark:bg-indigo-2 p-3 pt-5"
      style={{ '--skill-size': size } as CSSProperties}
    >
      <SimpleIconSvg
        icon={skill.icon}
        className="h-full"
        pathClassName="fill-slate-3 dark:fill-slate-12"
      />
      <h5 className="hidden whitespace-nowrap text-center text-[calc(1.25rem*var(--skill-size)/var(--grid-largest))] sm:block">
        {skill.name}
      </h5>
    </li>
  )
}

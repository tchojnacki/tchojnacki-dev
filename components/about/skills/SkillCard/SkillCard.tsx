import classNames from 'classnames'
import { Omit } from 'lodash'
import { CSSProperties } from 'react'

import { SimpleIconSvg } from '@/components/common/SimpleIconSvg'
import { TechnologyDefinition } from '@/data/technologies'

export interface SkillCardProps {
  skill: Omit<TechnologyDefinition, 'type'>
  size?: number
}

export function SkillCard({ skill, size = 1 }: SkillCardProps) {
  return (
    <li
      className="col-[span_var(--skill-size)] row-[span_var(--skill-size)] flex flex-col items-center gap-2 rounded-xl bg-indigo-2 p-3 pt-5"
      style={{ '--skill-size': size } as CSSProperties}
    >
      <SimpleIconSvg icon={skill.icon} className="h-full" pathClassName="fill-pure-white" />
      <h5 className="hidden whitespace-nowrap text-center text-[calc(1.25rem*var(--skill-size)/var(--grid-largest))] sm:block">
        {skill.name}
      </h5>
    </li>
  )
}

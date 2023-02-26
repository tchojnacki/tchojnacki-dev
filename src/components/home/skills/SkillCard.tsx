import Link from 'next/link'
import { CSSProperties } from 'react'

import { SimpleIconSvg } from 'components'
import { Technology } from 'data'
import { serializeTechnology } from 'hooks'

export interface SkillCardProps {
  skill: Technology
  size?: number
}

export function SkillCard({ skill, size = 1 }: SkillCardProps) {
  return (
    <li
      className="col-[span_var(--skill-size)] row-[span_var(--skill-size)]"
      style={{ '--skill-size': size } as CSSProperties}
    >
      <Link
        href={`/projects?filter=${serializeTechnology(skill)}`}
        className="flex flex-col items-center gap-2 rounded-xl bg-slate-12 dark:bg-indigo-2
          p-3 pt-5 shadow-md shadow-indigo-2/25 dark:shadow-indigo-11/10 min-w-[4rem] h-full"
      >
        <SimpleIconSvg
          icon={skill.icon}
          className="h-full"
          pathClassName="fill-slate-3 dark:fill-slate-12"
        />
        <h5
          className="hidden whitespace-nowrap text-center
            text-[calc(1.25rem*var(--skill-size)/var(--grid-largest))] sm:block"
        >
          {skill.name}
        </h5>
      </Link>
    </li>
  )
}

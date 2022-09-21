import clsx from 'clsx'
import sortBy from 'lodash/sortBy'
import { useState } from 'react'

import { SimpleIconSvg } from 'components'
import { Project, Technology } from 'data'

const TAGS = sortBy(
  Object.values(Technology.LIST)
    .map(t => ({
      ...t,
      count: Object.values(Project.LIST).filter(p => p.usesTechnology(t)).length,
    }))
    .filter(({ count }) => count > 0),
  t => -t.count,
  t => t.name
)

export function ProjectFilters() {
  const [filter, setFilter] = useState<Technology | null>(null)

  return (
    <fieldset className="px-16">
      <legend className="text-2xl my-4">Filters</legend>
      <ul className="flex gap-2 flex-wrap after:flex-grow-[100]">
        {TAGS.map(t => (
          <li key={t.name} className="flex-1">
            <input
              type="checkbox"
              id={t.name}
              name={t.name}
              checked={t === filter}
              onChange={() => setFilter(prev => (prev === t ? null : t))}
              hidden
            />
            <label
              htmlFor={t.name}
              className={clsx(
                'rounded-full flex items-center gap-1 px-3 bg-slate-3/10 dark:bg-slate-12/10 whitespace-nowrap',
                filter !== null && filter !== t && 'opacity-25'
              )}
            >
              <SimpleIconSvg
                icon={t.icon}
                title={t.name}
                className="h-[1em] my-1"
                pathClassName="fill-slate-3 dark:fill-slate-12"
              />
              <span>{t.name}</span>
              <strong className="ml-auto pl-1 font-bold">{t.count}</strong>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}

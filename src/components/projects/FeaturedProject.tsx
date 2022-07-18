import { Fragment } from 'react'

import { SimpleIconSvg } from 'components'
import { ProjectDefinition } from 'data'

interface FeaturedProjectProps {
  project: ProjectDefinition
}

const MASK_TAGS = 'linear-gradient(90deg, #000 75%, transparent)'

export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <li className="max-w-[64rem] grid grid-cols-8 grid-rows-1 items-center">
      <div className="col-start-1 col-span-5 row-span-full rounded-3xl overflow-hidden">
        <picture>
          <img alt={project.name} src="/static/projects/placeholder.png" />
        </picture>
      </div>
      <div
        className="col-start-4 col-span-5 row-span-full rounded-l-3xl bg-gradient-to-r
      from-indigo-11 to-slate-12 dark:from-indigo-4 dark:to-indigo-2 p-8 flex flex-col"
      >
        <h4 className="flex items-center mb-5">
          <span className="text-3xl font-bold mr-auto">{project.name}</span>
          <ul className="flex gap-2">
            {project.tags.map(({ displayName, backgroundColor }) => (
              <li
                key={displayName}
                style={{ backgroundColor }}
                className="rounded-full px-3 text-slate-12"
              >
                {displayName}
              </li>
            ))}
          </ul>
        </h4>
        <p>{project.description}</p>
        {project.parts.map(({ name, technologies }) => (
          <Fragment key={name}>
            <h5 className="text-xl mt-3 mb-1">{name}</h5>
            <ul
              className="flex gap-2 overflow-hidden "
              style={{ WebkitMaskImage: MASK_TAGS, maskImage: MASK_TAGS }}
            >
              {technologies.map(({ name, icon }, i) => (
                <li
                  key={name}
                  className="rounded-full flex items-center gap-1 px-3
                  bg-slate-3/10 dark:bg-slate-12/10"
                >
                  <SimpleIconSvg
                    icon={icon}
                    className="h-[1em]"
                    pathClassName="fill-slate-3 dark:fill-slate-12"
                  />
                  {i < 3 && <span>{name}</span>}
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
    </li>
  )
}

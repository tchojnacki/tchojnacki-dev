import clsx from 'clsx'
import Image from 'next/image'
import { Fragment } from 'react'

import { SimpleIconSvg } from 'components'
import { Project } from 'data'

interface FeaturedProjectProps {
  project: Project
  flipped?: boolean
}

export function FeaturedProject({ project, flipped }: FeaturedProjectProps) {
  return (
    <li
      className="max-w-[64rem] grid lg:grid-cols-8 lg:grid-rows-1 items-center rounded-3xl
      shadow-md shadow-indigo-2/25 dark:shadow-indigo-11/10 lg:shadow-none"
    >
      <div
        className={clsx(
          flipped ? 'lg:col-start-4' : 'lg:col-start-1',
          'lg:col-span-5 lg:row-span-full rounded-t-3xl lg:rounded-b-3xl overflow-hidden',
          'shadow-none lg:shadow-md lg:shadow-indigo-2/25 dark:lg:shadow-indigo-11/10'
        )}
      >
        <Image
          alt={project.name}
          layout="responsive"
          src={project.image}
          sizes="(max-width: 1024px) 100vw, 1024px"
          placeholder="blur"
        />
      </div>
      <div
        className={clsx(
          flipped
            ? 'lg:col-start-1 bg-gradient-to-l lg:rounded-bl-none lg:rounded-tr-3xl'
            : 'lg:col-start-4 bg-gradient-to-r lg:rounded-br-none lg:rounded-tl-3xl',
          'lg:col-span-5 lg:row-span-full rounded-b-3xl p-8 flex flex-col overflow-hidden z-[1]',
          'from-indigo-11 to-indigo-11 lg:to-slate-12',
          'dark:from-indigo-4 dark:to-indigo-4 dark:lg:to-indigo-2'
        )}
      >
        <h4 className="flex lg:items-center mb-5 gap-4 flex-col lg:flex-row">
          <span className="text-3xl font-bold mr-auto">{project.name}</span>
          <ul className="flex gap-2">
            {project.tags.map(({ displayName, backgroundColor }) => (
              <li
                key={displayName}
                style={{ backgroundColor }}
                className="rounded-full px-3 text-slate-12 whitespace-nowrap"
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
              className="flex gap-2 overflow-hidden flex-wrap lg:flex-nowrap
              lg:[mask-image:linear-gradient(90deg,#000_75%,transparent)]"
            >
              {technologies.map(({ name, icon }, i) => (
                <li
                  key={name}
                  className="rounded-full flex items-center gap-1 px-3
                  bg-slate-3/10 dark:bg-slate-12/10 whitespace-nowrap"
                >
                  <SimpleIconSvg
                    icon={icon}
                    className="h-[1em] my-1"
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

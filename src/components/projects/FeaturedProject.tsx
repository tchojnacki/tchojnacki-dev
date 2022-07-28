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
      className="max-w-[64rem] w-full grid lg:grid-cols-8 lg:grid-rows-1 items-center rounded-3xl
      shadow-md shadow-indigo-2/25 dark:shadow-indigo-11/10 lg:shadow-none
      lg:animate-none motion-reduce:animate-none animate-enteronload onenter-scaling"
    >
      <div
        className={clsx(
          'lg:animate-enteronload lg:motion-reduce:animate-none lg:onenter-scaling relative',
          flipped ? 'lg:col-start-4' : 'lg:col-start-1',
          'lg:col-span-5 lg:row-span-full rounded-t-3xl lg:rounded-b-3xl overflow-hidden',
          'shadow-none lg:shadow-md lg:shadow-indigo-2/25 dark:lg:shadow-indigo-11/10',
          'peer duration-200 ease-in scale-100 lg:hover:scale-105'
        )}
      >
        <Image
          alt={project.name}
          layout="responsive"
          src={project.image}
          sizes="(max-width: 1024px) 100vw, 1024px"
          placeholder="blur"
        />
        <div className="absolute left-0 top-0 w-full h-full flex">
          <ul className={clsx('p-4 inline-flex flex-col gap-2', flipped && 'lg:ml-auto')}>
            {project.links.map(({ displayName, IconComponent, link }) => (
              <li key={displayName}>
                <a
                  href={link}
                  className="flex gap-2 px-4 py-2 bg-indigo-8 text-slate-12 rounded-xl
                  duration-200 hover:brightness-150"
                >
                  <IconComponent /> {displayName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={clsx(
          'lg:animate-enteronload lg:motion-reduce:animate-none',
          flipped
            ? 'lg:col-start-1 bg-gradient-to-l lg:rounded-bl-none lg:rounded-tr-3xl lg:onenter-fromleft'
            : 'lg:col-start-4 bg-gradient-to-r lg:rounded-br-none lg:rounded-tl-3xl lg:onenter-fromright',
          'lg:col-span-5 lg:row-span-full rounded-b-3xl p-8 flex flex-col z-[1]',
          'from-indigo-11 to-indigo-11 lg:to-slate-12',
          'dark:from-indigo-4 dark:to-indigo-4 dark:lg:to-indigo-2',
          'duration-200 ease-in translate-x-0',
          flipped ? 'lg:peer-hover:-translate-x-1/4' : 'lg:peer-hover:translate-x-1/4'
        )}
      >
        <h4 className="flex lg:items-center mb-5 gap-4 flex-col lg:flex-row">
          <span className="text-3xl font-bold mr-auto">{project.name}</span>
          <ul className="flex gap-2">
            {project.tags.map(({ displayName, backgroundColor, link }) => {
              const props = {
                style: { backgroundColor },
                className: 'rounded-full px-3 text-slate-12 whitespace-nowrap block',
              }

              return link ? (
                <li key={displayName}>
                  <a href={link} {...props}>
                    {displayName}
                  </a>
                </li>
              ) : (
                <li key={displayName} {...props}>
                  {displayName}
                </li>
              )
            })}
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

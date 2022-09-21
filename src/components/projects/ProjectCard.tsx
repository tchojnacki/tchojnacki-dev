import clsx from 'clsx'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import { ZoomCancel, ZoomIn } from 'tabler-icons-react'

import { LinkButton, SimpleIconSvg } from 'components'
import { Project } from 'data'

interface ProjectCardProps {
  project: Project
  flipped?: boolean
}

export function ProjectCard({ project, flipped }: ProjectCardProps) {
  const [isActive, setIsActive] = useState(false)
  const toggleActive = () => setIsActive(prev => !prev)

  const ZoomIcon = isActive ? ZoomCancel : ZoomIn

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
          'duration-200 ease-in scale-100',
          isActive && 'lg:scale-105'
        )}
      >
        <Image
          alt={project.name}
          layout="responsive"
          src={project.image}
          sizes="(max-width: 1024px) 100vw, 1024px"
          placeholder="blur"
        />
        <div
          className={clsx(
            'text-slate-12 absolute left-0 top-0 w-full h-full grid grid-rows-[1fr]',
            flipped
              ? 'grid-cols-[1fr_auto] grid-areas-featured-project-flipped'
              : 'grid-cols-[auto_1fr] grid-areas-featured-project-normal'
          )}
        >
          <button
            aria-label="Zoom"
            className={clsx(
              'col-start-1 col-end-[-1] row-start-1 row-end-[-1]',
              'flex justify-center items-center group duration-200',
              !isActive && 'bg-pure-black/25'
            )}
            onClick={toggleActive}
          >
            <ZoomIcon
              className={clsx(
                'duration-200',
                isActive ? 'opacity-0 group-hover:opacity-25' : 'opacity-25 group-hover:opacity-75'
              )}
              size={64}
            />
          </button>
          <ul className="m-4 inline-flex flex-col gap-2 grid-in-buttons h-min">
            {project.links.map(({ displayName, IconComponent, link }) => (
              <li key={displayName}>
                <LinkButton
                  href={link}
                  type="external"
                  size="small"
                  className={clsx(
                    'flex gap-2 items-center',
                    isActive && 'opacity-25 hover:opacity-100'
                  )}
                >
                  <IconComponent /> {displayName}
                </LinkButton>
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
          isActive && (flipped ? 'lg:-translate-x-1/3' : 'lg:translate-x-1/3')
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
                  <a href={link} target="_blank" rel="noreferrer" {...props}>
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
        <p className="text-slate-8 dark:text-slate-11">{project.description}</p>
        {project.parts.map(({ name, technologies }) => (
          <Fragment key={name}>
            <h5 className="text-xl mt-3 mb-1">{name}</h5>
            <ul
              className="flex gap-2 overflow-hidden flex-wrap lg:flex-nowrap
              lg:[mask-image:linear-gradient(90deg,#000_75%,transparent)] after:flex-grow-[100]"
            >
              {technologies.map(({ name, icon }, i) => (
                <li
                  key={name}
                  className="flex-1 rounded-full flex justify-center items-center gap-1 px-3
                  bg-slate-3/10 dark:bg-slate-12/10 whitespace-nowrap"
                >
                  <SimpleIconSvg
                    icon={icon}
                    title={name}
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

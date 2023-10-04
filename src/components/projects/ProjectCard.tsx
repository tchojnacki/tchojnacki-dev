import clsx from 'clsx'
import { Fragment, useCallback, useState, type CSSProperties } from 'react'
import { PlayerPause, PlayerPlay, ZoomCancel, ZoomIn } from 'tabler-icons-react'

import { LinkButton } from '~/components/common/LinkButton'
import { SimpleIconSvg } from '~/components/common/SimpleIconSvg.tsx'
import { Project } from '~/data'

interface ProjectCardProps {
  project: Project
  flipped?: boolean
}

export function ProjectCard({ project, flipped }: ProjectCardProps) {
  const [isActive, setIsActive] = useState(false)
  const toggleActive = useCallback(() => setIsActive(prev => !prev), [])

  const { width, height } = project.image
  const maxImageScroll = Math.floor(((height - (width * 3) / 4) / width) * 100)

  const activeIcon = maxImageScroll !== 0 ? PlayerPause : ZoomCancel
  const inactiveIcon = maxImageScroll !== 0 ? PlayerPlay : ZoomIn
  const ZoomIcon = isActive ? activeIcon : inactiveIcon

  return (
    <li
      className="grid w-full max-w-[64rem] animate-enteronload items-center rounded-3xl shadow-md
      shadow-indigo-2/25 onenter-scaling motion-reduce:animate-none dark:shadow-indigo-11/10
      lg:animate-none lg:grid-cols-8 lg:grid-rows-1 lg:shadow-none"
    >
      <div
        className={clsx(
          'relative aspect-[4/3] lg:animate-enteronload lg:onenter-scaling lg:motion-reduce:animate-none',
          flipped ? 'lg:col-start-4' : 'lg:col-start-1',
          'overflow-hidden rounded-t-3xl lg:col-span-5 lg:row-span-full lg:rounded-b-3xl',
          'shadow-none lg:shadow-md lg:shadow-indigo-2/25 dark:lg:shadow-indigo-11/10',
          'scale-100 duration-200 ease-in',
          isActive && 'lg:scale-105',
        )}
      >
        <img
          alt={project.name}
          src={project.image.src}
          className={clsx('h-auto w-full', isActive && 'animate-scrollprojectimage')}
          style={
            {
              '--max-image-scroll': `-${maxImageScroll}%`,
            } as CSSProperties
          }
        />
        <div
          className={clsx(
            'absolute left-0 top-0 grid h-full w-full grid-rows-[1fr] text-slate-12',
            flipped
              ? 'grid-cols-[1fr_auto] grid-areas-featured-project-flipped'
              : 'grid-cols-[auto_1fr] grid-areas-featured-project-normal',
          )}
        >
          <button
            aria-label="Zoom"
            className={clsx(
              'z-[1] col-start-1 col-end-[-1] row-start-1 row-end-[-1]',
              'group flex items-center justify-center duration-200',
              !isActive && 'bg-pure-black/25',
            )}
            onClick={toggleActive}
          >
            <ZoomIcon
              className={clsx(
                'duration-200',
                isActive ? 'opacity-0 group-hover:opacity-25' : 'opacity-25 group-hover:opacity-75',
              )}
              size={64}
            />
          </button>
          <ul className="z-[2] m-4 inline-flex h-min flex-col gap-2 grid-in-buttons">
            {project.links.map(({ displayName, IconComponent, link }) => (
              <li key={displayName}>
                <LinkButton
                  href={link}
                  type="external"
                  size="small"
                  className={clsx(
                    'flex items-center gap-2',
                    isActive && 'opacity-25 hover:opacity-100',
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
        itemScope
        itemType="https://schema.org/SoftwareApplication"
        className={clsx(
          'lg:animate-enteronload lg:motion-reduce:animate-none',
          flipped
            ? 'bg-gradient-to-l lg:col-start-1 lg:rounded-bl-none lg:rounded-tr-3xl lg:onenter-fromleft'
            : 'bg-gradient-to-r lg:col-start-4 lg:rounded-br-none lg:rounded-tl-3xl lg:onenter-fromright',
          'z-[1] flex flex-col rounded-b-3xl p-8 lg:col-span-5 lg:row-span-full',
          'from-indigo-11 to-indigo-11 lg:to-slate-12',
          'dark:from-indigo-4 dark:to-indigo-4 dark:lg:to-indigo-2',
          'translate-x-0 transition-[transform] duration-200 ease-in',
          isActive && (flipped ? 'lg:-translate-x-1/3' : 'lg:translate-x-1/3'),
        )}
      >
        <h4 className="mb-2 flex flex-col gap-4 lg:flex-row lg:items-center">
          <span itemProp="name" className="mr-auto text-3xl font-bold">
            {project.name}
          </span>
          <ul itemProp="keywords" className="flex gap-2">
            {project.tags.map(({ displayName, backgroundColor }) => (
              <li
                key={displayName}
                style={{ backgroundColor }}
                className="block whitespace-nowrap rounded-full px-3 text-slate-12"
              >
                {displayName}
              </li>
            ))}
          </ul>
        </h4>
        <p itemProp="description" className="text-slate-8 dark:text-slate-11">
          {project.description}
        </p>
        {project.parts.map(({ name, technologies, tags }) => (
          <Fragment key={name}>
            <h5 className="mb-2 mt-4 flex flex-col gap-2 lg:flex-row lg:items-center">
              <span className="mr-auto text-xl">{name}</span>
              <ul className="flex gap-2">
                {tags.map(({ displayName, backgroundColor }) => (
                  <li
                    key={displayName}
                    style={{ backgroundColor }}
                    className="block whitespace-nowrap rounded-full px-2 text-sm text-slate-12"
                  >
                    {displayName}
                  </li>
                ))}
              </ul>
            </h5>
            <ul
              className="flex flex-wrap gap-2 overflow-hidden after:flex-grow-[100]
              lg:flex-nowrap lg:[mask-image:linear-gradient(90deg,#000_75%,transparent)]"
            >
              {technologies.map(({ name, icon }, i) => (
                <li
                  key={name}
                  className="flex flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-full
                  bg-slate-3/10 px-3 dark:bg-slate-12/10"
                >
                  <SimpleIconSvg
                    icon={icon}
                    title={name}
                    className="my-1 h-[1em]"
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

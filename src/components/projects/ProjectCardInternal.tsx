import clsx from 'clsx'
import { Fragment, type CSSProperties, useReducer } from 'react'
import {
  Api,
  BrandGithub,
  Download,
  ExternalLink,
  FileAnalytics,
  InfoCircle,
  Notes,
  PlayerPause,
  PlayerPlay,
  ZoomCancel,
  ZoomIn,
} from 'tabler-icons-react'

import LinkButton from '~/components/common/LinkButton'
import SimpleIconSvg from '~/components/common/SimpleIconSvg.tsx'
import { useIsMounted } from '~/hooks'
import type { Project, ProjectLink, ProjectTag } from '~/utils/content'

interface TagProps {
  tag: ProjectTag
  small?: boolean
}

interface LinkProps {
  link: ProjectLink
  isActive: boolean
}

interface ProjectCardInternalProps {
  project: Project
  flipped: boolean
  heading: number
}

function Tag({ tag, small }: TagProps) {
  const { label, backgroundColor } = {
    personal: { label: 'Personal', backgroundColor: '#075b52' },
    university: { label: 'University', backgroundColor: '#075b52' },
    group: { label: 'Group', backgroundColor: '#075b52' },
    freelance: { label: 'Freelance', backgroundColor: '#075b52' },
    deprecated: { label: 'DEPRECATED', backgroundColor: '#ca3214' },
    wip: { label: 'WORK IN PROGRESS', backgroundColor: '#d97706' },
  }[tag]

  return (
    <li
      style={{ backgroundColor }}
      className={clsx(
        'block whitespace-nowrap rounded-full text-slate-12',
        small ? 'px-2 text-sm' : 'px-3',
      )}
    >
      {label}
    </li>
  )
}

function Link({ link, isActive }: LinkProps) {
  const { label, href, Icon } = (() => {
    switch (link.type) {
      case 'github':
        return {
          label: 'Source' + (link.part ? ` - ${link.part}` : ''),
          href: `https://github.com/${link.owner ?? 'tchojnacki'}/${link.repo}`,
          Icon: BrandGithub,
        }
      case 'deploy':
        return { label: 'Visit', href: link.href, Icon: ExternalLink }
      case 'documentation':
        return { label: 'Documentation', href: link.href, Icon: Notes }
      case 'information':
        return { label: 'More Info', href: link.href, Icon: InfoCircle }
      case 'download':
        return { label: 'Download', href: link.href, Icon: Download }
      case 'swagger':
        return { label: 'Swagger', href: link.href, Icon: Api }
      case 'paper':
        return { label: 'Paper', href: link.href, Icon: FileAnalytics }
    }
  })()

  return (
    <li>
      <LinkButton
        href={href}
        type="external"
        size="small"
        className={clsx('flex items-center gap-2', isActive && 'opacity-25 hover:opacity-100')}
      >
        <Icon /> {label}
      </LinkButton>
    </li>
  )
}

export default function ProjectCardInternal({
  project,
  flipped,
  heading,
}: ProjectCardInternalProps) {
  const [isActive, toggleActive] = useReducer(prev => !prev, false)
  const isMounted = useIsMounted()

  const { width, height } = project.image
  const maxImageScroll = Math.floor(((height - (width * 3) / 4) / width) * 100)

  const activeIcon = maxImageScroll !== 0 ? PlayerPause : ZoomCancel
  const inactiveIcon = maxImageScroll !== 0 ? PlayerPlay : ZoomIn
  const ZoomIcon = isActive ? activeIcon : inactiveIcon
  const H1 = `h${heading}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  const H2 = `h${heading + 1}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  return (
    <>
      <div
        className={clsx(
          'relative aspect-[4/3]',
          flipped ? 'onenter-fromright lg:col-start-4' : 'onenter-fromleft lg:col-start-1',
          'overflow-hidden rounded-t-3xl lg:col-span-5 lg:row-span-full lg:rounded-b-3xl',
          'shadow-none lg:shadow-md lg:shadow-indigo-2/25 dark:lg:shadow-indigo-11/10',
          'scale-100 duration-200 ease-in',
          isActive && 'lg:scale-105',
          isMounted ? 'animate-enteronload opacity-100 motion-reduce:animate-none' : 'opacity-0',
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
            {project.links.map(link => (
              <Link
                key={`${link.type}-${link.type === 'github' ? link.repo : link.href}`}
                link={link}
                isActive={isActive}
              />
            ))}
          </ul>
        </div>
      </div>
      <article
        itemScope
        itemType="https://schema.org/SoftwareApplication"
        className={clsx(
          flipped
            ? 'bg-gradient-to-l onenter-fromleft lg:col-start-1 lg:rounded-bl-none lg:rounded-tr-3xl'
            : 'bg-gradient-to-r onenter-fromright lg:col-start-4 lg:rounded-br-none lg:rounded-tl-3xl',
          'z-[1] flex flex-col rounded-b-3xl p-8 lg:col-span-5 lg:row-span-full',
          'from-indigo-11 to-indigo-11 lg:to-slate-12',
          'dark:from-indigo-4 dark:to-indigo-4 dark:lg:to-indigo-2',
          'translate-x-0 transition-[transform] duration-200 ease-in',
          isActive && (flipped ? 'lg:-translate-x-1/3' : 'lg:translate-x-1/3'),
          isMounted ? 'animate-enteronload opacity-100 motion-reduce:animate-none' : 'opacity-0',
        )}
      >
        <H1 className="mb-2 flex flex-col gap-4 lg:flex-row lg:items-center">
          <span itemProp="name" className="mr-auto text-2xl font-bold">
            {project.name}
          </span>
          <ul itemProp="keywords" className="flex gap-2">
            {project.tags.map(tag => (
              <Tag key={tag} tag={tag} />
            ))}
          </ul>
        </H1>
        <p itemProp="description" className="text-justify text-slate-8 dark:text-slate-11">
          {project.description}
        </p>
        {project.parts.map(({ name, skills: technologies, tags }) => (
          <Fragment key={name}>
            <H2 className="mb-2 mt-4 flex flex-col gap-2 lg:flex-row lg:items-center">
              <span className="mr-auto text-xl">{name}</span>
              <ul className="flex gap-2">
                {tags.map(tag => (
                  <Tag key={tag} tag={tag} small />
                ))}
              </ul>
            </H2>
            <ul
              className="flex flex-wrap gap-2 overflow-hidden after:flex-grow-[100]
              lg:flex-nowrap lg:[mask-image:linear-gradient(90deg,#000_75%,transparent)]"
            >
              {technologies.map(({ name, icon, id }, i) => (
                <li key={id}>
                  <a
                    title={name}
                    href={`/skills/${id}`}
                    className="flex flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-full bg-slate-3/10
                      px-3 duration-200 hover:bg-slate-3/20 dark:bg-slate-12/10 hover:dark:bg-slate-12/20"
                  >
                    <SimpleIconSvg
                      icon={icon ?? name}
                      title={name}
                      className="my-1 h-[1em]"
                      pathClassName="fill-slate-3 dark:fill-slate-12"
                    />
                    {i < 3 && <span>{name}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </article>
    </>
  )
}

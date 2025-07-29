import clsx from 'clsx'
import { Fragment, useReducer, type CSSProperties } from 'react'
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
        'block rounded-full whitespace-nowrap text-neutral-100',
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
        external
        href={href}
        size="small"
        className={clsx('flex! items-center gap-2', isActive && 'opacity-25 hover:opacity-100')}
      >
        <Icon role="presentation" /> {label}
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
  const maxImageScroll = Math.floor(100 - (75 * width) / height)

  const activeIcon = maxImageScroll !== 0 ? PlayerPause : ZoomCancel
  const inactiveIcon = maxImageScroll !== 0 ? PlayerPlay : ZoomIn
  const ZoomIcon = isActive ? activeIcon : inactiveIcon
  const H1 = `h${heading}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  const H2 = `h${heading + 1}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  return (
    <>
      <div
        className={clsx(
          'relative aspect-4/3',
          flipped ? 'lg:onenter-fromright lg:col-start-4' : 'lg:onenter-fromleft lg:col-start-1',
          'overflow-hidden rounded-t-3xl lg:col-span-5 lg:row-span-full lg:rounded-b-3xl',
          'lg:shadow-indigo-925/25 shadow-none lg:shadow-md dark:lg:shadow-indigo-100/10',
          'scale-100 duration-200 ease-in',
          isActive && 'lg:scale-105',
          isMounted ? 'motion-safe:animate-enteronload opacity-100' : 'opacity-0',
        )}
      >
        <img
          alt={project.name}
          src={project.image.src}
          className={clsx('absolute h-auto w-full', isActive && 'animate-scrollprojectimage')}
          style={
            {
              '--max-image-scroll': `-${maxImageScroll}%`,
            } as CSSProperties
          }
        />
        <div
          className={clsx(
            'absolute top-0 left-0 grid h-full w-full grid-rows-[1fr] text-neutral-100',
            flipped
              ? "grid-cols-[1fr_auto] [grid-template-areas:'._buttons']"
              : "grid-cols-[auto_1fr] [grid-template-areas:'buttons_.']",
          )}
        >
          <button
            aria-label="Zoom"
            className={clsx(
              'z-1 col-start-1 col-end-[-1] row-start-1 row-end-[-1]',
              'group flex items-center justify-center duration-200',
              !isActive && 'bg-neutral-1000/25',
            )}
            onClick={toggleActive}
          >
            <ZoomIcon
              role="presentation"
              className={clsx(
                'duration-200',
                isActive ? 'opacity-0 group-hover:opacity-25' : 'opacity-25 group-hover:opacity-75',
              )}
              size={64}
            />
          </button>
          <ul className="z-2 m-4 inline-flex h-min flex-col gap-2 [grid-area:buttons]">
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
            ? 'lg:onenter-fromleft bg-linear-to-l lg:col-start-1 lg:rounded-tr-3xl lg:rounded-bl-none'
            : 'lg:onenter-fromright bg-linear-to-r lg:col-start-4 lg:rounded-tl-3xl lg:rounded-br-none',
          'z-1 flex flex-col rounded-b-3xl p-8 lg:col-span-5 lg:row-span-full',
          'lg:to-neudigo-50 from-indigo-100 to-indigo-100',
          'dark:from-indigo-925 dark:to-indigo-925 dark:lg:to-neudigo-950',
          'translate-x-0 transition-[translate] duration-200 ease-in',
          isActive && (flipped ? 'lg:-translate-x-1/3' : 'lg:translate-x-1/3'),
          isMounted ? 'motion-safe:animate-enteronload opacity-100' : 'opacity-0',
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
        <p itemProp="description" className="text-justify text-neutral-600 dark:text-neutral-400">
          {project.description}
        </p>
        {project.parts.map(({ name, skills: technologies, tags }) => (
          <Fragment key={name}>
            <H2 className="mt-4 mb-2 flex flex-col gap-2 lg:flex-row lg:items-center">
              <span className="mr-auto text-xl">{name}</span>
              <ul className="flex gap-2">
                {tags.map(tag => (
                  <Tag key={tag} tag={tag} small />
                ))}
              </ul>
            </H2>
            <ul className="flex flex-wrap gap-2 overflow-hidden after:grow-100 lg:flex-nowrap lg:mask-[linear-gradient(90deg,#000_75%,transparent)]">
              {technologies.map(({ name, icon, id }, i) => (
                <li key={id}>
                  <a
                    title={name}
                    href={`/skills/${id}`}
                    className="flex flex-1 items-center justify-center gap-1 rounded-full bg-neutral-900/10 px-3 whitespace-nowrap duration-200 hover:bg-neutral-900/20 dark:bg-neutral-100/10 hover:dark:bg-neutral-100/20"
                  >
                    <SimpleIconSvg
                      icon={icon ?? name}
                      title={name}
                      className="my-1 h-[1em]"
                      pathClassName="fill-neutral-900 dark:fill-neutral-100"
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

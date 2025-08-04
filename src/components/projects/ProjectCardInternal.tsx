import {
  IconBrandGithub,
  IconDownload,
  IconExternalLink,
  IconFileTypePdf,
  IconMessageStar,
  IconNotebook,
  IconPlayerPause,
  IconPlayerPlay,
  IconZoomCancel,
  IconZoomIn,
} from '@tabler/icons-react'
import clsx from 'clsx'
import { useReducer, type CSSProperties } from 'react'

import LinkButton from '~/components/common/LinkButton'
import SkillIcon from '~/components/skills/SkillIcon'
import type { Project, ProjectLink, ProjectTag } from '~/content'
import { useIsMounted } from '~/hooks'

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
    personal: { label: 'Personal', backgroundColor: '#115e59' },
    academic: { label: 'Academic', backgroundColor: '#115e59' },
    freelance: { label: 'Freelance', backgroundColor: '#115e59' },
    bootcamp: { label: 'Bootcamp', backgroundColor: '#115e59' },
    group: { label: 'Group', backgroundColor: '#6b21a8' },
    wip: { label: 'WIP', backgroundColor: '#854d0e' },
    deprecated: { label: 'DEPRECATED', backgroundColor: '#9f1239' },
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

function Link({ link: { type, href, part }, isActive }: LinkProps) {
  const { label, Icon } = {
    repository: { label: 'Repository', Icon: IconBrandGithub },
    livedemo: { label: 'Live Demo', Icon: IconExternalLink },
    documentation: { label: 'Documentation', Icon: IconNotebook },
    download: { label: 'Download', Icon: IconDownload },
    publication: { label: 'Publication', Icon: IconFileTypePdf },
    blogpost: { label: 'Blog Post', Icon: IconMessageStar },
  }[type]

  return (
    <li>
      <LinkButton
        external
        href={href}
        size="small"
        className={clsx('flex! items-center gap-2', isActive && 'opacity-10 hover:opacity-100')}
      >
        <Icon role="presentation" /> {label + (part ? ` – ${part}` : '')}
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
  const imageScrollDuration = Math.round(maxImageScroll * 100)

  const activeIcon = maxImageScroll !== 0 ? IconPlayerPause : IconZoomCancel
  const inactiveIcon = maxImageScroll !== 0 ? IconPlayerPlay : IconZoomIn
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
          className={clsx(
            'animate-scrollprojectimage absolute h-auto w-full',
            isActive ? '[animation-play-state:running]' : '[animation-play-state:paused]',
          )}
          style={
            {
              '--max-image-scroll': `-${maxImageScroll}%`,
              animationDuration: `${imageScrollDuration}ms`,
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
          {project.links.length > 0 ? (
            <ul className="z-2 m-4 inline-flex h-min flex-col gap-2 [grid-area:buttons]">
              {project.links.map(link => (
                <Link
                  key={`${link.type}-${link.href}-${link.part}`}
                  link={link}
                  isActive={isActive}
                />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <article
        itemScope
        itemType="https://schema.org/SoftwareApplication"
        className={clsx(
          flipped
            ? 'lg:onenter-fromleft bg-linear-to-l lg:col-start-1 lg:rounded-tr-3xl lg:rounded-bl-none'
            : 'lg:onenter-fromright bg-linear-to-r lg:col-start-4 lg:rounded-tl-3xl lg:rounded-br-none',
          'z-1 rounded-b-3xl p-4 sm:p-8 lg:col-span-5 lg:row-span-full',
          'lg:to-neudigo-50 from-indigo-100 to-indigo-100',
          'dark:from-indigo-925 dark:to-indigo-925 dark:lg:to-neudigo-950',
          'translate-x-0 transition-[translate] duration-200 ease-in',
          isActive && (flipped ? 'lg:-translate-x-1/3' : 'lg:translate-x-1/3'),
          isMounted ? 'motion-safe:animate-enteronload opacity-100' : 'opacity-0',
        )}
      >
        <H1 className="mb-2 flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
          <span itemProp="name" className="mr-auto text-2xl font-bold">
            {project.name}
          </span>
          {project.tags.length > 0 ? (
            <ul itemProp="keywords" className="flex gap-2">
              {project.tags.map(tag => (
                <Tag key={tag} tag={tag} />
              ))}
            </ul>
          ) : null}
        </H1>
        <p itemProp="description" className="text-justify text-neutral-600 dark:text-neutral-400">
          {project.description}
        </p>
        {project.parts.map(part => (
          <section key={part.name} className={clsx(part.small ? 'lg:inline-block lg:w-1/2' : null)}>
            <H2 className="mt-4 mb-1 flex flex-col gap-2 lg:flex-row lg:items-center">
              <span className="mr-auto text-xl">{part.name}</span>
              {part.tags.length > 0 ? (
                <ul className="flex gap-2">
                  {part.tags.map(tag => (
                    <Tag key={tag} tag={tag} small />
                  ))}
                </ul>
              ) : null}
            </H2>
            {part.skills.length > 0 ? (
              <ul className="flex flex-wrap gap-2 overflow-hidden after:grow-100 lg:flex-nowrap lg:mask-[linear-gradient(90deg,#000_75%,transparent)]">
                {part.skills.map((skill, i) => (
                  <li key={skill.id}>
                    <a
                      title={skill.name}
                      href={`/skills/${skill.id}`}
                      className="flex flex-1 items-center justify-center gap-1 rounded-full bg-neutral-900/10 px-3 whitespace-nowrap duration-200 hover:bg-neutral-900/20 dark:bg-neutral-100/10 hover:dark:bg-neutral-100/20"
                    >
                      <SkillIcon skill={skill} className="my-1 h-[1em]" decoration={i < 3} />
                      {i < 3 && <span>{skill.name}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </article>
    </>
  )
}

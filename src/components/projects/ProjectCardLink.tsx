import {
  IconBrandGithub,
  IconDownload,
  IconExternalLink,
  IconFileTypePdf,
  IconMessageStar,
  IconNotebook,
} from '@tabler/icons-react'
import clsx from 'clsx'

import type { ProjectLink } from '~/content'

import LinkButton from '../common/LinkButton'

interface ProjectCardLinkProps {
  link: ProjectLink
  isActive: boolean
}

export default function ProjectCardLink({
  link: { type, href, part },
  isActive,
}: ProjectCardLinkProps) {
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

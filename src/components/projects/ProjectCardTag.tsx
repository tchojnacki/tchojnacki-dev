import clsx from 'clsx'

import type { ProjectTag } from '~/content'

interface ProjectCardTagProps {
  tag: ProjectTag
  small?: boolean
}

export default function ProjectCardTag({ tag, small }: ProjectCardTagProps) {
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

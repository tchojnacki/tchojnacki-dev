import { Project, Technology } from '~/data'

import { ProjectCard } from './ProjectCard'

interface ProjectListProps {
  length?: number
  filter?: Technology | null
}

export function ProjectList({ filter = null, length = Infinity }: ProjectListProps) {
  return (
    <ul className="flex animate-enteronload flex-col items-center gap-16 px-4 py-16 motion-reduce:animate-none lg:px-16">
      {Project.IMPORTANCE_ORDER.filter(p => filter === null || p.usesTechnology(filter))
        .slice(0, length)
        .map((p, i) => (
          <ProjectCard key={`${filter?.name}-${p.name}`} project={p} flipped={i % 2 === 1} />
        ))}
    </ul>
  )
}

import { Project, Technology } from 'data'

import { ProjectCard } from './ProjectCard'

interface ProjectListProps {
  length?: number
  filter?: Technology | null
}

export function ProjectList({ filter = null, length = Infinity }: ProjectListProps) {
  return (
    <ul className="flex flex-col items-center gap-16 px-4 lg:px-16 py-16 animate-enteronload motion-reduce:animate-none">
      {Project.IMPORTANCE_ORDER.filter(p => filter === null || p.usesTechnology(filter))
        .slice(0, length)
        .map((p, i) => (
          <ProjectCard key={`${filter?.name}-${p.name}`} project={p} flipped={i % 2 === 1} />
        ))}
    </ul>
  )
}

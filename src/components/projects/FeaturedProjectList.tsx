import { Project } from 'data'

import { FeaturedProject } from './FeaturedProject'

interface FeaturedProjectListProps {
  length?: number
}

export function FeaturedProjectList({ length = 3 }: FeaturedProjectListProps) {
  return (
    <ul className="flex flex-col items-center gap-16 px-8 py-16">
      {Project.FEATURED.slice(0, length).map((p, i) => (
        <FeaturedProject key={i} project={p} flipped={i % 2 === 1} />
      ))}
    </ul>
  )
}

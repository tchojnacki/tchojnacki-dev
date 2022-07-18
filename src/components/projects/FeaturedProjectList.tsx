import { FEATURED_PROJECTS, PROJECTS as P } from 'data'

import { FeaturedProject } from './FeaturedProject'

export function FeaturedProjectList() {
  return (
    <ul className="flex flex-col items-center gap-16 py-16">
      {FEATURED_PROJECTS.map((p, i) => (
        <FeaturedProject key={i} project={p} />
      ))}
    </ul>
  )
}

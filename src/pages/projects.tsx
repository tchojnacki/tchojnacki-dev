import { useState } from 'react'

import { ProjectFilters, ProjectList, Title } from 'components'
import { Technology } from 'data'

export default function Projects() {
  const [filter, setFilter] = useState<Technology | null>(null)

  return (
    <>
      <Title>Projects</Title>
      <ProjectFilters {...{ filter, setFilter }} />
      <ProjectList filter={filter} />
    </>
  )
}

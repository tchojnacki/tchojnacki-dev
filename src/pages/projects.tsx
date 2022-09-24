import { ProjectFilters, ProjectList, Title } from 'components'
import { useTechnologyFilter } from 'hooks'

export default function Projects() {
  const { filter, toggleFilter } = useTechnologyFilter()

  return (
    <>
      <Title>Projects</Title>
      <ProjectFilters {...{ filter, toggleFilter }} />
      <ProjectList {...{ filter }} />
    </>
  )
}

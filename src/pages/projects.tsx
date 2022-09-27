import { ProjectFilters, ProjectList, SEO } from 'components'
import { useTechnologyFilter } from 'hooks'

export default function Projects() {
  const { filter, toggleFilter } = useTechnologyFilter()

  return (
    <>
      <SEO name="Projects" desc="List of Tomasz Chojnacki's software projects." path="/projects" />
      <ProjectFilters {...{ filter, toggleFilter }} />
      <ProjectList {...{ filter }} />
    </>
  )
}

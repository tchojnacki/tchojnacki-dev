import { LinkButton, ProjectList } from 'components'

import { SectionHeader } from '../common'

export function ProjectsSection() {
  return (
    <section className="py-16">
      <SectionHeader>Featured projects</SectionHeader>
      <ProjectList length={3} />
      <div className="flex justify-center">
        <LinkButton href="/projects">View Other Projects</LinkButton>
      </div>
    </section>
  )
}

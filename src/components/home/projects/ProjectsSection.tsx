import { FeaturedProjectList } from 'components'

import { LinkButton, SectionHeader, Wave } from '../common'

export function ProjectsSection() {
  return (
    <section className="py-16">
      <SectionHeader>Featured projects</SectionHeader>
      <FeaturedProjectList />
      <div className="flex justify-center">
        <LinkButton href="/projects">View Other Projects</LinkButton>
      </div>
    </section>
  )
}

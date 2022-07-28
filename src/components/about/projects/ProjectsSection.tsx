import { FeaturedProjectList } from 'components'

import { LinkButton, SectionHeader, Wave } from '../common'

export function ProjectsSection() {
  return (
    <>
      <Wave svg="bg-indigo-11 dark:bg-indigo-4" path="fill-slate-12 dark:fill-indigo-2" />
      <section>
        <SectionHeader>Featured projects</SectionHeader>
        <FeaturedProjectList />
        <div className="flex justify-center pb-16">
          <LinkButton href="/projects">View Other Projects</LinkButton>
        </div>
      </section>
    </>
  )
}

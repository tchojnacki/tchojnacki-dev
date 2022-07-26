import { FeaturedProjectList } from 'components'

import { LinkButton, Wave } from '../common'

export function ProjectsSection() {
  return (
    <>
      <Wave svg="bg-indigo-11 dark:bg-indigo-4" path="fill-slate-12 dark:fill-indigo-2" />
      <section>
        <h3 className="text-center text-4xl font-bold">Featured Projects</h3>
        <FeaturedProjectList />
        <div className="flex justify-center pb-16">
          <LinkButton href="/projects">View Other Projects</LinkButton>
        </div>
      </section>
    </>
  )
}

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { ProjectFilters, ProjectList, SEO } from 'components'
import { useTechnologyFilter } from 'hooks'

export const getServerSideProps: GetServerSideProps<{ query: string | null }> = async context => {
  const { filter } = context.query
  let query = null

  if (typeof filter === 'string') {
    query = filter
  } else if (Array.isArray(filter)) {
    query = filter[0]
  }

  return {
    props: { query },
  }
}

export default function Projects({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { filter, toggleFilter } = useTechnologyFilter(query)

  return (
    <>
      <SEO name="Projects" desc="List of Tomasz Chojnacki's software projects." path="/projects" />
      <ProjectFilters {...{ filter, toggleFilter }} />
      <ProjectList {...{ filter }} />
    </>
  )
}

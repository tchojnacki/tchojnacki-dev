import { FeaturedProjectList, Title } from 'components'

export default function Projects() {
  return (
    <>
      <Title>Projects</Title>
      <FeaturedProjectList length={Infinity} />
    </>
  )
}

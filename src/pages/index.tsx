import { AboutSection, Landing, ProjectsSection, SEO, SkillsSection } from 'components'

export default function Home() {
  return (
    <>
      <SEO name="About" path="" />
      <Landing />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
    </>
  )
}

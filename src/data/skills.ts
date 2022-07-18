import { TECHNOLOGIES as T, TechnologyDefinition } from './technologies'

type SectionItems = [TechnologyDefinition, number][]

export const SPHERE_SKILL_ARRAY = [
  T.TYPESCRIPT,
  T.JAVASCRIPT,
  T.REACT,
  T.NODE,
  T.NEXT,
  T.NEST,
  T.CSS,
  T.HTML,
  T.JAVA,
  T.PYTHON,
  T.RUST,
  T.SASS,
] as const

export const SECTION_SKILLS = [
  {
    label: 'Frameworks & libraries',
    width: 6,
    height: 5,
    largest: 3,
    items: [
      [T.REACT, 3],
      [T.NODE, 3],
      [T.NEXT, 2],
      [T.NEST, 2],
      [T.JEST, 2],
    ] as SectionItems,
  },
  {
    label: 'Languages',
    width: 7,
    height: 6,
    largest: 3,
    items: [
      [T.HTML, 2],
      [T.TYPESCRIPT, 3],
      [T.PYTHON, 2],
      [T.CSS, 2],
      [T.JAVASCRIPT, 3],
      [T.RUST, 2],
      [T.JAVA, 2],
      [T.SASS, 2],
    ] as SectionItems,
  },
  {
    label: 'Tools & devops',
    width: 4,
    height: 2,
    largest: 1.33,
    items: [T.GIT, T.GITHUB, T.MONGO, T.NPM, T.YARN, T.DOCKER, T.HEROKU, T.FIGMA].map(i => [
      i,
      1,
    ]) as SectionItems,
  },
] as const

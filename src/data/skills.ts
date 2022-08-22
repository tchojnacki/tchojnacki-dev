import { Technology } from './technologies'

const T = Technology.LIST

type SectionItems = [Technology, number][]

export const TECH_SPHERE_SKILL_NAMES: readonly string[] = [
  T.REACT,
  T.NEXT,
  T.NEST,
  T.TYPESCRIPT,
  T.JAVASCRIPT,
  T.EXPRESS,
  T.NODE,
  T.JAVA,
  T.PYTHON,
  T.MONGO,
  T.CSS,
  T.HTML,
].map(t => t.name)

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

import { Technology } from './technologies'

const T = Technology.LIST

type SectionItems = [Technology, number][]

export const TECH_SPHERE_SKILL_NAMES: readonly string[] = [
  T.REACT,
  T.DOTNET,
  T.NESTJS,
  T.NEXTJS,
  T.TYPESCRIPT,
  T.CSHARP,
  T.JAVASCRIPT,
  T.NODEJS,
  T.JAVA,
  T.PYTHON,
  T.MONGODB,
  T.CSS,
  T.HTML,
].map(t => t.name)

export const SECTION_SKILLS = [
  {
    label: 'Frameworks & Libraries',
    width: 6,
    height: 5,
    largest: 3,
    items: [
      [T.REACT, 3],
      [T.ASPNET, 3],
      [T.NODEJS, 2],
      [T.NESTJS, 2],
      [T.NEXTJS, 2],
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
      [T.JAVA, 2],
      [T.CSS, 2],
      [T.CSHARP, 3],
      [T.PYTHON, 2],
      [T.JAVASCRIPT, 2],
      [T.RUST, 2],
    ] as SectionItems,
  },
  {
    label: 'Tools & Devops',
    width: 3,
    height: 3,
    largest: 1.37,
    items: [
      T.GIT,
      T.POSTGRESQL,
      T.MONGODB,
      T.DOCKER,
      T.SWAGGER,
      T.VITE,
      T.NPM,
      T.YARN,
      T.FIGMA,
    ].map(i => [i, 1]) as SectionItems,
  },
] as const

import { TechnologyDefinition, TECHNOLOGIES as T, TechnologyType } from './technologies'

export type SkillDefinition = TechnologyDefinition & {
  minor?: boolean
}

export const SKILL_TYPE_NAMES: Record<TechnologyType, string> = {
  language: 'Languages',
  library: 'Frameworks, libraries & runtimes',
  tool: 'Tools & devops',
}

export const SKILL_ARRAY: SkillDefinition[] = [
  T.TYPESCRIPT,
  T.JAVASCRIPT,
  T.REACT,
  T.NODE,
  { ...T.NEXT, minor: true },
  { ...T.NEST, minor: true },
  { ...T.CSS, minor: true },
  { ...T.HTML, minor: true },
  { ...T.JAVA, minor: true },
  { ...T.PYTHON, minor: true },
  { ...T.RUST, minor: true },
  { ...T.SASS, minor: true },
  { ...T.JEST, minor: true },
  { ...T.GIT, minor: true },
  { ...T.GITHUB, minor: true },
  { ...T.MONGO, minor: true },
  { ...T.DOCKER, minor: true },
  { ...T.NPM, minor: true },
  { ...T.YARN, minor: true },
  { ...T.HEROKU, minor: true },
  { ...T.VSCODE, minor: true },
  { ...T.FIGMA, minor: true },
]

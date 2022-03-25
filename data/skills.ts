import { TechnologyDefinition, TECHNOLOGIES as T, TechnologyType } from './technologies'

export type SkillDefinition = TechnologyDefinition & {
  minor?: boolean
}

export const SKILL_TYPE_NAMES: Record<TechnologyType, string> = {
  language: 'Languages',
  library: 'Frameworks, libraries & runtimes',
  tool: 'Tools',
}

/**
 * Ordered from highest importance to lowest.
 */
export const SKILL_ARRAY: SkillDefinition[] = [
  T.TYPESCRIPT,
  T.JAVASCRIPT,
  T.JAVA,
  T.REACT,
  T.NEXT,
  T.NODEJS,
  T.FLUTTER,
  T.CSS,
  T.HTML,
  { ...T.KOTLIN, minor: true },
  { ...T.PYTHON, minor: true },
  { ...T.DART, minor: true },
  { ...T.SASS, minor: true },
  { ...T.GIT, minor: true },
  { ...T.GITHUB, minor: true },
  { ...T.NPM, minor: true },
  { ...T.MONGODB, minor: true },
  { ...T.HEROKU, minor: true },
  { ...T.FIGMA, minor: true },
]

import { TechnologyDefinition, TECHNOLOGIES as T, TechnologyType } from './technologies'

export type SkillDefinition = TechnologyDefinition & {
  subskills?: Omit<TechnologyDefinition, 'type'>[]
}

export const SKILL_TYPE_NAMES: Record<TechnologyType, string> = {
  language: 'Languages',
  library: 'Frameworks, libraries & runtimes',
  tool: 'Tools',
}

/**
 * Ordered from biggest importance to lowest.
 */
export const SKILL_ARRAY: SkillDefinition[] = [
  T.REACT,
  T.NEXT,
  T.TYPESCRIPT,
  { ...T.NODEJS, subskills: [{ ...T.NPM, name: 'npm & yarn' }, T.EXPRESS] },
  T.JAVASCRIPT,
  { ...T.JAVA, subskills: [T.KOTLIN] },
  T.FLUTTER,
  T.DART,
  { ...T.CSS, subskills: [T.SASS] },
  T.HTML,
  { ...T.GIT, subskills: [T.GITHUB] },
  T.MONGODB,
  T.HEROKU,
  T.FIGMA,
  T.VSCODE,
  T.INTELLIJ,
]

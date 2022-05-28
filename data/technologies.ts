import { SimpleIcon } from 'simple-icons'
import * as si from 'simple-icons/icons'

export type TechnologyType = 'language' | 'library' | 'tool'

export interface TechnologyDefinition {
  name: string
  type: TechnologyType
  icon: SimpleIcon
}

export const TECHNOLOGIES: Record<string, TechnologyDefinition> = {
  REACT: {
    name: 'React',
    type: 'library',
    icon: si.siReact,
  },
  NEXT: {
    name: 'Next.js',
    type: 'library',
    icon: si.siNextdotjs,
  },
  NEST: {
    name: 'NestJS',
    type: 'library',
    icon: si.siNestjs,
  },
  TYPESCRIPT: {
    name: 'TypeScript',
    type: 'language',
    icon: si.siTypescript,
  },
  NODE: {
    name: 'Node.js',
    type: 'library',
    icon: si.siNodedotjs,
  },
  JEST: {
    name: 'Jest',
    type: 'library',
    icon: si.siJest,
  },
  NPM: {
    name: 'npm',
    type: 'tool',
    icon: si.siNpm,
  },
  YARN: {
    name: 'Yarn',
    type: 'tool',
    icon: si.siYarn,
  },
  JAVASCRIPT: {
    name: 'JavaScript',
    type: 'language',
    icon: si.siJavascript,
  },
  JAVA: {
    name: 'Java',
    type: 'language',
    icon: si.siJava,
  },
  KOTLIN: {
    name: 'Kotlin',
    type: 'language',
    icon: si.siKotlin,
  },
  PYTHON: {
    name: 'Python',
    type: 'language',
    icon: si.siPython,
  },
  FLUTTER: {
    name: 'Flutter',
    type: 'library',
    icon: si.siFlutter,
  },
  DART: {
    name: 'Dart',
    type: 'language',
    icon: si.siDart,
  },
  CSS: {
    name: 'CSS',
    type: 'language',
    icon: si.siCss3,
  },
  SASS: {
    name: 'Sass',
    type: 'language',
    icon: si.siSass,
  },
  HTML: {
    name: 'HTML',
    type: 'language',
    icon: si.siHtml5,
  },
  RUST: {
    name: 'Rust',
    type: 'language',
    icon: si.siRust,
  },
  GIT: {
    name: 'Git',
    type: 'tool',
    icon: si.siGit,
  },
  GITHUB: {
    name: 'GitHub',
    type: 'tool',
    icon: si.siGithub,
  },
  MONGO: {
    name: 'MongoDB',
    type: 'tool',
    icon: si.siMongodb,
  },
  HEROKU: {
    name: 'Heroku',
    type: 'tool',
    icon: si.siHeroku,
  },
  DOCKER: {
    name: 'Docker',
    type: 'tool',
    icon: si.siDocker,
  },
  VSCODE: {
    name: 'VS Code',
    type: 'tool',
    icon: si.siVisualstudiocode,
  },
  FIGMA: {
    name: 'Figma',
    type: 'tool',
    icon: si.siFigma,
  },
}

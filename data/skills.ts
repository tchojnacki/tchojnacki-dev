import { SimpleIcon } from 'simple-icons'
import * as si from 'simple-icons/icons'

interface SkillDefinition {
  name: string
  type: 'language' | 'framework' | 'tool'
  icon: SimpleIcon
}

export const SKILL_TYPE_NAMES = {
  language: 'Languages',
  framework: 'Frameworks, libraries & runtimes',
  tool: 'Tools',
}

export const SKILL_ARRAY: SkillDefinition[] = [
  {
    name: 'React',
    type: 'framework',
    icon: si.siReact,
  },
  {
    name: 'Next.js',
    type: 'framework',
    icon: si.siNextdotjs,
  },
  {
    name: 'TypeScript',
    type: 'language',
    icon: si.siTypescript,
  },
  {
    name: 'Node.js',
    type: 'framework',
    icon: si.siNodedotjs,
  },
  {
    name: 'JavaScript',
    type: 'language',
    icon: si.siJavascript,
  },
  {
    name: 'Java',
    type: 'language',
    icon: si.siJava,
  },
  {
    name: 'Flutter',
    type: 'framework',
    icon: si.siFlutter,
  },
  {
    name: 'Dart',
    type: 'language',
    icon: si.siDart,
  },
  {
    name: 'CSS',
    type: 'language',
    icon: si.siCss3,
  },
  {
    name: 'HTML',
    type: 'language',
    icon: si.siHtml5,
  },
  {
    name: 'Git',
    type: 'tool',
    icon: si.siGit,
  },
  {
    name: 'GitHub',
    type: 'tool',
    icon: si.siGithub,
  },
  {
    name: 'MongoDB',
    type: 'tool',
    icon: si.siMongodb,
  },
  {
    name: 'Heroku',
    type: 'tool',
    icon: si.siHeroku,
  },
  {
    name: 'Figma',
    type: 'tool',
    icon: si.siFigma,
  },
  {
    name: 'VS Code',
    type: 'tool',
    icon: si.siVisualstudiocode,
  },
  {
    name: 'IntelliJ IDEA',
    type: 'tool',
    icon: si.siIntellijidea,
  },
]

/*
TODO: subskills

Java: Kotlin
CSS: Sass
Node.js: npm & yarn, Express
MongoDB: mongoose
*/

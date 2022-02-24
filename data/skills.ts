import { SimpleIcon } from 'simple-icons'
import {
  siCss3,
  siDart,
  siFigma,
  siFlutter,
  siGit,
  siGithub,
  siHtml5,
  siIntellijidea,
  siJava,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siTypescript,
  siVisualstudiocode,
} from 'simple-icons/icons'

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
    icon: siReact,
  },
  {
    name: 'Next.js',
    type: 'framework',
    icon: siNextdotjs,
  },
  {
    name: 'TypeScript',
    type: 'language',
    icon: siTypescript,
  },
  {
    name: 'Node.js',
    type: 'framework',
    icon: siNodedotjs,
  },
  {
    name: 'JavaScript',
    type: 'language',
    icon: siJavascript,
  },
  {
    name: 'Java',
    type: 'language',
    icon: siJava,
  },
  {
    name: 'Flutter',
    type: 'framework',
    icon: siFlutter,
  },
  {
    name: 'Dart',
    type: 'language',
    icon: siDart,
  },
  {
    name: 'CSS',
    type: 'language',
    icon: siCss3,
  },
  {
    name: 'HTML',
    type: 'language',
    icon: siHtml5,
  },
  {
    name: 'Git',
    type: 'tool',
    icon: siGit,
  },
  {
    name: 'GitHub',
    type: 'tool',
    icon: siGithub,
  },
  {
    name: 'Figma',
    type: 'tool',
    icon: siFigma,
  },
  {
    name: 'VS Code',
    type: 'tool',
    icon: siVisualstudiocode,
  },
  {
    name: 'IntelliJ IDEA',
    type: 'tool',
    icon: siIntellijidea,
  },
]

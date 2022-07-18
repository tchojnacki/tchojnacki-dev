import { SimpleIcon } from 'simple-icons'
import * as si from 'simple-icons/icons'

type TechnologyType = 'language' | 'library' | 'tool'

export interface TechnologyDefinition {
  name: string
  type: TechnologyType
  icon: SimpleIcon
}

export const TECHNOLOGIES = {
  CSS: {
    name: 'CSS',
    type: 'language',
    icon: si.siCss3,
  },
  DART: {
    name: 'Dart',
    type: 'language',
    icon: si.siDart,
  },
  DOCKER: {
    name: 'Docker',
    type: 'tool',
    icon: si.siDocker,
  },
  ESLINT: {
    name: 'ESLint',
    type: 'tool',
    icon: si.siEslint,
  },
  EXPRESS: {
    name: 'Express',
    type: 'library',
    icon: si.siExpress,
  },
  FASTAPI: {
    name: 'FastAPI',
    type: 'library',
    icon: si.siFastapi,
  },
  FLUTTER: {
    name: 'Flutter',
    type: 'library',
    icon: si.siFlutter,
  },
  FIGMA: {
    name: 'Figma',
    type: 'tool',
    icon: si.siFigma,
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
  HEROKU: {
    name: 'Heroku',
    type: 'tool',
    icon: si.siHeroku,
  },
  HTML: {
    name: 'HTML',
    type: 'language',
    icon: si.siHtml5,
  },
  IMMER: {
    name: 'Immer',
    type: 'library',
    icon: si.siImmer,
  },
  JAVA: {
    name: 'Java',
    type: 'language',
    icon: si.siOpenjdk,
  },
  JAVASCRIPT: {
    name: 'JavaScript',
    type: 'language',
    icon: si.siJavascript,
  },
  JEST: {
    name: 'Jest',
    type: 'library',
    icon: si.siJest,
  },
  KOTLIN: {
    name: 'Kotlin',
    type: 'language',
    icon: si.siKotlin,
  },
  LODASH: {
    name: 'Lodash',
    type: 'library',
    icon: si.siLodash,
  },
  MONGO: {
    name: 'MongoDB',
    type: 'tool',
    icon: si.siMongodb,
  },
  MUI: {
    name: 'MUI',
    type: 'library',
    icon: si.siMui,
  },
  NEST: {
    name: 'NestJS',
    type: 'library',
    icon: si.siNestjs,
  },
  NEXT: {
    name: 'Next.js',
    type: 'library',
    icon: si.siNextdotjs,
  },
  NODE: {
    name: 'Node.js',
    type: 'library',
    icon: si.siNodedotjs,
  },
  NPM: {
    name: 'npm',
    type: 'tool',
    icon: si.siNpm,
  },
  PASSPORT: {
    name: 'Passport',
    type: 'library',
    icon: si.siPassport,
  },
  PRETTIER: {
    name: 'Prettier',
    type: 'tool',
    icon: si.siPrettier,
  },
  PYTHON: {
    name: 'Python',
    type: 'language',
    icon: si.siPython,
  },
  REACT: {
    name: 'React',
    type: 'library',
    icon: si.siReact,
  },
  RUST: {
    name: 'Rust',
    type: 'language',
    icon: si.siRust,
  },
  SASS: {
    name: 'Sass',
    type: 'language',
    icon: si.siSass,
  },
  SWAGGER: {
    name: 'Swagger',
    type: 'tool',
    icon: si.siSwagger,
  },
  TAILWIND: {
    name: 'Tailwind CSS',
    type: 'library',
    icon: si.siTailwindcss,
  },
  THREEJS: {
    name: 'Three.js',
    type: 'library',
    icon: si.siThreedotjs,
  },
  TYPESCRIPT: {
    name: 'TypeScript',
    type: 'language',
    icon: si.siTypescript,
  },
  UVICORN: {
    name: 'Uvicorn',
    type: 'tool',
    icon: si.siGunicorn,
  },
  VERCEL: {
    name: 'Vercel',
    type: 'tool',
    icon: si.siVercel,
  },
  VITE: {
    name: 'Vite',
    type: 'tool',
    icon: si.siVite,
  },
  VSCODE: {
    name: 'VS Code',
    type: 'tool',
    icon: si.siVisualstudiocode,
  },
  YARN: {
    name: 'Yarn',
    type: 'tool',
    icon: si.siYarn,
  },
} as const

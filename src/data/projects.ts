import { TECHNOLOGIES as T, TechnologyDefinition } from './technologies'

interface ProjectTag {
  displayName: string
  backgroundColor: string
}

interface ProjectPart {
  name: string
  technologies: readonly TechnologyDefinition[]
}

export interface ProjectDefinition {
  name: string
  tags: readonly ProjectTag[]
  description: string
  parts: readonly ProjectPart[]
}

const TAGS = {
  SOLO: {
    displayName: 'Solo Project',
    backgroundColor: '#067a6e',
  },
  TEAM: {
    displayName: 'Team Project',
    backgroundColor: '#9c2bac',
  },
  DEPRECATED: {
    displayName: 'Deprecated',
    backgroundColor: '#ca3214',
  },
} as const

export const PROJECTS = {
  CODERSCAMPFULLSTACK: {
    name: 'JeszCoChcesz',
    tags: [TAGS.TEAM],
    description:
      'Full-stack web application, online food delivery system connecting restaurants with health-conscious users.',
    parts: [
      {
        name: 'Front-end',
        technologies: [T.REACT, T.TYPESCRIPT, T.MUI, T.IMMER, T.LODASH, T.HTML],
      },
      {
        name: 'Back-end',
        technologies: [T.NEST, T.TYPESCRIPT, T.MONGO, T.EXPRESS, T.PASSPORT, T.NODE],
      },
      {
        name: 'Tools',
        technologies: [
          T.JEST,
          T.SWAGGER,
          T.DOCKER,
          T.VITE,
          T.YARN,
          T.GIT,
          T.HEROKU,
          T.ESLINT,
          T.FIGMA,
          T.PRETTIER,
          T.GITHUB,
        ],
      },
    ],
  },
  FANDOMMONACO: {
    name: 'FANDOM-Monaco',
    tags: [TAGS.SOLO, TAGS.DEPRECATED],
    description: 'Browser extension that integrates Monaco Editor with Fandom.',
    parts: [{ name: 'Extension', technologies: [] }],
  },
  SCRIPTINGTANKS: {
    name: 'Tanks',
    tags: [TAGS.SOLO],
    description:
      'Online real-time multiplayer game. Final project for the Script Languages university course.',
    parts: [
      {
        name: 'Front-end',
        technologies: [T.THREEJS, T.REACT, T.IMMER, T.TYPESCRIPT, T.LODASH, T.HTML],
      },
      { name: 'Back-end', technologies: [T.PYTHON, T.FASTAPI, T.UVICORN] },
      {
        name: 'Tools',
        technologies: [T.DOCKER, T.VITE, T.HEROKU, T.NPM, T.GIT, T.PRETTIER, T.GITHUB],
      },
    ],
  },
  SPOTIFYMOSAIC: {
    name: 'Mosaics for Spotify',
    tags: [TAGS.SOLO],
    description: 'A CLI tool for generating Spotify playlist covers using album artworks.',
    parts: [{ name: 'CLI', technologies: [T.RUST] }],
  },
  TCHOJNACKIDEV: {
    name: 'tchojnacki.dev',
    tags: [TAGS.SOLO],
    description: 'Website acting as my personal portfolio and blog.',
    parts: [
      {
        name: 'Website',
        technologies: [T.NEXT, T.REACT, T.TAILWIND, T.TYPESCRIPT, T.LODASH, T.HTML],
      },
      {
        name: 'Tools',
        technologies: [T.JEST, T.GIT, T.VERCEL, T.ESLINT, T.PRETTIER, T.FIGMA, T.NPM, T.GITHUB],
      },
    ],
  },
} as const

export const FEATURED_PROJECTS = [
  PROJECTS.CODERSCAMPFULLSTACK,
  PROJECTS.SCRIPTINGTANKS,
  PROJECTS.TCHOJNACKIDEV,
] as const

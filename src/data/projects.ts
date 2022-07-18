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
  SPOTIFYMOSAIC: {
    name: 'Mosaics for Spotify',
    tags: [TAGS.SOLO],
    description: 'A CLI tool for generating Spotify playlist covers using album artworks.',
    parts: [{ name: 'CLI', technologies: [T.RUST] }],
  },
  FANDOMMONACO: {
    name: 'FANDOM-Monaco',
    tags: [TAGS.SOLO, TAGS.DEPRECATED],
    description: 'Browser extension that integrates Monaco Editor with Fandom.',
    parts: [{ name: 'Extension', technologies: [] }],
  },
  CODERSCAMPFULLSTACK: {
    name: 'JeszCoChcesz',
    tags: [TAGS.TEAM],
    description:
      'Full-stack web application, online food delivery system connecting restaurants with health-conscious users.',
    parts: [
      { name: 'Front-end', technologies: [T.REACT, T.TYPESCRIPT, T.MUI, T.IMMER, T.LODASH] },
      { name: 'Back-end', technologies: [T.NEST, T.TYPESCRIPT, T.MONGO, T.EXPRESS, T.PASSPORT] },
      {
        name: 'Tools',
        technologies: [T.DOCKER, T.JEST, T.SWAGGER, T.VITE, T.YARN, T.GIT, T.HEROKU, T.FIGMA],
      },
    ],
  },
} as const

export const FEATURED_PROJECTS = [
  PROJECTS.SPOTIFYMOSAIC,
  PROJECTS.FANDOMMONACO,
  PROJECTS.CODERSCAMPFULLSTACK,
] as const

import { Technology } from './technologies'

const T = Technology.LIST

class ProjectTag {
  private constructor(
    public readonly displayName: string,
    public readonly backgroundColor: string
  ) {}

  public static readonly SOLO = new ProjectTag('Solo Project', '#067a6e')
  public static readonly TEAM = new ProjectTag('Team Project', '#9c2bac')
  public static readonly DEPRECATED = new ProjectTag('DEPRECATED', '#ca3214')
}

class ProjectPart {
  public constructor(public readonly name: string, public readonly technologies: Technology[]) {}
}

export class Project {
  public constructor(
    public readonly name: string,
    public readonly image: string | null,
    public readonly tags: readonly ProjectTag[],
    public readonly description: string,
    public readonly parts: readonly ProjectPart[]
  ) {}

  public static readonly LIST = {
    CODERSCAMPFULLSTACK: new Project(
      'JeszCoChcesz',
      'coderscampfullstack',
      [ProjectTag.TEAM],
      'Full-stack web application, online food delivery system connecting restaurants with health-conscious users.',
      [
        new ProjectPart('Front End', [T.REACT, T.TYPESCRIPT, T.MUI, T.IMMER, T.LODASH, T.HTML]),
        new ProjectPart('Back End', [T.NEST, T.TYPESCRIPT, T.MONGO, T.EXPRESS, T.PASSPORT, T.NODE]),
        new ProjectPart('Tools', [
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
        ]),
      ]
    ),
    FANDOMMONACO: new Project(
      'FANDOM-Monaco',
      null,
      [ProjectTag.SOLO, ProjectTag.DEPRECATED],
      'Browser extension that integrates Monaco Editor with Fandom.',
      [new ProjectPart('Extension', [T.JAVASCRIPT, T.CSS, T.HTML])]
    ),
    SCRIPTINGTANKS: new Project(
      'Tanks',
      'scriptingtanks',
      [ProjectTag.SOLO],
      'Online real-time multiplayer game. Final project for the Script Languages university course.',
      [
        new ProjectPart('Front End', [T.THREE, T.REACT, T.IMMER, T.TYPESCRIPT, T.LODASH, T.HTML]),
        new ProjectPart('Back End', [T.PYTHON, T.FASTAPI, T.GUNICORN]),
        new ProjectPart('Tools', [T.DOCKER, T.VITE, T.HEROKU, T.NPM, T.GIT, T.PRETTIER, T.GITHUB]),
      ]
    ),
    SPOTIFYMOSAIC: new Project(
      'Mosaics for Spotify',
      null,
      [ProjectTag.SOLO],
      'A CLI tool for generating Spotify playlist covers using album artworks.',
      [new ProjectPart('CLI', [T.RUST])]
    ),
    TCHOJNACKIDEV: new Project(
      'tchojnacki.dev',
      'tchojnackidev',
      [ProjectTag.SOLO],
      'Website acting as my personal portfolio and blog.',
      [
        new ProjectPart('Website', [T.NEXT, T.REACT, T.TAILWIND, T.TYPESCRIPT, T.LODASH, T.HTML]),
        new ProjectPart('Tools', [
          T.JEST,
          T.GIT,
          T.VERCEL,
          T.ESLINT,
          T.PRETTIER,
          T.FIGMA,
          T.NPM,
          T.GITHUB,
        ]),
      ]
    ),
  } as const

  public static readonly FEATURED = [
    Project.LIST.CODERSCAMPFULLSTACK,
    Project.LIST.SCRIPTINGTANKS,
    Project.LIST.TCHOJNACKIDEV,
    Project.LIST.SPOTIFYMOSAIC,
    Project.LIST.FANDOMMONACO,
  ] as const
}

import { StaticImageData } from 'next/image'
import { Api, BrandGithub, Download, ExternalLink, Icon } from 'tabler-icons-react'

import coderscampfullstackImg from '../media/projects/coderscampfullstack.png'
import placeholderImg from '../media/projects/placeholder.png'
import scriptingtanksImg from '../media/projects/scriptingtanks.png'
import tchojnackidevImg from '../media/projects/tchojnackidev.png'
import { Technology } from './technologies'

const T = Technology.LIST

class ProjectTag {
  private constructor(
    public readonly displayName: string,
    public readonly backgroundColor: string,
    public readonly link?: string
  ) {}

  public static readonly Solo = new ProjectTag('Solo Project', '#067a6e')

  public static readonly Group = (project: string) =>
    new ProjectTag('Group Project', '#9c2bac', `https://github.com/${project}/graphs/contributors`)

  public static readonly Deprecated = new ProjectTag('DEPRECATED', '#ca3214')
}

class ProjectPart {
  public constructor(public readonly name: string, public readonly technologies: Technology[]) {}
}

class ProjectLink {
  private constructor(
    public readonly link: string,
    public readonly displayName: string,
    public readonly IconComponent: Icon
  ) {}

  public static readonly GitHub = (projectName: string, owner: string = 'tchojnacki') =>
    new ProjectLink(`https://github.com/${owner}/${projectName}`, 'Source', BrandGithub)

  public static readonly Deploy = (link: string) => new ProjectLink(link, 'Visit', ExternalLink)

  public static readonly Download = (link: string) => new ProjectLink(link, 'Download', Download)

  public static readonly Swagger = (link: string) => new ProjectLink(link, 'Swagger', Api)
}

export class Project {
  public constructor(
    public readonly name: string,
    public readonly image: StaticImageData,
    public readonly tags: readonly ProjectTag[],
    public readonly links: readonly ProjectLink[],
    public readonly description: string,
    public readonly parts: readonly ProjectPart[]
  ) {}

  public static readonly LIST = {
    CODERSCAMPFULLSTACK: new Project(
      'JeszCoChcesz',
      coderscampfullstackImg,
      [ProjectTag.Group('CodersCamp2021-HK/CodersCamp2021.Project.Fullstack')],
      [
        ProjectLink.Deploy('https://coderscamp2021-hk-fullstack.herokuapp.com'),
        ProjectLink.Swagger('https://coderscamp2021-hk-fullstack.herokuapp.com/api'),
        ProjectLink.GitHub('CodersCamp2021.Project.Fullstack', 'CodersCamp2021-HK'),
      ],
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
      placeholderImg,
      [ProjectTag.Solo, ProjectTag.Deprecated],
      [
        ProjectLink.Download('https://github.com/tchojnacki/FANDOM-Monaco/releases/latest'),
        ProjectLink.GitHub('FANDOM-Monaco'),
      ],
      'Browser extension that integrates Monaco Editor with Fandom.',
      [new ProjectPart('Extension', [T.JAVASCRIPT, T.CSS, T.HTML])]
    ),
    SCRIPTINGTANKS: new Project(
      'Tanks',
      scriptingtanksImg,
      [ProjectTag.Solo],
      [
        ProjectLink.Deploy('https://scripting-tanks.herokuapp.com'),
        ProjectLink.GitHub('scripting-tanks'),
      ],
      'Online real-time multiplayer game. Final project for the Script Languages university course.',
      [
        new ProjectPart('Front End', [T.THREE, T.REACT, T.IMMER, T.TYPESCRIPT, T.LODASH, T.HTML]),
        new ProjectPart('Back End', [T.PYTHON, T.FASTAPI, T.GUNICORN]),
        new ProjectPart('Tools', [T.DOCKER, T.VITE, T.HEROKU, T.NPM, T.GIT, T.PRETTIER, T.GITHUB]),
      ]
    ),
    SPOTIFYMOSAIC: new Project(
      'Mosaics for Spotify',
      placeholderImg,
      [ProjectTag.Solo],
      [
        ProjectLink.Download('https://crates.io/crates/spotifymosaic'),
        ProjectLink.GitHub('spotifymosaic'),
      ],
      'A CLI tool for generating Spotify playlist covers using album artworks.',
      [new ProjectPart('CLI', [T.RUST])]
    ),
    TCHOJNACKIDEV: new Project(
      'tchojnacki.dev',
      tchojnackidevImg,
      [ProjectTag.Solo],
      [ProjectLink.Deploy('https://tchojnacki.dev/'), ProjectLink.GitHub('tchojnacki-dev')],
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

import { StaticImageData } from 'next/image'
import {
  Api,
  BrandGithub,
  Download,
  ExternalLink,
  Icon,
  InfoCircle,
  Notes,
} from 'tabler-icons-react'

import adventofcodeImage from 'media/projects/adventofcode.png'
import coderscampfullstackImage from 'media/projects/coderscampfullstack.png'
import coderscamphackathonImage from 'media/projects/coderscamphackathon.png'
import coderscampjavascriptImage from 'media/projects/coderscampjavascript.png'
import coderscampreactImage from 'media/projects/coderscampreact.png'
import fandommonacoImage from 'media/projects/fandommonaco.png'
import logiccircuitboardsImage from 'media/projects/logiccircuitboards.png'
import nodewikiaapiImage from 'media/projects/nodewikiaapi.png'
import ocamlscalarunImage from 'media/projects/ocamlscalarun.png'
import scriptingtanksImage from 'media/projects/scriptingtanks.png'
import spotifymosaicImage from 'media/projects/spotifymosaic.png'
import tchojnackidevImage from 'media/projects/tchojnackidev.png'

import { Technology } from './technologies'

const T = Technology.LIST

class ProjectTag {
  private constructor(
    public readonly displayName: string,
    public readonly backgroundColor: string,
    public readonly link?: string
  ) {}

  public static readonly Group = (project: string) =>
    new ProjectTag('Group', '#9c2bac', `https://github.com/${project}/graphs/contributors`)

  public static readonly CodersCamp = new ProjectTag(
    'Bootcamp',
    '#067a6e',
    'https://github.com/CodersCamp2021-HK'
  )

  public static readonly University = new ProjectTag('University', '#067a6e')

  public static readonly Personal = new ProjectTag('Personal', '#067a6e')

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

  public static readonly Documentation = (link: string) =>
    new ProjectLink(link, 'Documentation', Notes)

  public static readonly Information = (link: string) =>
    new ProjectLink(link, 'More info', InfoCircle)

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

  public usesTechnology(technology: Technology) {
    return this.parts.some(({ technologies }) => technologies.includes(technology))
  }

  public static readonly LIST = {
    ADVENTOFCODE: new Project(
      'Advent of Code',
      adventofcodeImage,
      [ProjectTag.Personal],
      [ProjectLink.GitHub('advent-of-code'), ProjectLink.Information('https://adventofcode.com')],
      'My solutions to Advent of Code.',
      [new ProjectPart('Puzzle Solutions', [T.KOTLIN]), new ProjectPart('Tools', [T.GIT, T.GITHUB])]
    ),
    CODERSCAMPFULLSTACK: new Project(
      'JeszCoChcesz',
      coderscampfullstackImage,
      [
        ProjectTag.CodersCamp,
        ProjectTag.Group('CodersCamp2021-HK/CodersCamp2021.Project.Fullstack'),
      ],
      [
        ProjectLink.Deploy('https://coderscamp2021-hk-fullstack.onrender.com'),
        ProjectLink.Swagger('https://coderscamp2021-hk-fullstack.onrender.com/api'),
        ProjectLink.GitHub('CodersCamp2021.Project.Fullstack', 'CodersCamp2021-HK'),
      ],
      'Full-stack web application, online food delivery system connecting restaurants with health-conscious users.',
      [
        new ProjectPart('Front End', [
          T.REACT,
          T.TYPESCRIPT,
          T.MUI,
          T.IMMER,
          T.REACTROUTER,
          T.LODASH,
        ]),
        new ProjectPart('Back End', [T.NEST, T.TYPESCRIPT, T.MONGO, T.EXPRESS, T.PASSPORT, T.NODE]),
        new ProjectPart('Tools', [
          T.JEST,
          T.SWAGGER,
          T.DOCKER,
          T.STORYBOOK,
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
    CODERSCAMPHACKATHON: new Project(
      'Faktyczka',
      coderscamphackathonImage,
      [ProjectTag.CodersCamp, ProjectTag.Group('CodersCamp2021-HK/CodersCamp2021.Hackathon')],
      [
        ProjectLink.Deploy('https://faktyczka.vercel.app'),
        ProjectLink.Download(
          'https://github.com/CodersCamp2021-HK/CodersCamp2021.Hackathon/releases/latest'
        ),
        ProjectLink.GitHub('CodersCamp2021.Hackathon', 'CodersCamp2021-HK'),
      ],
      'Brower extension which notifies you about fake news. Created during the 24h Hack-a-Troll Hackathon in 2001.',
      [
        new ProjectPart('Extension', [T.REACT, T.TYPESCRIPT, T.EMOTION]),
        new ProjectPart('Website', [T.NEXT, T.REACT, T.TYPESCRIPT, T.CSS]),
        new ProjectPart('Server', [
          T.NEST,
          T.TYPESCRIPT,
          T.MONGO,
          T.RXJS,
          T.EXPRESS,
          T.NODE,
          T.LODASH,
        ]),
        new ProjectPart('Tools', [
          T.DOCKER,
          T.SWAGGER,
          T.JEST,
          T.HEROKU,
          T.VERCEL,
          T.VITE,
          T.ESLINT,
          T.PRETTIER,
          T.GIT,
          T.FIGMA,
          T.GITHUB,
        ]),
      ]
    ),
    CODERSCAMPJAVASCRIPT: new Project(
      'Rick and Morty Quiz',
      coderscampjavascriptImage,
      [
        ProjectTag.CodersCamp,
        ProjectTag.Group('CodersCamp2021-HK/CodersCamp2021.Project.JavaScript'),
      ],
      [
        ProjectLink.Deploy('https://coderscamp2021-hk.github.io/CodersCamp2021.Project.JavaScript'),
        ProjectLink.GitHub('CodersCamp2021.Project.JavaScript', 'CodersCamp2021-HK'),
      ],
      'Online singleplayer quiz testing your knowledge about the Rick and Morty show. Built without using any front-end frameworks.',
      [
        new ProjectPart('Website', [T.JAVASCRIPT, T.CSS, T.HTML, T.LODASH]),
        new ProjectPart('Tools', [
          T.JEST,
          T.VITE,
          T.YARN,
          T.ESLINT,
          T.PRETTIER,
          T.FIGMA,
          T.GIT,
          T.GITHUB,
        ]),
      ]
    ),
    CODERSCAMPREACT: new Project(
      'King and Pigs',
      coderscampreactImage,
      [ProjectTag.CodersCamp, ProjectTag.Group('CodersCamp2021-HK/CodersCamp2021.Project.React')],
      [
        ProjectLink.Deploy('https://coderscamp2021-hk.github.io/CodersCamp2021.Project.React'),
        ProjectLink.GitHub('CodersCamp2021.Project.React', 'CodersCamp2021-HK'),
      ],
      'Online platformer game with three stages. Built using public domain assets. The UI surrounding the game was created using React.',
      [
        new ProjectPart('Website', [T.REACT, T.JAVASCRIPT, T.EMOTION, T.CSS]),
        new ProjectPart('Tools', [
          T.JEST,
          T.STORYBOOK,
          T.VITE,
          T.YARN,
          T.ESLINT,
          T.PRETTIER,
          T.GIT,
          T.FIGMA,
          T.GITHUB,
        ]),
      ]
    ),
    FANDOMMONACO: new Project(
      'FANDOM-Monaco',
      fandommonacoImage,
      [ProjectTag.Personal, ProjectTag.Deprecated],
      [
        ProjectLink.Download('https://github.com/tchojnacki/FANDOM-Monaco/releases/latest'),
        ProjectLink.GitHub('FANDOM-Monaco'),
      ],
      'Browser extension that integrates Monaco Editor with Fandom.',
      [new ProjectPart('Extension', [T.JAVASCRIPT, T.CSS, T.HTML, T.ESLINT, T.GIT, T.GITHUB])]
    ),
    LOGICCIRCUITBOARDS: new Project(
      'Logic Circuit Boards',
      logiccircuitboardsImage,
      [ProjectTag.Personal],
      [
        ProjectLink.Download('https://www.curseforge.com/minecraft/mc-mods/logic-circuit-boards'),
        ProjectLink.GitHub('LogicCircuitBoards'),
      ],
      'A Minecraft mod that allows you to compress complex redstone logic gates into a single circuit block.',
      [new ProjectPart('Mod', [T.JAVA, T.MINECRAFTFORGE, T.JUNIT, T.GIT, T.GITHUB])]
    ),
    NODEWIKIAAPI: new Project(
      'nodewikiaapi',
      nodewikiaapiImage,
      [ProjectTag.Personal, ProjectTag.Deprecated],
      [
        ProjectLink.Documentation('https://tchojnacki.github.io/nodewikiaapi'),
        ProjectLink.Download('https://www.npmjs.com/package/nodewikiaapi'),
        ProjectLink.GitHub('nodewikiaapi'),
      ],
      "JavaScript wrapper for the Fandom's Wikia API V1.",
      [
        new ProjectPart('Package', [T.JAVASCRIPT, T.JSDOC]),
        new ProjectPart('Tools', [T.JEST, T.ESLINT, T.NPM, T.PRETTIER, T.GIT, T.GITHUB]),
      ]
    ),
    OCAMLSCALARUN: new Project(
      'OCaml & Scala Run in REPL',
      ocamlscalarunImage,
      [ProjectTag.University],
      [
        ProjectLink.Download(
          'https://marketplace.visualstudio.com/items?itemName=tchojnacki.ocaml-scala-run'
        ),
        ProjectLink.GitHub('ocaml-scala-run'),
      ],
      'VS Code extension which lets you run OCaml and Scala scripts in REPL with a single click.',
      [new ProjectPart('Extension', [T.TYPESCRIPT, T.ESLINT, T.GIT, T.NPM, T.GITHUB])]
    ),
    SCRIPTINGTANKS: new Project(
      'Tanks',
      scriptingtanksImage,
      [ProjectTag.University],
      [
        ProjectLink.Deploy('https://scripting-tanks.fly.dev'),
        ProjectLink.GitHub('scripting-tanks'),
      ],
      'Online real-time multiplayer game powered by WebSockets. Final project for the Script Languages university course.',
      [
        new ProjectPart('Front End', [
          T.THREE,
          T.REACT,
          T.MANTINE,
          T.IMMER,
          T.TYPESCRIPT,
          T.LODASH,
        ]),
        new ProjectPart('Back End', [T.CSHARP, T.DOTNET, T.ASPNET, T.MEDIATR, T.FLUENTVALIDATION]),
        new ProjectPart('Tools', [
          T.DOCKER,
          T.VITE,
          T.HEROKU,
          T.FLYIO,
          T.NPM,
          T.GIT,
          T.ESLINT,
          T.PRETTIER,
          T.GITHUB,
        ]),
      ]
    ),
    SPOTIFYMOSAIC: new Project(
      'Mosaics for Spotify',
      spotifymosaicImage,
      [ProjectTag.Personal],
      [
        ProjectLink.Download('https://crates.io/crates/spotifymosaic'),
        ProjectLink.GitHub('spotifymosaic'),
      ],
      'A CLI tool for generating Spotify playlist covers using album artwork.',
      [new ProjectPart('CLI', [T.RUST, T.CLAP, T.GIT, T.GITHUB])]
    ),
    TCHOJNACKIDEV: new Project(
      'tchojnacki.dev',
      tchojnackidevImage,
      [ProjectTag.Personal],
      [ProjectLink.Deploy('https://tchojnacki.dev'), ProjectLink.GitHub('tchojnacki-dev')],
      'Website acting as my portfolio and blog.',
      [
        new ProjectPart('Website', [T.NEXT, T.REACT, T.TAILWIND, T.TYPESCRIPT, T.LODASH]),
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

  public static readonly IMPORTANCE_ORDER = [
    Project.LIST.TCHOJNACKIDEV,
    Project.LIST.CODERSCAMPFULLSTACK,
    Project.LIST.SCRIPTINGTANKS,
    Project.LIST.CODERSCAMPHACKATHON,
    Project.LIST.CODERSCAMPREACT,
    Project.LIST.CODERSCAMPJAVASCRIPT,
    Project.LIST.LOGICCIRCUITBOARDS,
    Project.LIST.SPOTIFYMOSAIC,
    Project.LIST.ADVENTOFCODE,
    Project.LIST.OCAMLSCALARUN,
    Project.LIST.NODEWIKIAAPI,
    Project.LIST.FANDOMMONACO,
  ] as const
}

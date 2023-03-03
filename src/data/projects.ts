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
import amadeusImage from 'media/projects/amadeus.png'
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
import universitycourseworkImage from 'media/projects/universitycoursework.png'

import { WEBSITE_ROOT } from './sitemap'
import { Technology } from './technologies'

const T = Technology.LIST

class ProjectTag {
  private constructor(
    public readonly displayName: string,
    public readonly backgroundColor: string
  ) {}

  public static readonly Group = new ProjectTag('Group', '#9c2bac')

  public static readonly Bootcamp = new ProjectTag('Bootcamp', '#075b52')

  public static readonly University = new ProjectTag('University', '#075b52')

  public static readonly Personal = new ProjectTag('Personal', '#075b52')

  public static readonly Deprecated = new ProjectTag('Deprecated', '#ca3214')

  public static readonly Wip = new ProjectTag('Work In Progress', '#d97706')
}

class ProjectPart {
  public constructor(
    public readonly name: string,
    public readonly technologies: Technology[],
    public readonly tags: ProjectTag[] = []
  ) {}
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
  private constructor(
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
      [
        new ProjectPart('2019', [T.ELIXIR], [ProjectTag.Wip]),
        new ProjectPart('2020', [T.GLEAM], [ProjectTag.Wip]),
        new ProjectPart('2021', [T.KOTLIN]),
        new ProjectPart('2022', [T.FSHARP, T.DOTNET]),
        new ProjectPart('Tools', [T.GIT, T.GITHUB]),
      ]
    ),
    AMADEUS: new Project(
      'Amadeus',
      amadeusImage,
      [ProjectTag.Personal, ProjectTag.Wip],
      [ProjectLink.GitHub('Amadeus')],
      'General purpose Discord bot based on CQRS and built with Discord.Net.',
      [
        new ProjectPart('Bot', [T.CSHARP, T.DOTNET, T.MEDIATR]),
        new ProjectPart('Tools', [T.GIT, T.GITHUB]),
      ]
    ),
    CODERSCAMPFULLSTACK: new Project(
      'JeszCoChcesz',
      coderscampfullstackImage,
      [ProjectTag.Bootcamp, ProjectTag.Group],
      [ProjectLink.GitHub('CodersCamp2021.Project.Fullstack', 'CodersCamp2021-HK')],
      'Full-stack web application, online food delivery system connecting restaurants with health-conscious users.',
      [
        new ProjectPart('Front End', [
          T.REACT,
          T.TYPESCRIPT,
          T.MUI,
          T.REACTROUTER,
          T.CONTEXTAPI,
          T.IMMER,
          T.LODASH,
        ]),
        new ProjectPart('Back End', [
          T.NESTJS,
          T.TYPESCRIPT,
          T.MONGODB,
          T.EXPRESS,
          T.PASSPORT,
          T.NODEJS,
        ]),
        new ProjectPart('Tools', [
          T.TESTINGLIBRARY,
          T.JEST,
          T.SWAGGER,
          T.DOCKER,
          T.STORYBOOK,
          T.VITE,
          T.YARN,
          T.GITHUBACTIONS,
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
      [ProjectTag.Bootcamp, ProjectTag.Group],
      [
        ProjectLink.Deploy('https://faktyczka.vercel.app'),
        ProjectLink.Download(
          'https://github.com/CodersCamp2021-HK/CodersCamp2021.Hackathon/releases/latest'
        ),
        ProjectLink.GitHub('CodersCamp2021.Hackathon', 'CodersCamp2021-HK'),
      ],
      'Brower extension which notifies you about fake news. Created during the 24h Hack-a-Troll Hackathon in 2022.',
      [
        new ProjectPart('Extension', [T.REACT, T.TYPESCRIPT, T.EMOTION]),
        new ProjectPart('Website', [T.NEXTJS, T.REACT, T.TYPESCRIPT, T.CSS]),
        new ProjectPart('Server', [
          T.NESTJS,
          T.TYPESCRIPT,
          T.MONGODB,
          T.RXJS,
          T.EXPRESS,
          T.NODEJS,
          T.LODASH,
        ]),
        new ProjectPart('Tools', [
          T.SWAGGER,
          T.DOCKER,
          T.VITE,
          T.VERCEL,
          T.HEROKU,
          T.GITHUBACTIONS,
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
      [ProjectTag.Bootcamp, ProjectTag.Group],
      [
        ProjectLink.Deploy('https://coderscamp2021-hk.github.io/CodersCamp2021.Project.JavaScript'),
        ProjectLink.GitHub('CodersCamp2021.Project.JavaScript', 'CodersCamp2021-HK'),
      ],
      'Online singleplayer quiz testing your knowledge about the Rick and Morty show. Built without using any front-end frameworks.',
      [
        new ProjectPart('Website', [T.JAVASCRIPT, T.CSS, T.HTML, T.LODASH]),
        new ProjectPart('Tools', [
          T.TESTINGLIBRARY,
          T.JEST,
          T.VITE,
          T.YARN,
          T.GITHUBACTIONS,
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
      [ProjectTag.Bootcamp, ProjectTag.Group],
      [
        ProjectLink.Deploy('https://coderscamp2021-hk.github.io/CodersCamp2021.Project.React'),
        ProjectLink.GitHub('CodersCamp2021.Project.React', 'CodersCamp2021-HK'),
      ],
      'Online platformer game with three stages. Built using public domain assets. The UI surrounding the game was created using React.',
      [
        new ProjectPart('Website', [T.REACT, T.JAVASCRIPT, T.EMOTION, T.CONTEXTAPI, T.CSS]),
        new ProjectPart('Tools', [
          T.TESTINGLIBRARY,
          T.JEST,
          T.STORYBOOK,
          T.VITE,
          T.YARN,
          T.GITHUBACTIONS,
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
      [new ProjectPart('Mod', [T.JAVA, T.JUNIT, T.GIT, T.GITHUB])]
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
        new ProjectPart('Tools', [
          T.JEST,
          T.GITHUBACTIONS,
          T.ESLINT,
          T.NPM,
          T.PRETTIER,
          T.GIT,
          T.GITHUB,
        ]),
      ]
    ),
    OCAMLSCALARUN: new Project(
      'OCaml & Scala Run in REPL',
      ocamlscalarunImage,
      [ProjectTag.Personal],
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
          T.THREEJS,
          T.REACT,
          T.MANTINE,
          T.IMMER,
          T.TYPESCRIPT,
          T.LODASH,
        ]),
        new ProjectPart('Back End', [T.CSHARP, T.DOTNET, T.ASPNET, T.MEDIATR, T.FLUENTVALIDATION]),
        new ProjectPart('Tools', [
          T.XUNIT,
          T.DOCKER,
          T.VITE,
          T.FLYIO,
          T.FLUENTASSERTIONS,
          T.NSUBSTITUTE,
          T.GITHUBACTIONS,
          T.NPM,
          T.GIT,
          T.ESLINT,
          T.PRETTIER,
          T.GITHUB,
        ]),
        new ProjectPart('Legacy Back End', [T.PYTHON, T.FASTAPI], [ProjectTag.Deprecated]),
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
      [new ProjectPart('CLI', [T.RUST, T.GIT, T.GITHUB])]
    ),
    TCHOJNACKIDEV: new Project(
      'tchojnacki.dev',
      tchojnackidevImage,
      [ProjectTag.Personal],
      [ProjectLink.Deploy(WEBSITE_ROOT), ProjectLink.GitHub('tchojnacki-dev')],
      'Website acting as my portfolio and blog.',
      [
        new ProjectPart('Website', [T.NEXTJS, T.REACT, T.TAILWINDCSS, T.TYPESCRIPT, T.LODASH]),
        new ProjectPart('Tools', [
          T.TESTINGLIBRARY,
          T.JEST,
          T.VERCEL,
          T.GITHUBACTIONS,
          T.ESLINT,
          T.PRETTIER,
          T.FIGMA,
          T.NPM,
          T.GIT,
          T.GITHUB,
        ]),
      ]
    ),
    UNIVERSITYCOURSEWORK: new Project(
      'University Coursework',
      universitycourseworkImage,
      [ProjectTag.University],
      [],
      'Solutions to the tasks given out during my studies. Held in private repositories to limit cheating.',
      [
        new ProjectPart('Structured and Object Oriented Programming', [T.JAVA]),
        new ProjectPart('Data Structures and Algorithms', [T.JAVA]),
        new ProjectPart('Operating Systems', [T.JAVA, T.BASH]),
        new ProjectPart('Effective Programming Techniques', [T.CPP]),
        new ProjectPart('Programming Paradigms', [T.SCALA, T.OCAML, T.JAVA]),
        new ProjectPart('Systems Analysis and Decision Support Methods', [T.PYTHON]),
        new ProjectPart('Script Languages', [
          T.PYTHON,
          T.TYPESCRIPT,
          T.RUST,
          T.BASH,
          T.FASTAPI,
          T.DOCKER,
        ]),
        new ProjectPart('Introduction to IoT', [T.CPP, T.PYTHON]),
        new ProjectPart(
          'Software Engineering',
          [
            T.CSHARP,
            T.ASPNET,
            T.POSTGRESQL,
            T.ENTITYFRAMEWORK,
            T.SELENIUM,
            T.XUNIT,
            T.AUTOMAPPER,
            T.DOTNET,
            T.FLUENTASSERTIONS,
            T.HTML,
            T.CSS,
          ],
          [ProjectTag.Group]
        ),
        new ProjectPart('Developing Web Applications with .NET', [
          T.CSHARP,
          T.DOTNET,
          T.ASPNET,
          T.MICROSOFTSQLSERVER,
          T.ENTITYFRAMEWORK,
          T.SWAGGER,
          T.JAVASCRIPT,
          T.HTML,
          T.CSS,
          T.MAPSTER,
        ]),
        new ProjectPart(
          'Database System Design',
          [T.POSTGRESQL, T.NEO4J, T.PRISMA, T.TYPESCRIPT, T.PYTHON],
          [ProjectTag.Group]
        ),
        new ProjectPart('Mobile Applications for iOS', [T.SWIFT]),
      ]
    ),
  } as const

  public static readonly IMPORTANCE_ORDER = [
    Project.LIST.TCHOJNACKIDEV,
    Project.LIST.SCRIPTINGTANKS,
    Project.LIST.CODERSCAMPFULLSTACK,
    Project.LIST.CODERSCAMPHACKATHON,
    Project.LIST.CODERSCAMPREACT,
    Project.LIST.CODERSCAMPJAVASCRIPT,
    Project.LIST.LOGICCIRCUITBOARDS,
    Project.LIST.SPOTIFYMOSAIC,
    Project.LIST.ADVENTOFCODE,
    Project.LIST.AMADEUS,
    Project.LIST.UNIVERSITYCOURSEWORK,
    Project.LIST.OCAMLSCALARUN,
    Project.LIST.NODEWIKIAAPI,
    Project.LIST.FANDOMMONACO,
  ] as const
}

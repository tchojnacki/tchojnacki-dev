import type { ImageMetadata } from 'astro'
import {
  Api,
  BrandGithub,
  Download,
  ExternalLink,
  type Icon,
  InfoCircle,
  Notes,
} from 'tabler-icons-react'

import adventofcodeImage from '~/assets/projects/adventofcode.png'
import attorneySiteImage from '~/assets/projects/attorneysite.png'
import coderscampfullstackImage from '~/assets/projects/coderscampfullstack.png'
import coderscamphackathonImage from '~/assets/projects/coderscamphackathon.png'
import coderscampjavascriptImage from '~/assets/projects/coderscampjavascript.png'
import coderscampreactImage from '~/assets/projects/coderscampreact.png'
import esolangsImage from '~/assets/projects/esolangs.png'
import fandommonacoImage from '~/assets/projects/fandommonaco.png'
import logiccircuitboardsImage from '~/assets/projects/logiccircuitboards.png'
import nodewikiaapiImage from '~/assets/projects/nodewikiaapi.png'
import ocamlscalarunImage from '~/assets/projects/ocamlscalarun.png'
import scriptingtanksImage from '~/assets/projects/scriptingtanks.png'
import spotifymosaicImage from '~/assets/projects/spotifymosaic.png'
import tchojnackidevImage from '~/assets/projects/tchojnackidev.png'
import unisem4scriptlanguagesImage from '~/assets/projects/unisem4scriptlanguages.png'
import unisem5dotnetImage from '~/assets/projects/unisem5dotnet.png'
import unisem6aiImage from '~/assets/projects/unisem6ai.png'

import { Technology } from './technologies'

const T = Technology.LIST

class ProjectTag {
  private constructor(
    public readonly displayName: string,
    public readonly backgroundColor: string,
  ) {}

  public static readonly Group = new ProjectTag('Group', '#075b52')

  public static readonly University = new ProjectTag('University', '#075b52')

  public static readonly Personal = new ProjectTag('Personal', '#075b52')

  public static readonly Freelance = new ProjectTag('Freelance', '#075b52')

  public static readonly Deprecated = new ProjectTag('DEPRECATED', '#ca3214')

  public static readonly Wip = new ProjectTag('WORK IN PROGRESS', '#d97706')
}

class ProjectPart {
  public constructor(
    public readonly name: string,
    public readonly technologies: Technology[],
    public readonly tags: ProjectTag[] = [],
  ) {}
}

class ProjectLink {
  private constructor(
    public readonly link: string,
    public readonly displayName: string,
    public readonly IconComponent: Icon,
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
    public readonly image: ImageMetadata,
    public readonly tags: readonly ProjectTag[],
    public readonly links: readonly ProjectLink[],
    public readonly description: string,
    public readonly parts: readonly ProjectPart[],
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
      ],
    ),
    ATTORNEYSITE: new Project(
      'Attorney Site',
      attorneySiteImage,
      [ProjectTag.Freelance],
      [ProjectLink.Deploy('https://kancelariawalbrzych.pl')],
      'Website created for and used by a local law firm.',
      [
        new ProjectPart('Website', [T.ASTRO, T.SVELTE, T.TYPESCRIPT]),
        new ProjectPart('Tools', [
          T.FIGMA,
          T.CLOUDFLARE,
          T.GITHUBACTIONS,
          T.ESLINT,
          T.PRETTIER,
          T.NPM,
          T.GIT,
          T.GITHUB,
        ]),
      ],
    ),
    CODERSCAMPFULLSTACK: new Project(
      'JeszCoChcesz',
      coderscampfullstackImage,
      [ProjectTag.Group],
      [ProjectLink.GitHub('CodersCamp2021.Project.Fullstack', 'CodersCamp2021-HK')],
      'Full-stack web application, online food delivery system connecting restaurants with health-conscious users. Built during the CodersCamp 2021 web development bootcamp.',
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
      ],
    ),
    CODERSCAMPHACKATHON: new Project(
      'Faktyczka',
      coderscamphackathonImage,
      [ProjectTag.Group],
      [
        ProjectLink.Deploy('https://faktyczka.vercel.app'),
        ProjectLink.Download(
          'https://github.com/CodersCamp2021-HK/CodersCamp2021.Hackathon/releases/latest',
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
      ],
    ),
    CODERSCAMPJAVASCRIPT: new Project(
      'Rick and Morty Quiz',
      coderscampjavascriptImage,
      [ProjectTag.Group],
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
      ],
    ),
    CODERSCAMPREACT: new Project(
      'King and Pigs',
      coderscampreactImage,
      [ProjectTag.Group],
      [
        ProjectLink.Deploy('https://coderscamp2021-hk.github.io/CodersCamp2021.Project.React'),
        ProjectLink.GitHub('CodersCamp2021.Project.React', 'CodersCamp2021-HK'),
      ],
      'Online platformer game with three stages built using public domain assets. The UI surrounding the game was created using React.',
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
      ],
    ),
    ESOLANGS: new Project(
      'esolangs',
      esolangsImage,
      [ProjectTag.Personal],
      [
        ProjectLink.GitHub('esolangs'),
        ProjectLink.Documentation('https://tchojnacki.github.io/esolangs'),
      ],
      'Compilers and interpreters for esoteric programming languages.',
      [
        new ProjectPart('Brainfuck', [T.RUST]),
        new ProjectPart('Common', [T.RUST, T.WASM, T.GITHUBACTIONS, T.GITHUB, T.GIT]),
      ],
    ),
    FANDOMMONACO: new Project(
      'FANDOM-Monaco',
      fandommonacoImage,
      [ProjectTag.Personal, ProjectTag.Deprecated],
      [
        ProjectLink.Download('https://github.com/tchojnacki/FANDOM-Monaco/releases/latest'),
        ProjectLink.GitHub('FANDOM-Monaco'),
      ],
      'Browser extension that integrates the Monaco Editor with Fandom.',
      [new ProjectPart('Extension', [T.JAVASCRIPT, T.CSS, T.HTML, T.ESLINT, T.GIT, T.GITHUB])],
    ),
    LOGICCIRCUITBOARDS: new Project(
      'Logic Circuit Boards',
      logiccircuitboardsImage,
      [ProjectTag.Personal],
      [
        ProjectLink.Download('https://www.curseforge.com/minecraft/mc-mods/logic-circuit-boards'),
        ProjectLink.GitHub('LogicCircuitBoards'),
      ],
      'A Minecraft mod which allows you to compress complex redstone logic gates into circuit blocks occupying a single block.',
      [new ProjectPart('Mod', [T.JAVA, T.JUNIT, T.GIT, T.GITHUB])],
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
      ],
    ),
    OCAMLSCALARUN: new Project(
      'OCaml & Scala Run in REPL',
      ocamlscalarunImage,
      [ProjectTag.Personal],
      [
        ProjectLink.Download(
          'https://marketplace.visualstudio.com/items?itemName=tchojnacki.ocaml-scala-run',
        ),
        ProjectLink.GitHub('ocaml-scala-run'),
      ],
      'Visual Studio Code extension which lets you run OCaml and Scala scripts in REPL with a single click. Built for usage during the Programming Paradigms university course.',
      [new ProjectPart('Extension', [T.TYPESCRIPT, T.ESLINT, T.GIT, T.NPM, T.GITHUB])],
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
      ],
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
      [new ProjectPart('CLI', [T.RUST, T.GIT, T.GITHUB])],
    ),
    TCHOJNACKIDEV: new Project(
      'tchojnacki.dev',
      tchojnackidevImage,
      [ProjectTag.Personal],
      [ProjectLink.Deploy('https://tchojnacki.dev'), ProjectLink.GitHub('tchojnacki-dev')],
      'Website acting as my portfolio and blog.',
      [
        new ProjectPart('Website', [T.NEXTJS, T.REACT, T.TAILWINDCSS, T.TYPESCRIPT, T.LODASH]), // TODO
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
      ],
    ),
    UNISEM4SCRIPTLANGUAGES: new Project(
      'Script Languages Coursework',
      unisem4scriptlanguagesImage,
      [ProjectTag.University],
      [ProjectLink.GitHub('uni-sem-4-script-languages')],
      'Exercises for the Script Languages university course, which I took during my 4th semester. The project concluding the course is described in the Tanks project.',
      [new ProjectPart('Exercises', [T.PYTHON, T.RUST, T.BASH])],
    ),
    UNISEM5DOTNET: new Project(
      'Developing Web Applications with .NET Coursework',
      unisem5dotnetImage,
      [ProjectTag.University],
      [ProjectLink.GitHub('uni-sem-5-dotnet')],
      'Exercises for the Developing Web Applications with .NET university course, which I took during my 5th semester.',
      [
        new ProjectPart('Exercises', [
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
      ],
    ),
    UNISEM6AI: new Project(
      'Artificial Intelligence and Knowledge Engineering Coursework',
      unisem6aiImage,
      [ProjectTag.University],
      [ProjectLink.GitHub('uni-sem-6-ai')],
      'Exercises for the Artificial Intelligence and Knowledge Engineering university course, which I took during my 6th semester. The scope included pathfinding algorithms, game theory, genetic algorithms, and machine learning.',
      [
        new ProjectPart('Exercises', [
          T.RUST,
          T.PYTHON,
          T.PROLOG,
          T.SKLEARN,
          T.NUMPY,
          T.PANDAS,
          T.JUPYTER,
        ]),
      ],
    ),
  } as const

  public static readonly IMPORTANCE_ORDER = [
    Project.LIST.TCHOJNACKIDEV,
    Project.LIST.SCRIPTINGTANKS,
    Project.LIST.ATTORNEYSITE,
    Project.LIST.CODERSCAMPFULLSTACK,
    Project.LIST.UNISEM6AI,
    Project.LIST.ESOLANGS,
    Project.LIST.CODERSCAMPREACT,
    Project.LIST.CODERSCAMPJAVASCRIPT,
    Project.LIST.CODERSCAMPHACKATHON,
    Project.LIST.LOGICCIRCUITBOARDS,
    Project.LIST.ADVENTOFCODE,
    Project.LIST.SPOTIFYMOSAIC,
    Project.LIST.UNISEM4SCRIPTLANGUAGES,
    Project.LIST.UNISEM5DOTNET,
    Project.LIST.OCAMLSCALARUN,
    Project.LIST.NODEWIKIAAPI,
    Project.LIST.FANDOMMONACO,
  ] as const
}

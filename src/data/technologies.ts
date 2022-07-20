import { SimpleIcon } from 'simple-icons'
import * as ICONS from 'simple-icons/icons'

export class Technology {
  private constructor(
    public readonly icon: SimpleIcon,
    public readonly name: string = icon.title
  ) {}

  public static LIST = {
    CSS: new Technology(ICONS.siCss3, 'CSS'),
    DART: new Technology(ICONS.siDart),
    DOCKER: new Technology(ICONS.siDocker),
    ESLINT: new Technology(ICONS.siEslint),
    EXPRESS: new Technology(ICONS.siExpress),
    FASTAPI: new Technology(ICONS.siFastapi),
    FLUTTER: new Technology(ICONS.siFlutter),
    FIGMA: new Technology(ICONS.siFigma),
    GIT: new Technology(ICONS.siGit),
    GITHUB: new Technology(ICONS.siGithub),
    GUNICORN: new Technology(ICONS.siGunicorn),
    HEROKU: new Technology(ICONS.siHeroku),
    HTML: new Technology(ICONS.siHtml5, 'HTML'),
    IMMER: new Technology(ICONS.siImmer),
    JAVA: new Technology(ICONS.siOpenjdk, 'Java'),
    JAVASCRIPT: new Technology(ICONS.siJavascript),
    JEST: new Technology(ICONS.siJest),
    KOTLIN: new Technology(ICONS.siKotlin),
    LODASH: new Technology(ICONS.siLodash),
    MONGO: new Technology(ICONS.siMongodb),
    MUI: new Technology(ICONS.siMui),
    NEST: new Technology(ICONS.siNestjs),
    NEXT: new Technology(ICONS.siNextdotjs),
    NODE: new Technology(ICONS.siNodedotjs),
    NPM: new Technology(ICONS.siNpm),
    PASSPORT: new Technology(ICONS.siPassport),
    PRETTIER: new Technology(ICONS.siPrettier),
    PYTHON: new Technology(ICONS.siPython),
    REACT: new Technology(ICONS.siReact),
    RUST: new Technology(ICONS.siRust),
    SASS: new Technology(ICONS.siSass),
    SWAGGER: new Technology(ICONS.siSwagger),
    TAILWIND: new Technology(ICONS.siTailwindcss),
    THREE: new Technology(ICONS.siThreedotjs),
    TYPESCRIPT: new Technology(ICONS.siTypescript),
    VERCEL: new Technology(ICONS.siVercel),
    VITE: new Technology(ICONS.siVite),
    VSCODE: new Technology(ICONS.siVisualstudiocode),
    YARN: new Technology(ICONS.siYarn),
  } as const
}

import { SimpleIcon } from 'simple-icons'
import * as ICONS from 'simple-icons/icons'

export class Technology {
  private constructor(
    public readonly icon: SimpleIcon | string,
    public readonly name: string = typeof icon === 'string' ? icon : icon.title
  ) {}

  public static readonly LIST = {
    ATTRS: new Technology('attrs'),
    CLAP: new Technology('Clap'),
    CSS: new Technology(ICONS.siCss3, 'CSS'),
    DOCKER: new Technology(ICONS.siDocker),
    EMOTION: new Technology('Emotion'),
    ESLINT: new Technology(ICONS.siEslint),
    EXPRESS: new Technology(ICONS.siExpress),
    FASTAPI: new Technology(ICONS.siFastapi),
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
    JUNIT: new Technology(ICONS.siJunit5, 'JUnit'),
    JSDOC: new Technology('JSDoc'),
    KOTLIN: new Technology(ICONS.siKotlin),
    LODASH: new Technology(ICONS.siLodash),
    MANTINE: new Technology('Mantine'),
    MINECRAFTFORGE: new Technology('Minecraft Forge'),
    MONGO: new Technology(ICONS.siMongodb),
    MUI: new Technology(ICONS.siMui),
    NEST: new Technology(ICONS.siNestjs),
    NEXT: new Technology(ICONS.siNextdotjs),
    NODE: new Technology(ICONS.siNodedotjs),
    NPM: new Technology(ICONS.siNpm),
    PASSPORT: new Technology(ICONS.siPassport),
    PRETTIER: new Technology(ICONS.siPrettier),
    PYLINT: new Technology('Pylint'),
    PYTHON: new Technology(ICONS.siPython),
    REACT: new Technology(ICONS.siReact),
    REACTROUTER: new Technology(ICONS.siReactrouter),
    RXJS: new Technology(ICONS.siReactivex, 'RxJS'),
    RUST: new Technology(ICONS.siRust),
    SASS: new Technology(ICONS.siSass),
    STORYBOOK: new Technology(ICONS.siStorybook),
    SWAGGER: new Technology(ICONS.siSwagger),
    TAILWIND: new Technology(ICONS.siTailwindcss),
    THREE: new Technology(ICONS.siThreedotjs),
    TYPESCRIPT: new Technology(ICONS.siTypescript),
    VERCEL: new Technology(ICONS.siVercel),
    VITE: new Technology(ICONS.siVite),
    YARN: new Technology(ICONS.siYarn),
  } as const
}

import { SimpleIcon } from 'simple-icons'
import * as ICONS from 'simple-icons/icons'

export class Technology {
  private constructor(
    public readonly type: 'lang' | 'lib' | 'tool',
    public readonly icon: SimpleIcon | string,
    public readonly name: string = typeof icon === 'string' ? icon : icon.title
  ) {}

  public static readonly LIST: Record<string, Technology> = {
    ASPNET: new Technology('lib', ICONS.siDotnet, 'ASP.NET'),
    CLAP: new Technology('lib', 'Clap'),
    CONTEXTAPI: new Technology('lib', ICONS.siReact, 'React Context API'),
    CSHARP: new Technology('lang', ICONS.siCsharp, 'C#'),
    CSS: new Technology('lang', ICONS.siCss3, 'CSS'),
    DOCKER: new Technology('tool', ICONS.siDocker),
    DOTNET: new Technology('lib', ICONS.siDotnet),
    EMOTION: new Technology('lib', 'Emotion'),
    ESLINT: new Technology('tool', ICONS.siEslint),
    EXPRESS: new Technology('lib', ICONS.siExpress),
    FIGMA: new Technology('tool', ICONS.siFigma),
    FLUENTVALIDATION: new Technology('lib', 'FluentValidation'),
    FLYIO: new Technology('tool', 'Fly.io'),
    GIT: new Technology('tool', ICONS.siGit),
    GITHUB: new Technology('tool', ICONS.siGithub),
    GITHUBACTIONS: new Technology('tool', ICONS.siGithubactions),
    HEROKU: new Technology('tool', ICONS.siHeroku),
    HTML: new Technology('lang', ICONS.siHtml5, 'HTML'),
    IMMER: new Technology('lib', ICONS.siImmer),
    JAVA: new Technology('lang', ICONS.siOpenjdk, 'Java'),
    JAVASCRIPT: new Technology('lang', ICONS.siJavascript),
    JEST: new Technology('lib', ICONS.siJest),
    JUNIT: new Technology('lib', ICONS.siJunit5, 'JUnit'),
    JSDOC: new Technology('tool', 'JSDoc'),
    KOTLIN: new Technology('lang', ICONS.siKotlin),
    LODASH: new Technology('lib', ICONS.siLodash),
    MANTINE: new Technology('lib', 'Mantine'),
    MEDIATR: new Technology('lib', 'MediatR'),
    MINECRAFTFORGE: new Technology('lib', 'Minecraft Forge'),
    MONGO: new Technology('tool', ICONS.siMongodb),
    MUI: new Technology('lib', ICONS.siMui),
    NEST: new Technology('lib', ICONS.siNestjs),
    NEXT: new Technology('lib', ICONS.siNextdotjs),
    NODE: new Technology('lib', ICONS.siNodedotjs),
    NPM: new Technology('tool', ICONS.siNpm),
    PASSPORT: new Technology('lib', ICONS.siPassport),
    PRETTIER: new Technology('tool', ICONS.siPrettier),
    PYTHON: new Technology('lang', ICONS.siPython),
    REACT: new Technology('lib', ICONS.siReact),
    REACTROUTER: new Technology('lib', ICONS.siReactrouter),
    RXJS: new Technology('lib', ICONS.siReactivex, 'RxJS'),
    RUST: new Technology('lang', ICONS.siRust),
    STORYBOOK: new Technology('tool', ICONS.siStorybook),
    SWAGGER: new Technology('tool', ICONS.siSwagger),
    TAILWIND: new Technology('lib', ICONS.siTailwindcss),
    TESTINGLIBRARY: new Technology('lib', ICONS.siTestinglibrary),
    THREE: new Technology('lib', ICONS.siThreedotjs),
    TYPESCRIPT: new Technology('lang', ICONS.siTypescript),
    VERCEL: new Technology('tool', ICONS.siVercel),
    VITE: new Technology('tool', ICONS.siVite),
    YARN: new Technology('tool', ICONS.siYarn),
  }
}

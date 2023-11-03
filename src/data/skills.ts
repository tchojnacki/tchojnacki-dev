import { Technology } from './technologies'

const T = Technology.LIST

export const TECH_SPHERE_SKILL_NAMES: readonly string[] = [
  T.REACT,
  T.ASPNET,
  T.NESTJS,
  T.NEXTJS,
  T.TYPESCRIPT,
  T.CSHARP,
  T.DOTNET,
  T.JAVASCRIPT,
  T.EXPRESS,
  T.NODEJS,
  T.JAVA,
  T.PYTHON,
  T.RUST,
  T.MONGODB,
  T.POSTGRESQL,
  T.CSS,
  T.HTML,
  T.DOCKER,
].map(t => t.name)

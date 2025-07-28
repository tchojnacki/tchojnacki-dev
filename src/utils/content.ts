import type { ImageMetadata } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'
import * as ICONS from 'simple-icons'
import { keyComparator } from './sorting'

export type SkillId = CollectionEntry<'skills'>['id']
type SkillType = CollectionEntry<'skills'>['data']['type']
export type Skill = {
  id: SkillId
  type: SkillType
  icon: ICONS.SimpleIcon | string
  name: string
  description: string
}

export type ProjectId = CollectionEntry<'projects'>['id']
export type ProjectTag = CollectionEntry<'projects'>['data']['tags'][number]
export type ProjectLink = CollectionEntry<'projects'>['data']['links'][number]
type ProjectPart = { name: string; skills: Skill[]; tags: ProjectTag[] }
export type Project = {
  id: ProjectId
  name: string
  description: string
  image: ImageMetadata
  tags: ProjectTag[]
  links: ProjectLink[]
  parts: ProjectPart[]
}

type Social = CollectionEntry<'socials'>['data']

export type Post = CollectionEntry<'posts'>

export async function getSkills(): Promise<Record<SkillId, Skill>> {
  const skillEntries = await getCollection('skills')
  return Object.fromEntries(
    skillEntries.map(({ id, data }) => {
      if ('icon' in data) {
        const { type, name, description } = data
        const icon = ICONS[data.icon as keyof typeof ICONS] as ICONS.SimpleIcon
        return [id, { id, type, icon, name: name ?? icon.title, description } satisfies Skill]
      } else {
        const { type, name, description } = data
        return [id, { id, type, icon: name, name, description } satisfies Skill]
      }
    }),
  ) as Record<SkillId, Skill>
}

export async function getProjects(): Promise<Record<ProjectId, Project>> {
  const skills = await getSkills()
  const projectEntries = await getCollection('projects')
  return Object.fromEntries(
    projectEntries.map(({ id, data: { name, description, image, tags, links, parts } }) => [
      id,
      {
        id,
        name,
        description,
        image,
        tags,
        links,
        parts: parts.map(({ name, tags, skillIds }) => ({
          name,
          tags: tags ?? [],
          skills: skillIds.map(({ id }) => skills[id]),
        })),
      } satisfies Project,
    ]),
  ) as Record<ProjectId, Project>
}

export async function getSocials(): Promise<Social[]> {
  return (await getCollection('socials')).map(({ data }) => data)
}

export async function getPosts(): Promise<Post[]> {
  return (await getCollection('posts')).sort(keyComparator(p => p.data.date.getTime(), true))
}

export async function getTags(): Promise<string[]> {
  return [...new Set((await getCollection('posts')).flatMap(p => p.data.tags))].sort()
}

export const projectImportanceOrder = [
  'tchojnacki-dev',
  'senso',
  'coderscamp-fullstack',
  'scripting-tanks',
  'attorney-site',
  'uni-sem-6-ai',
  'esolangs',
  'coderscamp-react',
  'coderscamp-javascript',
  'coderscamp-hackathon',
  'logic-circuit-boards',
  'advent-of-code',
  'spotify-mosaic',
  'uni-sem-4-script-languages',
  'uni-sem-5-dotnet',
  'ocaml-scala-run',
  'node-wikia-api',
  'fandom-monaco',
] satisfies ProjectId[]

export const techSphereSkillIds = [
  'react',
  'aspnet',
  'nestjs',
  'nextjs',
  'typescript',
  'csharp',
  'dotnet',
  'javascript',
  'express',
  'nodejs',
  'java',
  'python',
  'rust',
  'mongodb',
  'postgres',
  'css',
  'html',
] satisfies SkillId[]

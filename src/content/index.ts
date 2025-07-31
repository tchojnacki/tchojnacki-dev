import type { GetStaticPathsItem, ImageMetadata } from 'astro'
import { getCollection, getEntry, type CollectionEntry } from 'astro:content'
import { keyBy, sortBy, uniq } from 'lodash-es'
import * as ICONS from 'simple-icons'

export type Skill = {
  id: string
  icon: ICONS.SimpleIcon | string
  name: string
  description: string
}

export type ProjectTag = CollectionEntry<'projects'>['data']['tags'][number]
export type ProjectLink = CollectionEntry<'projects'>['data']['links'][number]
type ProjectPart = { name: string; skills: Skill[]; tags: ProjectTag[] }
export type Project = {
  id: string
  name: string
  description: string
  image: ImageMetadata
  tags: ProjectTag[]
  links: ProjectLink[]
  parts: ProjectPart[]
}

export type Post = CollectionEntry<'posts'>

function resolveSkillEntry(entry: CollectionEntry<'skills'>): Skill {
  const { description } = entry.data
  if (!('icon' in entry.data)) {
    return { id: entry.id, icon: entry.data.name, name: entry.data.name, description }
  }
  const icon = ICONS[entry.data.icon as keyof typeof ICONS] as ICONS.SimpleIcon
  return { id: entry.id, icon, name: entry.data.name ?? icon.title, description }
}

export async function getSkillById(id: string): Promise<Skill> {
  const skill = await getEntry('skills', id)
  if (!skill) throw new Error(`Skill with id "${id}" not found`)
  return resolveSkillEntry(skill)
}

export async function getSkills(): Promise<Skill[]> {
  return sortBy((await getCollection('skills')).map(resolveSkillEntry), 'name')
}

export async function getProjects(): Promise<Project[]> {
  const skillById = keyBy(await getSkills(), 'id')
  const projectEntries = await getCollection('projects')
  return sortBy(
    projectEntries.map(({ id, data }) => ({
      id,
      ...data,
      parts: data.parts.map(({ name, tags = [], skillIds }) => ({
        name,
        tags,
        skills: skillIds.map(({ id }) => skillById[id]).filter(s => s !== undefined),
      })),
    })),
    p => projectImportanceOrder.indexOf(p.id),
  )
}

export async function getPosts(): Promise<Post[]> {
  return sortBy(await getCollection('posts'), p => -p.data.date.getTime())
}

export async function getTags(): Promise<string[]> {
  return sortBy(uniq((await getCollection('posts')).flatMap(p => p.data.tags)))
}

export function pathsFrom<C, R extends GetStaticPathsItem>(
  getContent: () => Promise<C[]>,
  mapper: (c: C) => R,
): () => Promise<R[]> {
  return () => getContent().then(c => c.map(mapper))
}

const projectImportanceOrder = [
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
]

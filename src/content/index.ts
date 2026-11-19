import type { GetStaticPathsItem, ImageMetadata } from "astro"
import { getCollection, getEntry, type CollectionEntry } from "astro:content"
import { keyBy, sortBy, uniq } from "es-toolkit"
import * as ICONS from "simple-icons"

import { featuredPosts, featuredProjects, projectImportanceOrder } from "~/consts/featured"

export type Skill = {
  id: string
  icon: ICONS.SimpleIcon | string
  name: string
  description: string
}

export type ProjectTag = CollectionEntry<"projects">["data"]["tags"][number]
export type ProjectLink = CollectionEntry<"projects">["data"]["links"][number]
type ProjectPart = { name: string; skills: Skill[]; tags: ProjectTag[]; small: boolean }
export type Project = {
  id: string
  name: string
  description: string
  image: ImageMetadata
  tags: ProjectTag[]
  links: ProjectLink[]
  parts: ProjectPart[]
}

export type Post = CollectionEntry<"posts">

function assertKnownIds(kind: string, ids: string[], known: string[]): void {
  const unknown = ids.find(id => !known.includes(id))
  if (unknown !== undefined) throw new Error(`Unknown ${kind} id "${unknown}"`)
}

function resolveSkillEntry(entry: CollectionEntry<"skills">): Skill {
  const { description } = entry.data
  if (!("icon" in entry.data)) {
    return { id: entry.id, icon: entry.data.name, name: entry.data.name, description }
  }
  if (!(entry.data.icon in ICONS)) throw new Error(`Icon "${entry.data.icon}" not available`)
  const icon = ICONS[entry.data.icon as keyof typeof ICONS]
  return { id: entry.id, icon, name: entry.data.name ?? icon.title, description }
}

export async function getSkillById(id: string): Promise<Skill> {
  const skill = await getEntry("skills", id)
  if (!skill) throw new Error(`Skill with id "${id}" not found`)
  return resolveSkillEntry(skill)
}

export async function getSkills(): Promise<Skill[]> {
  return sortBy((await getCollection("skills")).map(resolveSkillEntry), ["name"])
}

export async function getProjects(): Promise<Project[]> {
  const skillById = keyBy(await getSkills(), s => s.id)
  const projectEntries = await getCollection("projects")
  const projectIds = projectEntries.map(p => p.id)
  assertKnownIds("featured project", featuredProjects, projectIds)
  assertKnownIds("ordered project", projectImportanceOrder, projectIds)
  const unordered = projectIds.find(id => !projectImportanceOrder.includes(id))
  if (unordered !== undefined) {
    throw new Error(`Project "${unordered}" missing from projectImportanceOrder`)
  }
  return sortBy(
    projectEntries.map(({ id, data }) => ({
      id,
      ...data,
      parts: data.parts.map(({ name, tags = [], skillIds, small }) => ({
        name,
        tags,
        skills: skillIds.map(({ id }) => skillById[id]).filter(s => s !== undefined),
        small,
      })),
    })),
    [p => projectImportanceOrder.indexOf(p.id)],
  )
}

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("posts")
  assertKnownIds(
    "featured post",
    featuredPosts,
    posts.map(p => p.id),
  )
  return sortBy(posts, [p => -p.data.date.getTime()])
}

export async function getTags(): Promise<string[]> {
  return uniq((await getCollection("posts")).flatMap(p => p.data.tags)).toSorted((a, b) =>
    a.localeCompare(b),
  )
}

export function pathsFrom<C, R extends GetStaticPathsItem>(
  getContent: () => Promise<C[]>,
  mapper: (c: C) => R,
): () => Promise<R[]> {
  return async () => (await getContent()).map(mapper)
}

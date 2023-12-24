import { z, defineCollection, reference } from 'astro:content'

const projectTag = z.enum(['personal', 'university', 'group', 'freelance', 'deprecated', 'wip'])

const projectLink = z.union([
  z.object({ type: z.literal('github'), repo: z.string(), owner: z.string().optional() }),
  z.object({
    type: z.enum(['deploy', 'documentation', 'information', 'download', 'swagger']),
    href: z.string().url(),
  }),
])

const projectPart = z.object({
  name: z.string(),
  skillIds: z.array(reference('skills')),
  tags: z.array(projectTag).optional(),
})

const projects = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      image: image(),
      tags: z.array(projectTag),
      links: z.array(projectLink),
      parts: z.array(projectPart),
    }),
})

const skills = defineCollection({
  type: 'data',
  schema: z.intersection(
    z.union([
      z.object({
        icon: z.string(),
        name: z.string().optional(),
      }),
      z.object({
        name: z.string(),
      }),
    ]),
    z.object({
      type: z.enum(['language', 'library', 'tool']),
      description: z.string(),
    }),
  ),
})

const socials = defineCollection({
  type: 'data',
  schema: z.object({
    label: z.string(),
    href: z.string().url(),
    icon: z.string(),
  }),
})

export const collections = { projects, skills, socials }

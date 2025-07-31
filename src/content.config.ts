import { glob } from 'astro/loaders'
import { defineCollection, reference, z } from 'astro:content'

const projectTag = z.enum([
  'personal',
  'academic',
  'freelance',
  'bootcamp',
  'group',
  'wip',
  'deprecated',
])

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      image: image(),
      tags: z.array(projectTag),
      links: z.array(
        z.union([
          z.object({
            type: z.literal('github'),
            repo: z.string(),
            owner: z.string().optional(),
            part: z.string().optional(),
          }),
          z.object({
            type: z.enum(['deploy', 'documentation', 'download', 'paper']),
            href: z.string().url(),
          }),
        ]),
      ),
      parts: z.array(
        z.object({
          name: z.string(),
          skillIds: z.array(reference('skills')),
          tags: z.array(projectTag).optional(),
        }),
      ),
    }),
})

const skills = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/skills' }),
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
      description: z.string(),
    }),
  ),
})

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.date(),
    abstract: z.string(),
    skills: z.array(reference('skills')),
    tags: z.array(z.string().regex(/^[a-z-]+$/)),
  }),
})

export const collections = { projects, skills, posts }

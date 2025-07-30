import { type Project, type Skill } from '~/content'
import { comparator } from '~/lib/sorting'

export function jaccard(a: string, b: string, list: string[][]) {
  const aSize = list.filter(p => p.includes(a)).length
  const bSize = list.filter(p => p.includes(b)).length
  const commonSize = list.filter(p => p.includes(a) && p.includes(b)).length
  return commonSize / (aSize + bSize - commonSize)
}

export function calculateRelatedSkills(
  skillEntries: Record<string, Skill>,
  projectEntries: Record<string, Project>,
): Record<string, string[]> {
  const skillIds = Object.keys(skillEntries)
  const projects = Object.values(projectEntries).map(project =>
    project.parts.flatMap(part => part.skills.map(skill => skill.id)),
  )
  const parts = Object.values(projectEntries).flatMap(project =>
    project.parts.map(part => part.skills.map(skill => skill.id)),
  )

  function similarity(a: string, b: string) {
    if (a === b) {
      return 0
    }

    return 10 * jaccard(a, b, parts) + jaccard(a, b, projects)
  }

  return Object.fromEntries(
    skillIds.map(target => [
      target,
      [...skillIds].sort(comparator(s => similarity(target, s), 'desc')).slice(0, 4),
    ]),
  ) as Record<string, string[]>
}

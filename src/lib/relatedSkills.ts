import { fromPairs, sortBy } from 'lodash-es'

import { type Project, type Skill } from '~/content'

export function jaccard(a: string, b: string, list: string[][]) {
  const aSize = list.filter(p => p.includes(a)).length
  const bSize = list.filter(p => p.includes(b)).length
  const commonSize = list.filter(p => p.includes(a) && p.includes(b)).length
  return commonSize / (aSize + bSize - commonSize)
}

export function calculateRelatedSkills(
  skillList: Skill[],
  projectList: Project[],
): Record<string, string[]> {
  const skillIds = skillList.map(skill => skill.id)
  const projects = projectList.map(project =>
    project.parts.flatMap(part => part.skills.map(skill => skill.id)),
  )
  const parts = projectList.flatMap(project =>
    project.parts.map(part => part.skills.map(skill => skill.id)),
  )

  function similarity(a: string, b: string) {
    return a === b ? 0 : 10 * jaccard(a, b, parts) + jaccard(a, b, projects)
  }

  return fromPairs<string[]>(
    skillIds.map(target => [target, sortBy(skillIds, s => -similarity(target, s)).slice(0, 4)]),
  )
}

import { type SkillId, type Skill, type Project, type ProjectId } from '~/utils/content'
import { keyComparator } from '~/utils/sorting'

export function jaccard(a: SkillId, b: SkillId, list: SkillId[][]) {
  const aSize = list.filter(p => p.includes(a)).length
  const bSize = list.filter(p => p.includes(b)).length
  const commonSize = list.filter(p => p.includes(a) && p.includes(b)).length
  return commonSize / (aSize + bSize - commonSize)
}

export function calculateRelatedSkills(
  skillEntries: Record<SkillId, Skill>,
  projectEntries: Record<ProjectId, Project>,
): Record<SkillId, SkillId[]> {
  const skillIds = Object.keys(skillEntries) as SkillId[]
  const projects = Object.values(projectEntries).map(project =>
    project.parts.flatMap(part => part.skills.map(skill => skill.id)),
  )
  const parts = Object.values(projectEntries).flatMap(project =>
    project.parts.map(part => part.skills.map(skill => skill.id)),
  )

  function similarity(a: SkillId, b: SkillId) {
    if (a === b) {
      return 0
    }

    return 10 * jaccard(a, b, parts) + jaccard(a, b, projects)
  }

  return Object.fromEntries(
    skillIds.map(target => [
      target,
      [...skillIds].sort(keyComparator(s => similarity(target, s), true)).slice(0, 4),
    ]),
  ) as Record<SkillId, SkillId[]>
}

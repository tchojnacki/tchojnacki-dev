import { type SkillId, type Skill, type Project, type ProjectId } from '~/utils/content'

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

  function jaccard(a: SkillId, b: SkillId, list: SkillId[][]) {
    const aSize = list.filter(p => p.includes(a)).length
    const bSize = list.filter(p => p.includes(b)).length
    const commonSize = list.filter(p => p.includes(a) && p.includes(b)).length
    return commonSize / (aSize + bSize - commonSize)
  }

  function similarity(a: SkillId, b: SkillId) {
    if (a === b) {
      return 0
    }

    return 10 * jaccard(a, b, parts) + jaccard(a, b, projects)
  }

  return Object.fromEntries(
    skillIds.map(target => [
      target,
      [...skillIds].sort((a, b) => similarity(target, b) - similarity(target, a)).slice(0, 4),
    ]),
  ) as Record<SkillId, SkillId[]>
}

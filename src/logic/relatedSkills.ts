import { getProjects, getSkills, type SkillId } from '~/utils/content'

async function calculateRelatedSkills(): Promise<Record<SkillId, SkillId[]>> {
  const skillIds = Object.keys(await getSkills()) as SkillId[]
  const projects = Object.values(await getProjects()).map(project =>
    project.parts.flatMap(part => part.skills.map(skill => skill.id)),
  )
  const parts = Object.values(await getProjects()).flatMap(project =>
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

export const relatedSkills = await calculateRelatedSkills()

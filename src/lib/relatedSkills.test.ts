import { describe, expect, it } from 'vitest'
import type { Project, Skill } from '~/content'
import { calculateRelatedSkills, jaccard } from '~/lib/relatedSkills'

describe(jaccard, () => {
  it('returns NaN when the list is empty', () => {
    expect(jaccard('aspnet', 'dotnet', [])).toBeNaN()
  })

  it('returns 1.0 for common appearance in set', () => {
    expect(jaccard('aspnet', 'dotnet', [['aspnet', 'dotnet']])).toBeCloseTo(1)
  })

  it('returns 0.0 for distinct appearances in sets', () => {
    expect(jaccard('aspnet', 'dotnet', [['aspnet'], ['dotnet']])).toBeCloseTo(0)
  })

  it('returns numbers between 0.5 and 1.0 for appearance combinations', () => {
    const jac = jaccard('react', 'typescript', [
      ['react', 'typescript'],
      ['react', 'javascript'],
      ['javascript', 'typescript'],
    ])
    expect(jac).toBeGreaterThan(0)
    expect(jac).toBeLessThan(1)
  })
})

describe(calculateRelatedSkills, () => {
  it('returns relevant related skills', () => {
    const skillEntries = {
      aspnet: {},
      dotnet: {},
      csharp: {},
      react: {},
      typescript: {},
    } as unknown as Record<string, Skill>
    const projectEntries = {
      senso: {
        parts: [
          { skills: [{ id: 'aspnet' }, { id: 'dotnet' }, { id: 'csharp' }] },
          { skills: [{ id: 'react' }, { id: 'typescript' }] },
        ],
      },
    } as unknown as Record<string, Project>

    const related = calculateRelatedSkills(skillEntries, projectEntries)

    expect(related['aspnet']).toStrictEqual(['dotnet', 'csharp', 'react', 'typescript'])
    expect(related['react']).toStrictEqual(['typescript', 'aspnet', 'dotnet', 'csharp'])
  })
})

import { describe, expect, it } from 'vitest'
import type { Project, Skill } from '~/content'
import { calculateRelatedSkills, jaccard } from '~/lib/relatedSkills'

describe(jaccard, () => {
  it('returns NaN when the list is empty', () => {
    expect(jaccard('aspnet', 'csharp', [])).toBeNaN()
  })

  it('returns 1.0 for common appearance in set', () => {
    expect(jaccard('aspnet', 'csharp', [['aspnet', 'csharp']])).toBeCloseTo(1)
  })

  it('returns 0.0 for distinct appearances in sets', () => {
    expect(jaccard('aspnet', 'csharp', [['aspnet'], ['csharp']])).toBeCloseTo(0)
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
    const skillList = [
      { id: 'aspnet' },
      { id: 'csharp' },
      { id: 'react' },
      { id: 'typescript' },
      { id: 'css' },
    ] as Skill[]
    const projectList = [
      {
        id: 'senso',
        parts: [
          { skills: [{ id: 'aspnet' }, { id: 'csharp' }] },
          { skills: [{ id: 'react' }, { id: 'typescript' }, { id: 'css' }] },
        ],
      },
    ] as Project[]

    const related = calculateRelatedSkills(skillList, projectList)

    expect(related['aspnet']).toStrictEqual(['csharp', 'react', 'typescript', 'css'])
    expect(related['react']).toStrictEqual(['typescript', 'css', 'aspnet', 'csharp'])
  })
})

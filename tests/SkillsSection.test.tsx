import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { SkillsSection } from 'components'

describe('SkillsSection', () => {
  it('shows the skills', () => {
    render(<SkillsSection />)

    const skill = screen.getByRole('heading', { name: 'React' })

    expect(skill).toBeInTheDocument()
  })
})

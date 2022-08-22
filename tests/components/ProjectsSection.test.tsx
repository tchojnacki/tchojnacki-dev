import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { ProjectsSection } from 'components'

describe('ProjectsSection', () => {
  it('shows featured projects', () => {
    render(<ProjectsSection />)

    const projectTitle = screen.getByRole('heading', { name: /tchojnacki\.dev/ })
    expect(projectTitle).toBeInTheDocument()
  })
})

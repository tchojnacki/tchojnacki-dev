import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Landing } from 'components'

describe('Landing', () => {
  it('renders the heading', () => {
    render(<Landing />)

    const heading = screen.getByRole('heading', { name: 'Tomasz Chojnacki' })
    expect(heading).toBeInTheDocument()
  })
})

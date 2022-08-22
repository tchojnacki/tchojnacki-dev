import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Footer } from 'components'

describe('Footer', () => {
  it('shows the author', () => {
    render(<Footer />)

    const author = screen.getByText('Tomasz Chojnacki')
    expect(author).toBeInTheDocument()
  })
})

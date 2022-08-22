import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { AboutSection } from 'components'

describe('AboutSection', () => {
  it('displays an image', () => {
    render(<AboutSection />)

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
  })
})

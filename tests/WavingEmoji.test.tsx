import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { WavingEmoji } from 'components'

describe('WavingEmoji', () => {
  it('renders the emoji', () => {
    render(<WavingEmoji />)

    const emoji = screen.getByAltText('👋')

    expect(emoji).toBeInTheDocument()
  })
})

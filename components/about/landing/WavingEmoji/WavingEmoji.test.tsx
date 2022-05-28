import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { WavingEmoji } from './WavingEmoji'

describe('WavingEmoji', () => {
  it('renders the emoji', () => {
    render(<WavingEmoji />)

    const emoji = screen.getByRole('button', { name: /:wave:/ })

    expect(emoji).toBeInTheDocument()
  })
})

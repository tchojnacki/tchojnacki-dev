import WavingEmoji from '../components/about/landing/WavingEmoji'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('WavingEmoji', () => {
  it('renders the emoji', () => {
    render(<WavingEmoji />)

    const emoji = screen.getByText(/👋/)

    expect(emoji).toBeInTheDocument()
  })
})

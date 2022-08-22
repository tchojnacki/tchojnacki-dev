import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Emoji, ErrorPage } from 'components'

describe('ErrorPage', () => {
  it('shows the error', () => {
    const code = 404

    render(
      <ErrorPage code={code}>
        Not Found <Emoji>👀</Emoji>
      </ErrorPage>
    )

    const heading = screen.getByRole('heading', { name: code.toString() })
    expect(heading).toBeInTheDocument()
  })
})

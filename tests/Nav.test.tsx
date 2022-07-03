import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'

import { Nav } from 'components'

describe('Nav', () => {
  beforeAll(() => {
    // @ts-ignore
    nextRouter.useRouter = jest.fn().mockImplementation(() => ({ route: '/' }))
  })

  it('toggles theme correctly', () => {
    const toggleTheme = jest.fn()

    render(<Nav currentTheme="dark" toggleTheme={toggleTheme} />)

    const themeButton = screen.getByLabelText('Switch to light theme')
    expect(themeButton).toBeInTheDocument()

    fireEvent.click(themeButton)
    expect(toggleTheme).toBeCalledTimes(1)
  })

  it('opens mobile menu', () => {
    render(<Nav currentTheme="dark" toggleTheme={jest.fn()} />)

    const menuButtons = screen.getAllByLabelText('Open menu')
    expect(menuButtons).toHaveLength(2)

    const hamburger = menuButtons[0]
    fireEvent.click(hamburger)
    expect(hamburger).toHaveAccessibleName('Close menu')
  })
})

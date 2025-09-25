import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { fn } from "storybook/test"

import NavHamburger from "~/components/common/nav/NavHamburger"

const meta = {
  component: NavHamburger,
  title: "Common/Nav/NavHamburger",
} satisfies Meta<typeof NavHamburger>

export default meta

type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    menuOpen: true,
    onClick: fn(),
  },
}

export const Closed: Story = {
  args: {
    menuOpen: false,
    onClick: fn(),
  },
}

export const Toggle: Story = {
  render: args => {
    const [menuOpen, setMenuOpen] = useState(args.menuOpen)
    return <NavHamburger {...args} menuOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
  },
  args: {
    menuOpen: false,
    onClick: () => {},
  },
  parameters: { controls: { exclude: ["menuOpen", "onClick"] } },
}

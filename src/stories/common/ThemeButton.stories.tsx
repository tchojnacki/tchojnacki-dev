import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { action } from "storybook/actions"

import ThemeButton from "~/components/common/nav/ThemeButton"

const meta = {
  component: ThemeButton,
  title: "Common/Nav/ThemeButton",
  parameters: { controls: { exclude: ["useTheme"] } },
} satisfies Meta<typeof ThemeButton>

export default meta

type Story = StoryObj<typeof meta>

export const Dark: Story = {
  args: {
    useTheme: () => ({
      theme: "dark",
      toggleTheme: action("toggleTheme"),
    }),
  },
}

export const Light: Story = {
  args: {
    useTheme: () => ({
      theme: "light",
      toggleTheme: action("toggleTheme"),
    }),
  },
}

function useThemeImpl() {
  const [theme, setTheme] = useState<"dark" | "light">("light")
  return {
    theme,
    toggleTheme: () => setTheme(prev => (prev === "dark" ? "light" : "dark")),
  }
}

export const Toggle: Story = {
  args: {
    useTheme: useThemeImpl,
  },
}

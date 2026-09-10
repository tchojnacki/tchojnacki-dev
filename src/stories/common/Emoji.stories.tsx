import type { Meta, StoryObj } from "@storybook/react-vite"

import Emoji from "~/components/common/Emoji"

const meta = {
  component: Emoji,
  title: "Common/Emoji",
} satisfies Meta<typeof Emoji>

export default meta

type Story = StoryObj<typeof meta>

export const Eyes: Story = {
  args: {
    text: "eyes",
  },
}

export const Wave: Story = {
  args: {
    text: "wave",
  },
}

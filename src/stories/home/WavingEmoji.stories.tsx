import type { Meta, StoryObj } from "@storybook/react-vite"

import WavingEmojiComponent from "~/components/home/landing/WavingEmoji"

const meta = {
  component: WavingEmojiComponent,
  title: "Home/Landing/WavingEmoji",
} satisfies Meta<typeof WavingEmojiComponent>

export default meta

type Story = StoryObj<typeof meta>

export const WavingEmoji: Story = {}

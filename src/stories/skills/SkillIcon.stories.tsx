import type { Meta, StoryObj } from "@storybook/react-vite"
import { siTypescript } from "simple-icons"

import SkillIconComponent from "~/components/skills/SkillIcon"

const meta = {
  component: SkillIconComponent,
  title: "Skills/SkillIcon",
  decorators: [
    Story => (
      <div className="h-16 w-16">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SkillIconComponent>

export default meta

type Story = StoryObj<typeof meta>

export const SkillIcon: Story = {
  args: {
    skill: {
      icon: siTypescript,
      name: "TypeScript",
    },
  },
}

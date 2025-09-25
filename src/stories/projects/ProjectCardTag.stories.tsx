import type { Meta, StoryObj } from "@storybook/react-vite"

import ProjectCardTag from "~/components/projects/ProjectCardTag"

const meta = {
  component: ProjectCardTag,
  title: "Projects/ProjectCardTag",
  decorators: [
    Story => (
      <ul className="flex gap-2">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof ProjectCardTag>

export default meta

type Story = StoryObj<typeof meta>

export const Personal: Story = {
  args: {
    tag: "personal",
  },
}

export const Academic: Story = {
  args: {
    tag: "academic",
  },
}

export const Freelance: Story = {
  args: {
    tag: "freelance",
  },
}

export const Bootcamp: Story = {
  args: {
    tag: "bootcamp",
  },
}

export const Group: Story = {
  args: {
    tag: "group",
  },
}

export const WIP: Story = {
  args: {
    tag: "wip",
  },
}

export const Deprecated: Story = {
  args: {
    tag: "deprecated",
  },
}

import type { Meta, StoryObj } from "@storybook/react-vite"

import ProjectCardLink from "~/components/projects/ProjectCardLink"

const meta = {
  component: ProjectCardLink,
  title: "Projects/ProjectCardLink",
  args: {
    isActive: false,
  },
  decorators: [
    Story => (
      <ul className="z-2 m-4 inline-flex h-min flex-col gap-2">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof ProjectCardLink>

export default meta

type Story = StoryObj<typeof meta>

export const Repository: Story = {
  args: {
    link: {
      type: "repository",
      href: "",
      polish: false,
    },
  },
}

export const LiveDemo: Story = {
  args: {
    link: {
      type: "livedemo",
      href: "",
      polish: false,
    },
  },
}

export const Documentation: Story = {
  args: {
    link: {
      type: "documentation",
      href: "",
      polish: false,
    },
  },
}

export const Download: Story = {
  args: {
    link: {
      type: "download",
      href: "",
      polish: false,
    },
  },
}

export const Publication: Story = {
  args: {
    link: {
      type: "publication",
      href: "",
      polish: false,
    },
  },
}

export const BlogPost: Story = {
  args: {
    link: {
      type: "blogpost",
      href: "",
      polish: false,
    },
  },
}

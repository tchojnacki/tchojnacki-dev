import type { Meta, StoryObj } from "@storybook/react-vite"

import TechSphereComponent from "~/components/home/landing/TechSphere"

const meta = {
  component: TechSphereComponent,
  title: "Home/Landing/TechSphere",
} satisfies Meta<typeof TechSphereComponent>

export default meta

type Story = StoryObj<typeof meta>

export const TechSphere: Story = {
  args: {
    skillNames: [
      "React",
      "TypeScript",
      "Python",
      "Rust",
      "Astro",
      "Next.js",
      "Tailwind CSS",
      "PostgreSQL",
      "MongoDB",
      "Docker",
    ],
  },
}

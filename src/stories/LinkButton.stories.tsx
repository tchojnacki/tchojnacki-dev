import type { Meta, StoryObj } from "@storybook/react-vite"

import LinkButton from "~/components/common/LinkButton"

const meta = {
  component: LinkButton,
  title: "Common/LinkButton",
} satisfies Meta<typeof LinkButton>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    href: "",
    children: "Link Button",
    size: "normal",
  },
}

export const Small: Story = {
  args: {
    href: "",
    children: "Link Button",
    size: "small",
  },
}

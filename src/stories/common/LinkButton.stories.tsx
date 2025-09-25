import type { Meta, StoryObj } from "@storybook/react-vite"

import LinkButtonComponent from "~/components/common/LinkButton"

const meta = {
  component: LinkButtonComponent,
  title: "Common/LinkButton",
} satisfies Meta<typeof LinkButtonComponent>

export default meta

type Story = StoryObj<typeof meta>

export const LinkButton: Story = {
  args: {
    href: "",
    children: "Link Button",
    size: "normal",
  },
}

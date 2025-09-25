import type { Meta, StoryObj } from "@storybook/react-vite"

import LinkComponent from "~/components/common/Link"

const meta = {
  component: LinkComponent,
  title: "Common/Link",
} satisfies Meta<typeof LinkComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Link: Story = {
  args: {
    href: "",
    children: "Link",
  },
}

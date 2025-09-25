import type { Meta, StoryObj } from "@storybook/react-vite"

import { Network } from "~/components/blog/post/neural-networks/experiment/domain"
import ObjectTreeComponent from "~/components/blog/post/ObjectTree"

const network = new Network(2, [4, 4, 1])

const meta = {
  component: ObjectTreeComponent,
  title: "Blog/Post/ObjectTree",
} satisfies Meta<typeof ObjectTreeComponent>

export default meta

type Story = StoryObj<typeof meta>

export const ObjectTree: Story = {
  args: {
    name: "model",
    value: network,
  },
}

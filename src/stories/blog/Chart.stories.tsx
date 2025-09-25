import type { Meta, StoryObj } from "@storybook/react-vite"

import Chart from "~/components/blog/post/Chart.tsx"

const meta = {
  component: Chart,
  title: "Blog/Post/Chart",
  decorators: [
    Story => (
      <div className="w-reading">
        <Story />
      </div>
    ),
  ],
  args: {
    xMin: -3,
    xMax: 5,
    yMin: -4,
    yMax: 1,
    defaultLineWidth: 0.02,
    defaultRadius: 0.05,
  },
} satisfies Meta<typeof Chart>

export default meta

type Story = StoryObj<typeof meta>

export const Line: Story = {
  args: {
    elements: [
      { type: "axes", tickSize: 0.05 },
      { type: "line", color: "orange", start: [-3, -3.374], end: [5, 0.411] },
    ],
  },
}

export const Scatter: Story = {
  args: {
    elements: [
      { type: "axes", tickSize: 0.05 },
      { type: "scatter", color: "orange", data: [[1, -1.48]] },
      {
        type: "scatter",
        color: "blue",
        data: [
          [3.1, -0.6],
          [-0.1, -1.9],
          [4, 0],
          [-2.1, -3],
        ],
      },
    ],
  },
}

export const Mixed: Story = {
  args: {
    elements: [
      { type: "axes", tickSize: 0.05 },
      { type: "line", color: "orange", start: [-3, -3.374], end: [5, 0.411] },
      { type: "scatter", color: "orange", data: [[1, -1.48]] },
      {
        type: "scatter",
        color: "blue",
        data: [
          [3.1, -0.6],
          [-0.1, -1.9],
          [4, 0],
          [-2.1, -3],
        ],
      },
    ],
  },
}

import type { Meta, StoryObj } from "@storybook/react-vite"

import NavLinkList from "~/components/common/nav/NavLinkList"

const meta = {
  component: NavLinkList,
  title: "Common/Nav/NavLinkList",
} satisfies Meta<typeof NavLinkList>

export default meta

type Story = StoryObj<typeof meta>

export const Desktop: Story = {
  args: {
    pathname: "",
    listClassName: "hidden sm:flex gap-16 mx-auto",
    itemClassName:
      "px-4 py-[calc(var(--spacing-nav-height)/8)] rounded-lg hover:bg-indigo-700/10 dark:hover:bg-indigo-300/10",
  },
  decorators: [
    Story => (
      <nav className="flex h-[var(--spacing-nav-height)] items-center justify-end p-[calc(var(--spacing-nav-height)/4)] leading-none">
        <Story />
      </nav>
    ),
  ],
}

export const Mobile: Story = {
  args: {
    pathname: "",
    listClassName: "mt-2",
    itemClassName: "px-4 py-2 text-xl text-right",
  },
  decorators: [
    Story => (
      <nav className="p-[calc(var(--spacing-nav-height)/4)]">
        <Story />
      </nav>
    ),
  ],
}

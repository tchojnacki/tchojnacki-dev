import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/react-vite"

import "../src/global.css"

export default {
  decorators: [
    withThemeByClassName({
      themes: {
        light: "bg-neudigo-50",
        dark: "dark bg-neudigo-950",
      },
      defaultTheme: "dark",
    }),
  ],
  parameters: {
    backgrounds: { disable: true },
  },
} satisfies Preview

import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/react-vite"

import "../src/global.css"
import "./storybook.css"

export default {
  decorators: [
    withThemeByClassName({
      themes: {
        light: "bg-neudigo-50 text-neutral-900",
        dark: "dark bg-neudigo-950 text-neutral-100",
      },
      defaultTheme: "dark",
    }),
  ],
  parameters: {
    backgrounds: { disable: true },
    controls: { disableSaveFromUI: true },
  },
} satisfies Preview

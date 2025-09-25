import type { StorybookConfig } from "@storybook/react-vite"

export default {
  stories: ["../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  addons: ["@storybook/addon-themes"],
  async viteFinal(config) {
    const { mergeConfig } = await import("vite")
    const { default: tsconfigPaths } = await import("vite-tsconfig-paths")
    const { default: tailwindcss } = await import("@tailwindcss/vite")
    return mergeConfig(config, {
      plugins: [tsconfigPaths(), tailwindcss()],
    })
  },
} satisfies StorybookConfig

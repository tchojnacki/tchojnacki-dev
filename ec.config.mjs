import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers"
import { createInlineSvgUrl, defineEcConfig } from "astro-expressive-code"

const COPY_SVG = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>`

export default defineEcConfig({
  defaultProps: {
    showLineNumbers: false,
  },
  frames: {
    extractFileNameFromCode: false,
  },
  plugins: [pluginLineNumbers()],
  styleOverrides: {
    codeFontSize: "0.875rem",
    codePaddingBlock: "0.5rem",
    codePaddingInline: "0.5rem",
    frames: {
      copyIcon: createInlineSvgUrl(COPY_SVG),
      shadowColor: "none",
    },
    textMarkers: {
      backgroundOpacity: "25%",
    },
  },
  useDarkModeMediaQuery: false,
})

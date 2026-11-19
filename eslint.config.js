// @ts-check

import eslint from "@eslint/js"
import vitest from "@vitest/eslint-plugin"
import astro from "eslint-plugin-astro"
import reactHooks from "eslint-plugin-react-hooks"
import storybook from "eslint-plugin-storybook"
import unicorn from "eslint-plugin-unicorn"
import { defineConfig, globalIgnores } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(["dist/", ".astro/", "coverage/", "storybook-static/"]),
  {
    linterOptions: { reportUnusedDisableDirectives: "error" },
    languageOptions: {
      parserOptions: { projectService: true },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  unicorn.configs.unopinionated,
  reactHooks.configs.flat["recommended-latest"],
  astro.configs.recommended,
  astro.configs["jsx-a11y-recommended"],
  // @ts-expect-error -- eslint-plugin-storybook types break under exactOptionalPropertyTypes
  storybook.configs["flat/recommended"],
  {
    files: ["**/*.test.ts"],
    extends: [vitest.configs.recommended],
    settings: { vitest: { typecheck: true } },
  },
  {
    files: ["**/*.astro"],
    languageOptions: { parserOptions: { projectService: false, project: true } },
  },
  {
    rules: {
      "no-console": "error",
      eqeqeq: "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
])

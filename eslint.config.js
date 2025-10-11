// @ts-check

import eslint from "@eslint/js"
import astro from "eslint-plugin-astro"
import reactHooks from "eslint-plugin-react-hooks"
import storybook from "eslint-plugin-storybook"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  {
    plugins: { "react-hooks": reactHooks },
    extends: ["react-hooks/recommended-latest"],
  },
  astro.configs.recommended,
  astro.configs["jsx-a11y-recommended"],
  storybook.configs["flat/recommended"],
  {
    rules: {
      "no-console": "warn",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-empty-function": "off",
    },
  },
  {
    ignores: ["!.storybook"],
  },
])

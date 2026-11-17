// @ts-check

/** @type {import("lint-staged").Configuration} */
export default {
  "*": "oxfmt --check --no-error-on-unmatched-pattern",
  "*.{js,jsx,ts,tsx,astro}": "eslint",
}

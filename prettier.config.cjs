// @ts-check

/** @type {import("prettier").Config} */
module.exports = {
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  printWidth: 100,
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}

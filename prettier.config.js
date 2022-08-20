// @ts-check

module.exports = {
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@trivago/prettier-plugin-sort-imports'),
  ],
  printWidth: 100,
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  importOrder: ['^(components|data|hooks|media|pages|shared|styles)', '^\\.{1,2}\\/'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}

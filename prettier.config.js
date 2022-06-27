// prettier.config.js
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  printWidth: 100,
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  importOrder: ['^@/', '^.{1,2}/'],
  importOrderSeparation: true,
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./{components,pages}/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // https://www.radix-ui.com/docs/colors/palette-composition/the-scales
    colors: {
      indigo: {
        4: '#1c274f',
        9: '#3e63dd',
        11: '#849dff',
      },
      slate: {
        11: '#9ba1a6',
        12: '#ecedee',
      },
      white: '#ffffff',
    },
    gridTemplateAreas: {
      'landing-desktop': ['text sphere', '. sphere', '. .'],
      'landing-mobile': ['text', 'sphere', '.'],
    },
    extend: {
      space: {
        'nav-height': '4rem',
      },
    },
  },
  plugins: [require('@savvywombat/tailwindcss-grid-areas')],
}

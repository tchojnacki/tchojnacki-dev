/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./{components,pages}/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      indigo: {
        11: '#849dff',
      },
      slate: {
        11: '#9ba1a6',
        12: '#ecedee',
      },
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

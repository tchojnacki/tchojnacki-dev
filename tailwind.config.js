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
      'pure-white': '#ffffff',
      'pure-black': '#000000',
    },
    gridTemplateAreas: {
      'landing-desktop': ['text sphere', '. sphere', '. .'],
      'landing-mobile': ['text', 'sphere', '.'],
    },
    extend: {
      spacing: {
        'nav-height': '4rem',
        'hamburger-size': '1.5rem',
      },
      keyframes: {
        errshake: {
          'from, to': { transform: 'none' },
          '25%': { transform: 'rotate(-10deg)' },
          '75%': { transform: 'rotate(10deg)' },
        },
        emojiwave: {
          'from, to': { transform: 'none' },
          '25%': { transform: 'rotate(-30deg)' },
          '75%': { transform: 'rotate(30deg)' },
        },
      },
      animation: {
        errshake: 'errshake 200ms 600ms',
        emojiwave: 'emojiwave 1s ease-in-out',
      },
    },
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas'),
    require('tailwindcss/plugin')(function ({ addVariant }) {
      addVariant('pseudo', ['&::before', '&::after'])
    }),
  ],
}

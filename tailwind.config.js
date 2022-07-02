// @ts-check

const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/{components,pages}/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    // https://www.radix-ui.com/docs/colors/palette-composition/the-scales
    colors: {
      indigo: {
        2: '#15192d',
        4: '#1c274f',
        9: '#3e63dd',
        11: '#849dff',
      },
      slate: {
        1: '#151718',
        3: '#202425',
        7: '#3a3f42',
        11: '#9ba1a6',
        12: '#ecedee',
      },
      'pure-white': '#ffffff',
      'pure-black': '#000000',
    },
    fontWeight: {
      normal: 400,
      bold: 600,
    },
    gridTemplateAreas: {
      'landing-desktop': ['text sphere', '. sphere', '. .'],
      'landing-mobile': ['text', 'sphere', '.'],
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
      enteronload: {
        from: {
          opacity: 0,
          transform: 'var(--enter-transform, none)',
        },
        to: {
          opacity: 1,
          transform: 'none',
        },
      },
    },
    animation: {
      none: 'none',
      errshake: 'errshake 200ms 600ms',
      emojiwave: 'emojiwave 1s ease-in-out',
      enteronload: 'enteronload 400ms ease-in forwards',
    },
    extend: {
      spacing: {
        'nav-height': '4rem',
      },
    },
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas'),
    plugin(({ addVariant }) => {
      addVariant('pseudo', ['&::before', '&::after'])
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.onenter-fromleft': {
          '--enter-transform': 'translateX(-50px)',
        },
        '.onenter-fromtop': {
          '--enter-transform': 'translateY(-50px)',
        },
        '.onenter-fromright': {
          '--enter-transform': 'translateX(50px)',
        },
        '.onenter-scaling': {
          '--enter-transform': 'scale(0.75)',
        },
      })
    }),
  ],
}

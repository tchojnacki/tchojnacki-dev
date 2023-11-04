// @ts-check

import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'
import gridAreas from '@savvywombat/tailwindcss-grid-areas'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    // https://www.radix-ui.com/docs/colors/palette-composition/the-scales
    colors: {
      indigo: {
        2: '#15192d',
        4: '#1c274f',
        8: '#2f4eb2',
        11: '#c2ceff',
      },
      slate: {
        3: '#202425',
        8: '#4c5155',
        11: '#9ba1a6',
        12: '#ecedee',
      },
      pure: {
        black: '#000000',
        white: '#ffffff',
      },
    },
    fontFamily: {
      sans: ['"Inter Variable"', 'Inter', ...defaultTheme.fontFamily.sans],
    },
    fontWeight: {
      normal: '400',
      bold: '600',
    },
    gridTemplateAreas: {
      'landing-desktop': ['. text sphere .', '. . sphere .', '. . . .'],
      'landing-mobile': ['text', 'sphere', '.'],
      'featured-project-normal': ['buttons .'],
      'featured-project-flipped': ['. buttons'],
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
          opacity: '0',
          transform: 'var(--enter-transform, none)',
        },
        to: {
          opacity: '1',
          transform: 'none',
        },
      },
      scrollprojectimage: {
        from: {
          marginTop: '0',
        },
        to: {
          marginTop: 'var(--max-image-scroll, 0)',
        },
      },
    },
    animation: {
      none: 'none',
      errshake: 'errshake 200ms 600ms',
      emojiwave: 'emojiwave 1s ease-in-out',
      enteronload: 'enteronload 500ms ease-out',
      scrollprojectimage: 'scrollprojectimage 5s ease-in-out alternate infinite',
    },
    extend: {
      spacing: {
        'nav-height': '4rem',
      },
    },
  },
  plugins: [
    /** @type {any} */ (gridAreas),
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

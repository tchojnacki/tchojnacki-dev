// @ts-check

import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'
import gridAreas from '@savvywombat/tailwindcss-grid-areas'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    colors: {
      neutral: {
        0: '#ffffff',
        // 50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        // 300: '#d4d4d4',
        400: '#a3a3a3',
        // 500: '#737373',
        600: '#525252',
        // 700: '#404040',
        800: '#262626',
        900: '#171717',
        // 950: '#0a0a0a',
        1000: '#000000',
      },
      indigo: {
        // 50: '#eef2ff',
        // 75: '#e7edff',
        100: '#e0e7ff',
        // 200: '#c7d2fe',
        300: '#a5b4fc',
        // 400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        // 800: '#3730a3',
        // 900: '#312e81',
        925: '#282566',
        // 950: '#1e1b4b',
      },
      neudigo: {
        50: '#f7f9ff',
        950: '#14122b',
      },
      purple: {
        300: '#d8b4fe',
        700: '#7e22ce',
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

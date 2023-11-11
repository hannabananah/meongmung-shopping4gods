import colors from 'tailwindcss/colors';
import flowbitePlugin from 'flowbite/plugin';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.html',
    './pages/**/*.js',
    './node_modules/flowbite/**/*.js',
    './dist/*.{html,js}',
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      stone: colors.stone,
      sky: colors.sky,
      neutral: colors.neutral,
      gray: colors.gray,
      slate: colors.slate,
      zinc: colors.zinc,
      teal: colors.teal,
    },
  },
  plugins: [flowbitePlugin],
};

import flowbitePlugin from 'flowbite/plugin';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.html',
    './pages/**/*.js',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      'zinc-400': '#999',
      'teal-500': '#009688',
      'teal-600': '#00897B',
    },
  },
  plugins: [flowbitePlugin],
};

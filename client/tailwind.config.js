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
  },
  plugins: [flowbitePlugin],
};

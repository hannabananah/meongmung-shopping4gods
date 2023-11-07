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
      'setting-btn': '#00A4AC',
      'setting-btn-effect': '#009599',
    },
  },
  plugins: [flowbitePlugin],
};

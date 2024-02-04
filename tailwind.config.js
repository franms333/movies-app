/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill-md': 'repeat(auto-fill, minmax(200px, 1fr))',
        'auto-fill-sm': 'repeat(auto-fill, minmax(150px, 1fr))',
      },
      screens: {
        'xs': '300px',
        ...defaultTheme.screens,
      }
    },
  },
  plugins: [require("daisyui")],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        islamic: {
          green: '#1a6b3a',
          'green-light': '#2d9653',
          'green-dark': '#0f4423',
          gold: '#c9a84c',
          'gold-light': '#e2c46b',
          'gold-dark': '#a07c2d',
          cream: '#f5f0e8',
          'cream-dark': '#ede5d0',
        },
      },
      fontFamily: {
        arabic: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}


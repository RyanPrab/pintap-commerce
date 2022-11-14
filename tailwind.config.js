/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        header: '#044599',
        body: '#e0e9f5'
      })
    },
  },
  plugins: [],
}

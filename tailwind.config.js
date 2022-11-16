/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#044599',
        secondary: '#95bcf0'
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        header: '#044599',
        body: '#e0e9f5',
        success: '#1ad1b9',
        error: '#690000'
      })
    },
  },
  plugins: [],
}

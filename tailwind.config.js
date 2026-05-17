/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        premium: '0 30px 120px rgba(37, 99, 235, 0.18)'
      }
    },
  },
  plugins: [],
}

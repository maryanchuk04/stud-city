/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'md': '0 3px 10px rgba(0, 0, 0, 0.5)',
      },
      colors: {
        "primaryAuthentication": '#453e35',
        "primatyWhite": "#f9fcf8",
        "primaryRegistration": "#817566"
      }
    }
  },
  plugins: [],
}

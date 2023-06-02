/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "pet-pattern": "url('../public/assets/svg/pet_pattern_bg.svg')",
      },
      boxShadow: {
        "reverse": "0 -1px 3px 0 rgb(0 0 0 / 0.1), 0 -1px 2px -1px rgb(0 0 0 / 0.1)",
      },
      colors: {
        "primary-container": "#ffde25",
        "secondary-container": "#ede2bc",
        "tertiary-container": "#d1e4ff",
        "background": "#fefbff",
        "surface": "#fffbff",
        "surface-variant": "#e9e2d0",
        "white": "#ffffff",
        "black": "#1e1e1e",
      },
      dropShadow: {
        "drop-shadow-md-reverse": "drop-shadow(0 -4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 -2px 2px rgb(0 0 0 / 0.06))",
      },
      fontFamily: {
        sans: "Nunito Sans, sans-serif",
      },
      maxWidth: {
        "full-x-4": "calc(100% - theme('spacing.4'))",
        "full-x-12": "calc(100% - theme('spacing.12'))",
        "full-x-24": "calc(100% - theme('spacing.24'))",
      },
    },
  },
  plugins: [],
}

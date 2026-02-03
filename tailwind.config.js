/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed",
        secondary: "#00d2ff",
        accent: "#ff00cc",
        background: "#070816",
      },
      fontFamily: {
        sans: ["var(--font-space)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

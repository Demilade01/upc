// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // paths to all JS/TS files in `pages` directory
    "./components/**/*.{js,ts,jsx,tsx}", // paths to all JS/TS files in `components` directory
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        mainBg: "url('../public/images/main-bg.png')",
      },
      fontFamily: {
        Rammetto: "'Rammetto One', sans-serif",
        inter: "'Inter', sans-serif",
      },

      colors: {
        primary: "#CE402A",
        secondary: "#FF7A00",
        black: {
          DEFAULT: "#000000",
          700: "#282828",
          900: "#121213",
        },
        gray: {
          450: "#B5B5B5",
        },
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          default: "1280px",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("@tailwindcss/forms")],
};

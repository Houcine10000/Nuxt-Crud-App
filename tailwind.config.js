const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    extend: { fontFamily: { sans: ["Roboto"] } },
  },

  colors: {
    primary: {
      DEFAULT: colors.orange[500],
      ...colors.orange,
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "4/5": "4 / 5",
      },
      colors: {
        rose: "#EC516B",
        taupe: "#A8918D",
        almostBlack: "#2D2D2D",
        cream: "#EFE8DF",
        mint: "#D8EFDE",
        offWhite: "#F8F8F7",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

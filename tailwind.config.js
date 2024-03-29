/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Questrial", "serif"],
      h: ["DM Serif Display", "serif"],
    },
    screens: {
      xxs: "250px",
      // => @media (min-width: 300px) { ... }

      xs: "375px",
      // => @media (min-width: 300px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      aspectRatio: {
        "4/5": "4 / 5",
        "5/6": "5 / 6",
        "7/8": "7 / 8",
        "11/12": "11 / 12",
      },
      padding: {
        "28r": "28rem",
        "34r": "34rem",
        "44r": "44rem",
        "54r": "54rem",
      },
      colors: {
        rose: "#EC516B",
        taupe: "#A8918D",
        almostBlack: "#2D2D2D",
        cream: "#EFE8DF",
        mint: "#D8EFDE",
        offWhite: "#F8F8F7",
        UCgrey: "#f1f1ef",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

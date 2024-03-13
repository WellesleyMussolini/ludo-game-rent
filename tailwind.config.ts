import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        showAlert: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "40%": { transform: "translateX(10%)", opacity: "0.5" },
          "80%, 100%": { transform: "translateX(20px)", opacity: "1" },
        },
        hideAlert: {
          "0%": { transform: "translateX(20px)" },
          "40%": { transform: "translateX(10%)" },
          "80%, 100%": { opacity: "0", PointerEvent: "none", transform: "translateX(-100%)" },
        },
      },
      animation: {
        showAlert: "showAlert 1s ease forwards",
        hideAlert: "hideAlert 1s ease forwards",
      },
      boxShadow: {
        cardName: "2px 2px 2px rgba(0,0,0,.1)",
        cardShadow: "0 0 1rem rgba(0,0,0,.15)!important"
      },
    },
    colors: {
      primary: "#1cb36e",
      secondary: "#009DFF",
      disabled: "#626262",
      white: "#fff",
      black: "#000",
      background: "#EDF0F2",
      ...colors,
    }
  },
  plugins: [require('tailwindcss-animated')],
};

export default config;


// gray: "#00000080",
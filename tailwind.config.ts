import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1f1f1f",
        foreground: "#ffffff",
        copy: "#919191",
        card: "#2a2a2a",
        "card-hover": "#333333",
        border: "#3a3a3a",
        primary: {
          DEFAULT: "#3b82f6",
          hover: "#2563eb",
        },
        secondary: {
          DEFAULT: "#8b5cf6",
          hover: "#7c3aed",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
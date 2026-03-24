import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f3efe4",
        ink: "#151515",
        sunrise: "#ff785a",
        wave: "#0f6c7b",
        moss: "#5f7f41",
        error: "#ef4444",
        success: "#22c55e",
      },
      boxShadow: {
        card: "0 20px 45px -28px rgba(15, 108, 123, 0.45)",
        "card-dark": "0 20px 45px -28px rgba(88, 166, 255, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;

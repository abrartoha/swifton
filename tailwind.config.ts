import type { Config } from "tailwindcss";

/**
 * Swifton Group design tokens.
 * Palette expresses a "mother of the group" identity:
 *  - Midnight navy   → authority, trust, the anchor brand
 *  - Warm gold       → heritage, quality, the accent that ties the family together
 *  - Warm neutrals   → clean, elegant breathing room
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f2f5f9",
          100: "#e2e9f1",
          200: "#c3d2e2",
          300: "#96b0cb",
          400: "#6285ad",
          500: "#436592",
          600: "#345078",
          700: "#2b4062",
          800: "#213551",
          900: "#0f2542", // primary brand navy
          950: "#08182d",
        },
        gold: {
          50: "#fbf8ef",
          100: "#f5edd3",
          200: "#ecd9a6",
          300: "#e0be6f",
          400: "#d6a747",
          500: "#c9a24b", // accent gold
          600: "#a67e37",
          700: "#845f2f",
          800: "#6f4d2c",
          900: "#5f4128",
        },
        sand: {
          50: "#fdfcfa",
          100: "#f7f4ee",
          200: "#efe9dd",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      boxShadow: {
        elegant: "0 1px 2px rgba(15,37,66,0.04), 0 12px 32px -12px rgba(15,37,66,0.16)",
      },
    },
  },
  plugins: [],
};

export default config;

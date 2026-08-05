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
          50: "#f0f4f8",
          100: "#dae3ee",
          200: "#b8c9de",
          300: "#8ba7c7",
          400: "#5c80aa",
          500: "#3d6390",
          600: "#2e4e78",
          700: "#253f62",
          800: "#1c3350",
          900: "#1a2d5a", // logo navy — the deep blue from the wordmark
          950: "#0d1a36",
        },
        gold: {
          50: "#fef9ec",
          100: "#fbefc9",
          200: "#f7df8f",
          300: "#f2c94c",
          400: "#f0b429", // logo orange-gold
          500: "#e09b13",
          600: "#c6780e",
          700: "#a55610",
          800: "#874413",
          900: "#703814",
        },
        brand: {
          red: "#e52528",     // logo red figure
          orange: "#f7a823",  // logo orange figure
          green: "#8dc63f",   // logo green figure
          blue: "#00aeef",    // logo blue figure
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
        "brand-glow": "0 4px 24px -4px rgba(0,174,239,0.25)",
        "brand-glow-red": "0 4px 24px -4px rgba(229,37,40,0.2)",
        "brand-glow-orange": "0 4px 24px -4px rgba(247,168,35,0.25)",
        "brand-glow-green": "0 4px 24px -4px rgba(141,198,63,0.2)",
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in-down": "fade-in-down 0.5s ease-out both",
        "fade-in": "fade-in 0.6s ease-out both",
        "scale-in": "scale-in 0.5s ease-out both",
        "slide-in-left": "slide-in-left 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-right": "slide-in-right 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "color-cycle": "color-cycle 8s linear infinite",
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.92)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-32px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(32px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "color-cycle": {
          "0%": { color: "#e52528" },
          "25%": { color: "#f7a823" },
          "50%": { color: "#8dc63f" },
          "75%": { color: "#00aeef" },
          "100%": { color: "#e52528" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-source-serif)", "Georgia", "serif"],
        ui: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-fira-code)", "monospace"],
      },
      colors: {
        parchment: {
          base: "#faf7f2",
          surface: "#f5f0e8",
          elevated: "#ffffff",
          border: "#d4c9b0",
          text: "#1a1208",
          muted: "#6b5c42",
          faint: "#a8957a",
        },
        ink: {
          base: "#0d0e14",
          surface: "#13141c",
          elevated: "#1a1c28",
          border: "#2a2d3e",
          text: "#f0ead8",
          muted: "#8a8299",
          faint: "#4a4660",
        },
        accent: {
          sienna: "#8b4513",
          "sienna-dark": "#d4955a",
          forest: "#2c5f2e",
          "forest-dark": "#4a9e6b",
          gold: "#c9a84c",
          "gold-dark": "#e8c96a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "scroll-left": "scroll-left 40s linear infinite",
        "fade-up": "fade-up 0.6s ease-out",
        shimmer: "shimmer 2s infinite linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

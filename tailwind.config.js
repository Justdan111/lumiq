/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0E1A",
          secondary: "#111827",
          card: "#0F1626",
          elevated: "#161D2E",
        },
        amber: {
          DEFAULT: "#F5A623",
          light: "#FFB940",
          dim: "rgba(245,166,35,0.25)",
          muted: "rgba(245,166,35,0.12)",
          glow: "rgba(245,166,35,0.15)",
        },
        category: {
          science: "#F5A623",
          history: "#2DD4BF",
          philosophy: "#A78BFA",
          tech: "#60A5FA",
          psychology: "#F472B6",
        },
        content: {
          primary: "#F0F4FF",
          secondary: "#8892A4",
          muted: "#4A5568",
        },
        save: "#34D399",
        skip: "#F87171",
      },
    },
  },
  plugins: [],
}
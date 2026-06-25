import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        card: "#1a1a1a",
        "card-foreground": "#ffffff",
        border: "#333333",
        muted: "#666666",
        "muted-foreground": "#888888",
      },
      spacing: {
        "safe": "max(1rem, env(safe-area-inset-bottom))",
      },
    },
  },
  plugins: [],
}

export default config

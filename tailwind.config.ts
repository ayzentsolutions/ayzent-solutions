import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem" },
    extend: {
      colors: {
        ink: "#080D18",
        paper: "#E2E8F0",
        graphite: "#94A3B8",
        gold: { DEFAULT: "#477BFF", light: "#6792FF" },
        line: { DEFAULT: "var(--line)" },
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        surface: "var(--surface)",
        electric: "#477BFF",
        teal: "#25C6B7",
        midnight: "#080D18",
        ivory: "#E2E8F0"
      },
      fontFamily: { display: ["var(--font-display)", "serif"], sans: ["var(--font-sans)", "sans-serif"] },
      maxWidth: { content: "76rem" },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "orbit": { to: { transform: "rotate(360deg)" } }
      },
      animation: { "fade-up": "fade-up 0.7s cubic-bezier(.2,.75,.25,1) forwards",  }
    }
  },
  plugins: []
};
export default config;

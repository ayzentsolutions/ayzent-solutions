import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem" },
    extend: {
      colors: {
        ink: "#08152B",
        paper: "#F5F1E8",
        graphite: "#647087",
        gold: { DEFAULT: "#246BFF", light: "#66A0FF" },
        line: { DEFAULT: "var(--line)" },
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        surface: "var(--surface)",
        electric: "#246BFF",
        teal: "#2ED3C2",
        midnight: "#08152B",
        ivory: "#F5F1E8"
      },
      fontFamily: { display: ["var(--font-display)", "serif"], sans: ["var(--font-sans)", "sans-serif"] },
      maxWidth: { content: "76rem" },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "orbit": { to: { transform: "rotate(360deg)" } }
      },
      animation: { "fade-up": "fade-up 0.7s cubic-bezier(.2,.75,.25,1) forwards", "orbit-slow": "orbit 28s linear infinite" }
    }
  },
  plugins: []
};
export default config;

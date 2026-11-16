/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        raised: "var(--color-raised)",
        hairline: "var(--color-hairline)",
        bone: "var(--color-bone)",
        ash: "var(--color-ash)",
        ember: "var(--color-ember)",
        paper: "var(--color-paper)"
      },
      fontFamily: {
        serif: ["Instrument Serif", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      animation: {
        "pulse-subtle": "pulseSubtle 2.4s ease-in-out infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite"
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.92)" }
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        }
      }
    }
  },
  plugins: []
};

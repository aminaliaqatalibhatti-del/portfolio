import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050816",
          900: "#071426",
          800: "#0F172A",
          700: "#1E293B",
          600: "#334155",
        },
        brand: {
          blue:    "#3B82F6",
          cyan:    "#06B6D4",
          purple:  "#8B5CF6",
          indigo:  "#6366F1",
          "blue-light":  "#60A5FA",
          "cyan-light":  "#67E8F9",
        },
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:  ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow":        "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.25), transparent)",
        "card-glass":       "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
      },
      animation: {
        "float":          "float 6s ease-in-out infinite",
        "pulse-slow":     "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "shimmer":        "shimmer 2.5s linear infinite",
        "spin-slow":      "spin 20s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "border-flow":    "borderFlow 4s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        borderFlow: {
          "0%":   { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      boxShadow: {
        "glow-blue":   "0 0 20px rgba(59,130,246,0.4), 0 0 60px rgba(59,130,246,0.1)",
        "glow-cyan":   "0 0 20px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.1)",
        "glow-purple": "0 0 20px rgba(139,92,246,0.4), 0 0 60px rgba(139,92,246,0.1)",
        "card":        "0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset",
        "card-hover":  "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.3)",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};

export default config;

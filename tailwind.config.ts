import type { Config } from "tailwindcss";

/**
 * GreenSphere design system.
 * Palette is intentionally restrained: deep forest greens, dark olive,
 * warm sand accent, near-black ink on paper/mist backgrounds.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#EEF4F0",
          100: "#D6E5DC",
          200: "#AEC9BA",
          300: "#7FA890",
          400: "#4F8467",
          500: "#2E6A4C",
          600: "#1F513A",
          700: "#173F2D",
          800: "#102D20",
          900: "#0B1F16",
          950: "#06120C",
        },
        olive: {
          400: "#7A7A54",
          500: "#5E5E3F",
          600: "#474730",
          700: "#353525",
        },
        sand: {
          50: "#FAF6EE",
          100: "#F2E9D8",
          200: "#E4D3B4",
          300: "#D3BC8F",
          400: "#C2A46C",
          500: "#B08D4E",
        },
        ink: {
          DEFAULT: "#0C1210",
          soft: "#20282400",
        },
        paper: "#FFFFFF",
        mist: "#F5F7F5",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
      },
      fontSize: {
        // Fluid display sizes for oversized section titles
        "display-sm": ["clamp(2.25rem, 4vw, 3.25rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2.75rem, 6vw, 4.75rem)", { lineHeight: "1.0", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(3.25rem, 8vw, 7rem)", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(3.75rem, 10vw, 9rem)", { lineHeight: "0.94", letterSpacing: "-0.045em" }],
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      spacing: {
        section: "clamp(5rem, 10vw, 9rem)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(12,18,16,0.04), 0 8px 24px -12px rgba(12,18,16,0.10)",
        lift: "0 24px 60px -24px rgba(12,18,16,0.28)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(12,18,16,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(12,18,16,0.05) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

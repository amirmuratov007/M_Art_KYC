import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#06080d",
        graphite: "#111827",
        steel: "#9ca3af",
        cyanice: "#7dd3fc",
        gold: "#c6a15b",
      },
      boxShadow: {
        glow: "0 0 70px rgba(125, 211, 252, 0.18)",
      },
      backgroundImage: {
        'radial-cinematic': 'radial-gradient(circle at 20% 10%, rgba(125,211,252,.18), transparent 30%), radial-gradient(circle at 85% 20%, rgba(198,161,91,.12), transparent 28%), linear-gradient(135deg, #06080d 0%, #0b1220 45%, #050609 100%)'
      }
    },
  },
  plugins: [],
};
export default config;

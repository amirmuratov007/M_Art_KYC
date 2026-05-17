/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["Manrope", "Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        ink: "#05070B",
        graphite: "#0B0F17",
        platinum: "#DCE3EA",
        steel: "#7E8B99",
        signal: "#7AA7FF",
        frost: "rgba(255,255,255,0.08)",
      },
      boxShadow: {
        premium: "0 30px 120px rgba(0,0,0,.45)",
        glow: "0 0 80px rgba(122,167,255,.18)",
      },
      backgroundImage: {
        'radial-premium': 'radial-gradient(circle at top left, rgba(122,167,255,.26), transparent 34%), radial-gradient(circle at 80% 20%, rgba(255,255,255,.10), transparent 28%), linear-gradient(135deg, #05070B 0%, #0B0F17 50%, #111827 100%)',
      },
    },
  },
  plugins: [],
};

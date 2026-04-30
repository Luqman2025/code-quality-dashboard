/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["\"Space Grotesk\"", "sans-serif"]
      },
      colors: {
        ink: "#0f172a",
        mist: "#e2e8f0",
        teal: "#0f766e",
        amber: "#f59e0b",
        coral: "#f97316",
        lagoon: "#0ea5a4"
      },
      boxShadow: {
        card: "0 20px 40px rgba(15, 23, 42, 0.12)"
      }
    }
  },
  plugins: []
};

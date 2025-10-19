/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        // Page transitions
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "fade-out": "fadeOut 0.3s ease-in forwards",
        // Modal transitions
        "modal-in": "modalFadeIn 0.3s ease-out forwards",
        "modal-out": "modalFadeOut 0.3s ease-in forwards",
      },
    },
  },
  plugins: [],
};

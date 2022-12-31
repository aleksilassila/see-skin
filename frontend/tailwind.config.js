/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./app/**/*.{js,jsx,ts,tsx}"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages.old/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

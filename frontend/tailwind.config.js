/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      loader: "#6B46C1",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

import tailwindScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'xxl': '1600px',
      },
    },
  },
  plugins: [tailwindScrollbar({ nocompatible: true })]
};

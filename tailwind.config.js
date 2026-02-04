/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sidebar-bg': '#f8f9fa',
        'sidebar-active': '#e3f2fd',
        'card-bg': '#f5f5f5',
      },
    },
  },
  plugins: [],
}



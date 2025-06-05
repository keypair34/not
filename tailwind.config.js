/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Add utility for overscroll-behavior to prevent bounce scroll
      overscrollBehavior: {
        none: 'none',
      },
    },
  },
  plugins: [],
}


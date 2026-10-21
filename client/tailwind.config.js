/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#0d0d0d',
        'surface-subtle': '#141414',
        'surface-card': '#161616',
        'surface-border': '#222222',
        accent: '#BDA773', // Elegant Metallic Gold / Bronze Sand
        'accent-hover': '#cbba88',
        'text-primary': '#ffffff',
        'text-secondary': '#9e9e9e',
        'text-muted': '#666666',
      },
      fontFamily: {
        serif: [
          '"Source Serif 4"',
          'kepler-std',
          'Georgia',
          '"Times New Roman"',
          'serif',
        ],
        sans: [
          '"Plus Jakarta Sans"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      borderRadius: {
        'jameson': '20px',
      },
      maxWidth: {
        'site': '1500px',
      },
    },
  },
  plugins: [],
}

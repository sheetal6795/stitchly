/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        couture: {
          950: '#09090D',
          900: '#111118',
          850: '#171722',
          800: '#1F202E',
          700: '#2D2E40',
          600: '#43455E',
          400: '#8E90A6',
          300: '#B4B6C8',
          200: '#DCDDE8',
          100: '#F1F1F6',
          50: '#FAF9F6',
        },
        gold: {
          400: '#E6C673',
          500: '#D4AF37',
          600: '#B89428',
          700: '#91721A',
        },
        champagne: {
          100: '#FBF6EE',
          200: '#F4E9D5',
          300: '#EBD8B8',
          400: '#DFBF92',
          500: '#CFA468',
        },
        emerald: {
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px -5px rgba(212, 175, 55, 0.25)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4B6EF5',
          dark: '#3D5CE0',
          light: '#E8EDFF',
          pale: '#F0F4FF',
        },
        pending: {
          bg: '#FFE8E8',
          icon: '#F87171',
        },
        complete: {
          bg: '#E8EDFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(75, 110, 245, 0.08)',
        fab: '0 8px 24px rgba(75, 110, 245, 0.35)',
      },
    },
  },
  plugins: [],
}

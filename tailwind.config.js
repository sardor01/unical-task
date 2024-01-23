/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      aria: {
        'current-page': 'current="page"',
        loading: 'loading="true"',
      },
      colors: {
        primary: {
          light: '#1c2a68',
          DEFAULT: '#0e1534',
        },
        secondary: {
          light: '#f27a46',
          DEFAULT: '#f06225',
          dark: '#e95110',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};

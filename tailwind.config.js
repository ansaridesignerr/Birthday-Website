/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cherry: '#8F1538', deep: '#64152F', purple: '#60318D', plum: '#24152F',
        pink: '#F5B8CE', lav: '#DCC5F2', cream: '#FFF3EC',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        hand: ['"Dancing Script"', '"Segoe Script"', 'cursive'],
      },
    },
  },
  plugins: [],
};

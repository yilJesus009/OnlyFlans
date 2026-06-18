/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#202124',
        paper: '#f7f3ee',
        flan: '#f2b84b',
        berry: '#a23d5a',
        mint: '#4a8f77'
      }
    }
  },
  plugins: []
};

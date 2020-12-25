module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fira Sans', 'sans-serif'],
        serif: ['Fira Sans', 'serif'],
        monospace: ['Fira Sans', 'monospace'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

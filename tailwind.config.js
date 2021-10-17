module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: { green: { DEFAULT: '#8aa79d' }, white: { DEFAULT: '#fff' } },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

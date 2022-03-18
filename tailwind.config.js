module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary-dark': '#1913AE',
        'secondary-dark': '#005691',
        'primary-light': '#E8F1F5',
        'secondary-light': '#FAFAFA',
        'gray': '#C1C1C1',
        'gray-600': '#C1C1C1',
      },
      gridTemplateColumns: {
        'layout-desktop': '18rem 1fr',
      },
      gridTemplateRows: {
        'layout-desktop': '4rem 300px 1fr 4rem',
      },
      screens: {
        xs: '424px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

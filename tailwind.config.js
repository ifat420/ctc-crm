module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        

        // Complex site-specific column configuration
        'footer': '400px 1fr',
        'default': 'minmax(300px,20%) 1fr',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

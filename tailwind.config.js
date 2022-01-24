module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {

    screens: {
      // 'tablet': '640px',
      // // => @media (min-width: 640px) { ... }

      // 'laptop': '1024px',
      // // => @media (min-width: 1024px) { ... }
      'sm': '640px',

      'desktop': '1240px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        

        // Complex site-specific column configuration
        'default': '340px 1fr',
        'medium' : '1fr'
        
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

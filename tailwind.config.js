module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {

    screens: {
    
      'sm': '640px',
      'md': '760px',
      'desktop': '1240px',
      
    },
    extend: {
      
        gridTemplateColumns: {
          
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

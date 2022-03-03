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
        'medium': '1fr'
      },
      colors: {
        'primary': '#2DE5A7ED',
        'secondary': '#FFFFFF99',
        'secondary-l': '#FFFFFF4D',
        'line': '#00000013',
        'available': '#EFEFEF',
        'available-dark': '#8A8A8A',
        'used': '#FEB877'
      },
      boxShadow: {
        'gbtn': '0px 3px 7px 0px #0000000D',
        'hdr': '0px 2px 8px 0px #0000000F'
      },
      padding: {
        'full': '100%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

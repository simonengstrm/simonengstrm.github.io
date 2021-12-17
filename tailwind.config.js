module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors : {
        canvas: "#181A1B",
        standard: "#E8E6E3",
        divider: "#363B3D",
        java: "#F29111",
        haskell: "#483870",
        typescript: "#2F74C0",
        javascript: "#EFD81D",
        css: "#254BDD"
      }
    },

    fontFamily: {
        'sans': ['Roboto','sans-serif'],
        'serif': ['Roboto Slab','serif']
    }
  },

  plugins: [],
}
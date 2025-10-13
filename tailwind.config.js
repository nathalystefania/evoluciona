/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{html,ts,json,sass,scss}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00539f',
        orange: '#EE7F00',
        gray: '#4D4D4D',
        'extra-light-gray': '#F0F0F0',
        'light-gray': '#BBBBBB',
        'medium-gray': '#575757',
        secondary: '#00a7e3',
        white: '#FFFFFF',
        // conservar la paleta de `red` (y otras) si la necesitas
        red: colors.red,
      },
      container: {
        center: true,
      },
      textColor: {
        primary: '#00539f',
        orange: '#EE7F00',
        gray: '#4D4D4D',
        'extra-light-gray': '#F0F0F0',
        'light-gray': '#BBBBBB',
        secondary: '#00a7e3',
        white: '#FFFFFF'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' }) // o 'base' según prefieras
  ]
}

/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')


module.exports = {
  content: [
    "./src/**/*.{html,ts,json, sass, scss}" 
  ],
  theme: {
    colors:{
      'primary' : '#00539f',
      'orange' : '#EE7F00',
      'gray' : '#4D4D4D',
      'extra-light-gray' : '#F0F0F0',
      'light-gray' : '#BBBBBB',
      'medium-gray' : '#575757',
      'secondary' : '#00a7e3',
      'white' : "#FFFFFF"
    },
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary' : '#00539f', //Azul oscuro header & Textos Azul header 
        'orange' : '#EE7F00', //Naranja header 
        'gray' : '#4D4D4D', //Gris textos sobre blanco body & Footer gris 
        'extra-light-gray' : '#F0F0F0', //textos blancos sobre footer gris 
        'light-gray' : '#BBBBBB', //Iconos logo gris sobre footer gris 
        'secondary' : '#00a7e3', //Azul celeste contáctanos 
      }),
      textColor: {
        'primary' : '#00539f',
        'orange' : '#EE7F00',
        'gray' : '#4D4D4D',
        'extra-light-gray' : '#F0F0F0',
        'light-gray' : '#BBBBBB',
        'secondary' : '#00a7e3',
        'white': '#FFFFFF'
      },
      container: {
        center: true,
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
  ],
}

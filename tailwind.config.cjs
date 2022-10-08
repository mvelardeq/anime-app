/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          500:'#1A7BE5'
        },
        success:{
          500:'#9CD323'
        },
        error:{
          500:'#FF4423'
        },
        warning:{
          500:'#FFC73A'
        },
        info:{
          500:'#0965a6',
        },
        secondary:{
          500:'#1F1F1F',
          400:"#282828",
          300:'#575757',
          200:'#D9D9D9'
        },
        bgmain:'#F6F7F9',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
  darkMode: 'class',
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-brown': "#843802",
        'medium-brown': "#B46C22",
        'light-brown': "#CE8E47",
        'white-brown':"#ECD1A5"
      },
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
        'nanum': ['Nanum Gothic', 'sans-serif']
      }
    },
  },
  plugins: [],
}

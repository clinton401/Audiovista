/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        tGray: '#A1AAA1 ',
        spotify: "#1ed760"
      },
      screens: {
        watch: '270px',
        miniScreen: '300px',
        iphone6: '400px',
        ipad: '1000px'
      },
      fontSize: {
        ssm: '10px'
      },
      fontFamily: {
        nunito: ["poppins ", 'sans-serif'],
        Montserrat: [ "Montserrat", 'sans-serif']
      }

    },
  },
  plugins: [],
}


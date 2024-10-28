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
        spotify: "#1ed760",
        customRed: {
          DEFAULT: '#FF4136',
          light: 'rgba(255, 65, 54, 0.2)',
        },
        customOrange: {
          DEFAULT: '#FF851B',
          light: 'rgba(255, 133, 27, 0.2)',
        },
        customMagenta: {
          DEFAULT: '#85144B',
          light: 'rgba(133, 20, 75, 0.2)',
        },
        customYellow: {
          DEFAULT: '#FFDC00',
          light: 'rgba(255, 220, 0, 0.2)',
        },
        customPurple: {
          DEFAULT: '#B10DC9',
          light: 'rgba(177, 13, 201, 0.2)',
        },
        customTeal: {
          DEFAULT: '#3D9970',
          light: 'rgba(61, 153, 112, 0.2)',
        },
        customNavy: {
          DEFAULT: '#001f3f',
          light: 'rgba(0, 31, 63, 0.2)',
        },
        customCyan: {
          DEFAULT: '#39CCCC',
          light: 'rgba(57, 204, 204, 0.2)',
        },
        customPink: {
          DEFAULT: '#FF69B4',
          light: 'rgba(255, 105, 180, 0.2)',
        },
        customTomato: {
          DEFAULT: '#FF6347',
          light: 'rgba(255, 99, 71, 0.2)',
        },
        customLightBlue: {
          DEFAULT: '#7FDBFF',
          light: 'rgba(127, 219, 255, 0.2)',
        },
        customFirebrick: {
          DEFAULT: '#B22222',
          light: 'rgba(178, 34, 34, 0.2)',
        },
        customAmber: {
          DEFAULT: '#FFA500',
          light: 'rgba(255, 165, 0, 0.2)',
        },
        customPlum: {
          DEFAULT: '#DDA0DD',
          light: 'rgba(221, 160, 221, 0.2)',
        },
        customSlateBlue: {
          DEFAULT: '#6A5ACD',
          light: 'rgba(106, 90, 205, 0.2)',
        },
        customIndigo: {
          DEFAULT: '#4B0082',
          light: 'rgba(75, 0, 130, 0.2)',
        },
        customMaroon: {
          DEFAULT: '#800000',
          light: 'rgba(128, 0, 0, 0.2)',
        },
        customOlive: {
          DEFAULT: '#808000',
          light: 'rgba(128, 128, 0, 0.2)',
        },
        customChocolate: {
          DEFAULT: '#D2691E',
          light: 'rgba(210, 105, 30, 0.2)',
        },
        customGold: {
          DEFAULT: '#FFD700',
          light: 'rgba(255, 215, 0, 0.2)',
        },
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
        nunito: ["nunito ", 'sans-serif'],
        Montserrat: [ "Montserrat", 'sans-serif'],
        erica: [ "Gravitas One", 'sans-serif'],
      }

    },
  },
  plugins: [],
}


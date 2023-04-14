/** @type {import('tailwindcss').Config} */

const vaporwaveColors = {
  primary: '#FF6EC7',
  secondary: '#A74FFF',
  tertiary: '#00E1FF',
  accent: '#FFD0FF',
  background: '#14002E',
  text: '#FFFFFF',
  blue: '#1fb6ff',
  purple: '#7e5bef',
  pink: '#ff49db',
  orange: '#ff7849',
  red: '#ff0000',
  green: '#13ce66',
  yellow: '#ffc82c',
  black: '#000000',
  'gray-dark': '#273444',
  gray: '#8492a6',
  'gray-light': '#d3dce6',
  gunmetal: '#1f2937',
};

module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: vaporwaveColors,
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      // borderRadius: {
      //   '4xl': '2rem',
      // },
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
      },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

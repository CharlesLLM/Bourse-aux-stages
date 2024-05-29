/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
const defaultColors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    require.resolve('react-widgets/styles.css'),
  ],
  theme: {
    colors: {
      primary: '#4640DE',
      secondary: '#26A4FF',
      third: '#4E49DF',
      dark: '#202430',
      grey: '#A3A8B6',
      lightGrey: '#F8F8FD',
      darkGrey: '#25324B',
      darkBlue: '#2F3B53',
      textGrey: '#515B6F',
      borderGrey: '#D6DDEB',
      fourth: '#EAEAFF',
      ...defaultColors
    },
    screens: {
      xs: '550px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [require('react-widgets-tailwind')],
}

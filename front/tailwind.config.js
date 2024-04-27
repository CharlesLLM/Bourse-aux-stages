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
      darkBlue: '#2F3B53',
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

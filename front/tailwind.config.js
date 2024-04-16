/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#4640DE',
      secondary: '#26A4FF',
      third: '#4E49DF',
      dark: '#202430',
      grey: '#A3A8B6',
      darkBlue: '#2F3B53',
    },
    screens: {
      xs: '550px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
}




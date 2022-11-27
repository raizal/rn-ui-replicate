/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './<custom-folder>/**/*.{js,jsx,ts,tsx}',
    './src/common/components/**/*.{js,jsx,ts,tsx}',
    './src/features/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: {
            input: '#ebf4fe',
          },
          primary: {
            100: '#D5FCF3',
            200: '#ADFAEE',
            300: '#81F0E8',
            400: '#5FE2E2',
            500: '#30C2D0',
            600: '#239AB2',
            700: '#187695',
            800: '#0F5578',
            900: '#093E63',
          },
          success: {
            100: '#DEFDE9',
            200: '#BEFBDA',
            300: '#9BF4CC',
            400: '#7FEAC5',
            500: '#57ddbb',
            600: '#3FBEAA',
            700: '#2B9F98',
            800: '#1B7C80',
            900: '#105E6A',
          },
          info: {
            100: '#CFECFE',
            200: '#A0D5FE',
            300: '#70B9FC',
            400: '#4C9FFA',
            500: '#1376F7',
            600: '#0D5BD4',
            700: '#0943B1',
            800: '#062F8F',
            900: '#032176',
          },
          warning: {
            100: '#FEF6DD',
            200: '#FDEBBC',
            300: '#F9DB9A',
            400: '#F3CA7F',
            500: '#ebb156',
            600: '#CA8E3E',
            700: '#A96E2B',
            800: '#88501B',
            900: '#703C10',
          },
          danger: {
            100: '#FFE9D8',
            200: '#FFCEB2',
            300: '#FFAD8B',
            400: '#FF8D6F',
            500: '#FF593F',
            600: '#DB372E',
            700: '#B71F23',
            800: '#931420',
            900: '#7A0C1F',
          },
        },
      },
    },
  },
  plugins: [],
};

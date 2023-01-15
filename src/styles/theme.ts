import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    blue: {
      purple_light: '#6728B7',
      purple_dark: '#251751',
      blue_light: '#5548E1',
      blue_medium: '#1DC0B7',
      blue_dark: '#2E888D',
    },
    red: {
      red: '#FD0541',
      orange: '#F24822'
    },
    green: {
      green_light: '#05FD3C',
      green_dark: '#37DA1D',
    },
    gray: {
      gray_light: '#E5E5E5',
      gray_dark: '#B7AEFF',
      white: '#FFFFFF',
      black: '#000000'
    },
  },
  fonts: {
    light: 'Ubuntu_300Light',
    regular: 'Ubuntu_400Regular',
    medium: 'Ubuntu_500Medium',
    bold: 'Ubuntu_700Bold',
    nuvem: 'Modak_400Regular',
  },
  fontSizes: {
    16: 16,
    18: 18,
    26: 26,
    50: 50,
    75: 75,
    82: 82
  },
  sizes: {
    14: 56
  }
});
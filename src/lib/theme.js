import { DefaultTheme } from '@react-navigation/native'

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#05001A',
    textColor: '#fff',
    inputTextColor: '#05001A',
    buttonBackground: '#F46400',
    modalBackground: 'gray'
  },
};

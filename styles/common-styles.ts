import { StyleSheet } from 'react-native'

export const colors = {
  primary: '#ffd33d',
  secondary: '#25292e',
  white: '#fff',
  black: '#000',
}

export const commonStyles = StyleSheet.create({
  container: {
    width: 320,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  fullCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: colors.secondary,
    color: colors.white,
  },
})

import { StyleSheet } from 'react-native'

export const colors = {
  primary: '#ffd33d',
  secondary: '#1c274c',
  tertiary: '#2C8C99',
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
    backgroundColor: colors.primary,
    color: colors.white,
  },
})

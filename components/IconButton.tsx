import React from 'react'
import { Button, ButtonProps } from './Button'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { StyleSheet, Text } from 'react-native'
import { colors } from '@/styles/common-styles'

export type IconButtonProps = ButtonProps & {
  icon: keyof typeof MaterialIcons.glyphMap
  text?: string
  color?: string
  iconSize?: number
  wrapperStyle?: object
}

export function IconButton({
  icon,
  color,
  text,
  iconSize,
  wrapperStyle,
  label,
  ...props
}: IconButtonProps) {
  return (
    <Button style={[styles.wrapper, wrapperStyle]} {...props}>
      <MaterialIcons
        name={icon}
        size={iconSize || 24}
        color={color || colors.white}
      />
      {text && (
        <Text style={[styles.text, color && { color: color }]}>{text}</Text>
      )}
    </Button>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 4,
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
  },
})

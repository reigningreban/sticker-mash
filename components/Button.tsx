import { PropsWithChildren } from 'react'
import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native'

type LabelOrChildren =
  | {
      label: String
      children?: never
    }
  | {
      label?: never
    }

export type ButtonProps = PropsWithChildren &
  PressableProps &
  LabelOrChildren & {
    labelStyle?: object
  }

export function Button({
  children,
  label,
  labelStyle,
  style,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      style={[componentStyles.button, typeof style === 'object' && style]}
      {...props}
    >
      {children}
      {label && (
        <Text style={[componentStyles.label, labelStyle]}>{label}</Text>
      )}
    </Pressable>
  )
}

const componentStyles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 10,
  },
  label: {
    color: '#fff',
    fontSize: 16,
  },
})

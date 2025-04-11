import { ImageSource } from 'expo-image'
import React from 'react'
import { StyleSheet } from 'react-native'
import { EmojiList } from './EmojiList'
import { Modal, ModalProps } from './Modal'

interface EmojiPickerProps extends ModalProps {
  onSelect: (emoji: ImageSource) => void
}

export function EmojiPicker({ onSelect, ...props }: EmojiPickerProps) {
  return (
    <Modal {...props}>
      <EmojiList onSelect={onSelect} />
    </Modal>
  )
}

const styles = StyleSheet.create({})

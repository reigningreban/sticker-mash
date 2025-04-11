import { commonStyles } from '@/styles/common-styles'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton } from './IconButton'

export interface ImageOptionsProps {
  onSave: () => void
  onReset: () => void
  onAddSticker: () => void
}

export default function ImageOptions({
  onSave,
  onReset,
  onAddSticker,
}: ImageOptionsProps) {
  return (
    <View style={[commonStyles.container, styles.container]}>
      <IconButton icon="refresh" text="Reset" onPress={onReset} />
      <IconButton
        icon="add"
        iconSize={38}
        wrapperStyle={styles.addButton}
        color="#25292e"
        onPress={onAddSticker}
      />
      <IconButton icon="save-alt" text="Save" onPress={onSave} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: '100%',
    borderColor: '#ffd33d',
    borderWidth: 4,
  },
})

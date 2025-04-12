import { Image, type ImageSource } from 'expo-image'
import { StyleSheet } from 'react-native'
import { EmojiSticker } from './EmojiSticker'

export interface ImageViewerProps {
  source: ImageSource
  selectedEmoji?: ImageSource
}

export function ImageViewer({ source, selectedEmoji }: ImageViewerProps) {
  return (
    <>
      <Image source={source} style={styles.image} />
      {selectedEmoji && <EmojiSticker source={selectedEmoji} imageSize={40} />}
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
})

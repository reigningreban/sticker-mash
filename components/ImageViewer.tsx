import { Image, type ImageSource } from 'expo-image'
import { StyleSheet, View } from 'react-native'
import { EmojiSticker } from './EmojiSticker'
import { useRef } from 'react'

export interface ImageViewerProps {
  source: ImageSource
  selectedEmoji?: ImageSource
}

export function ImageViewer({ source, selectedEmoji }: ImageViewerProps) {
  const imageRef = useRef<View>(null)
  return (
    <>
      <View ref={imageRef}>
        <Image source={source} style={styles.image} />
      </View>
      {selectedEmoji && (
        <EmojiSticker
          source={selectedEmoji}
          imageSize={40}
          imageRef={imageRef}
        />
      )}
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

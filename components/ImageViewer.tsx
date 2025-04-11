import { Image, type ImageSource } from 'expo-image'
import { StyleSheet } from 'react-native'

export interface ImageViewerProps {
  source: ImageSource
}

export function ImageViewer({ source }: ImageViewerProps) {
  return <Image source={source} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
})

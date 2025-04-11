import { Image, type ImageSource } from 'expo-image'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export interface EmojiStickerProps {
  source: ImageSource
  imageSize: number
}

export function EmojiSticker({ imageSize, source }: EmojiStickerProps) {
  return (
    <View style={{ top: -350 }}>
      <Image source={source} style={{ width: imageSize, height: imageSize }} />
    </View>
  )
}

const styles = StyleSheet.create({})

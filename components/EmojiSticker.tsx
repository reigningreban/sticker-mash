import { type ImageSource } from 'expo-image'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

export interface EmojiStickerProps {
  source: ImageSource
  imageSize: number
}

export function EmojiSticker({ imageSize, source }: EmojiStickerProps) {
  const scaleImage = useSharedValue(imageSize)

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      scaleImage.value =
        scaleImage.value === imageSize ? imageSize * 2 : imageSize
    })

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    }
  })

  return (
    <View style={{ top: -350 }}>
      <GestureDetector gesture={doubleTap}>
        <Animated.Image
          source={source}
          resizeMode="contain"
          style={imageStyle}
        />
      </GestureDetector>
    </View>
  )
}

import { type ImageSource } from 'expo-image'
import React from 'react'
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

  const translate = useSharedValue({ x: 0, y: 0 })
  const drag = Gesture.Pan().onChange((event) => {
    translate.value = {
      x: event.translationX,
      y: event.translationY,
    }
  })

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    }
  })

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translate.value.x },
        { translateY: translate.value.y },
      ],
    }
  })

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={source}
            resizeMode="contain"
            style={imageStyle}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  )
}

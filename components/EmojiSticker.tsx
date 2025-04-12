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

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const drag = Gesture.Pan().onChange((event) => {
    // TODO: Limit movement to bounds of parent
    translateX.value += event.changeX
    translateY.value += event.changeY
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
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    }
  })

  return (
    <GestureDetector gesture={drag}>
      <Animated.View
        style={[containerStyle, { position: 'relative', top: 0, left: 0 }]}
      >
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

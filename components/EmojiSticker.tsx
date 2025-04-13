import { type ImageSource } from 'expo-image'
import React, { RefObject, useLayoutEffect } from 'react'
import { type LayoutRectangle, type View } from 'react-native'
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

export interface EmojiStickerProps {
  source: ImageSource
  imageSize: number
  imageRef: RefObject<View>
}

export function EmojiSticker({
  imageSize,
  source,
  imageRef,
}: EmojiStickerProps) {
  const parentLayout = useSharedValue<LayoutRectangle | null>(null)
  const scaleImage = useSharedValue(imageSize)

  const initialY = 350
  const initialX = 0
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const reposition = (
    event?: GestureUpdateEvent<
      PanGestureHandlerEventPayload & PanGestureChangeEventPayload
    >
  ) => {
    if (!parentLayout.value) return

    const changeX = event?.changeX || 0
    const changeY = event?.changeY || 0

    const newX = translateX.value + changeX
    const newY = translateY.value + changeY

    // Calculate boundaries considering the initial top offset and image size
    const maxX = parentLayout.value.width - scaleImage.value
    const maxY = initialY - scaleImage.value
    const minX = initialX
    const minY = initialY - parentLayout.value.height

    // Restrict movement within bounds
    translateX.value = Math.min(Math.max(newX, minX), maxX)
    translateY.value = Math.min(Math.max(newY, minY), maxY)
  }

  const doubleTap = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(2)
    .onStart(() => {
      scaleImage.value =
        scaleImage.value === imageSize ? imageSize * 2 : imageSize
    })
    .onEnd(() => reposition())

  useLayoutEffect(() => {
    if (imageRef.current) {
      imageRef.current.measure((_x, _y, width, height, pageX, pageY) => {
        parentLayout.value = { x: pageX, y: pageY, width, height }
      })
    }
  }, [])

  const drag = Gesture.Pan().runOnJS(true).onChange(reposition)

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
      <Animated.View style={[containerStyle, { top: -1 * initialY }]}>
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

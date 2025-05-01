import { Button } from '@/components/Button'
import { EmojiPicker } from '@/components/EmojiPicker'
import ImageOptions from '@/components/ImageOptions'
import { colors } from '@/styles/common-styles'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import domtoimage from 'dom-to-image'
import { ImageSource } from 'expo-image'
import { launchImageLibraryAsync } from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { useRef, useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { captureRef } from 'react-native-view-shot'
import { ImageViewer } from '../../components/ImageViewer'

const placeholderImage = require('@/assets/images/background-image.png')

export default function Index() {
  const [status, requestPermission] = MediaLibrary.usePermissions()

  const imageRef = useRef(null)

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  )
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectedEmoji, setSelectedEmoji] = useState<ImageSource | undefined>(
    undefined
  )

  const pickImageAsync = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    } else {
      alert('You did not select any image.')
    }
  }

  const onReset = () => {
    setSelectedImage(undefined)
    setSelectedEmoji(undefined)
  }

  const onSaveImageAsync = async () => {
    if (status === null) {
      requestPermission()
    }

    if (!(Platform.OS === 'web')) {
      try {
        const localUri = await captureRef(imageRef, {
          quality: 1,
        })

        if (localUri) {
          await MediaLibrary.saveToLibraryAsync(localUri)
          alert('Image saved to gallery!')
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        if (!imageRef.current) return

        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 1,
          width: 320,
          height: 440,
        })

        let link = document.createElement('a')
        link.download = 'sticker-smash.jpeg'
        link.href = dataUrl
        link.click()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const onAddSticker = () => setIsModalVisible(true)

  const closeModal = () => setIsModalVisible(false)

  const onSelectEmoji = (emoji: ImageSource) => {
    setSelectedEmoji(emoji)
    closeModal()
  }

  const imageToDisplay = selectedImage
    ? Platform.OS === 'web'
      ? selectedImage
      : { uri: selectedImage }
    : placeholderImage
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageWrapper}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer source={imageToDisplay} selectedEmoji={selectedEmoji} />
        </View>
      </View>
      {selectedImage ? (
        <ImageOptions
          onReset={onReset}
          onSave={onSaveImageAsync}
          onAddSticker={onAddSticker}
        />
      ) : (
        <View style={styles.buttonWrapper}>
          <Button style={styles.chooseButton} onPress={pickImageAsync}>
            <>
              <FontAwesome
                name="picture-o"
                size={18}
                color={colors.secondary}
                style={styles.chooseIcon}
              />
              <Text style={styles.chooseLabel}>Choose a Photo</Text>
            </>
          </Button>
          <Button
            label="Use this photo"
            onPress={() => setSelectedImage(placeholderImage)}
          />
        </View>
      )}
      <EmojiPicker
        isVisible={isModalVisible}
        onClose={closeModal}
        title="Choose a sticker"
        onSelect={onSelectEmoji}
      ></EmojiPicker>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    flex: 1,
    alignItems: 'center',
  },
  imageWrapper: {
    flex: 1,
    paddingTop: 10,
  },
  buttonWrapper: { alignItems: 'center', gap: 8, marginBottom: 20 },
  chooseButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 320,
    borderColor: '#ffd33d',
    borderWidth: 4,
  },
  chooseLabel: {
    color: colors.secondary,
    fontSize: 16,
  },
  chooseIcon: {
    paddingRight: 8,
  },
})

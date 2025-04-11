import { StyleSheet, View, Text } from 'react-native'
import { ImageViewer } from '../../components/ImageViewer'
import { Button } from '@/components/Button'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { launchImageLibraryAsync } from 'expo-image-picker'
import { useState } from 'react'
import ImageOptions from '@/components/ImageOptions'
import { EmojiPicker } from '@/components/EmojiPicker'
import { ImageSource } from 'expo-image'
import { EmojiSticker } from '@/components/EmojiSticker'

const placeholderImage = require('@/assets/images/background-image.png')

export default function Index() {
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

  const onSaveImageAsync = async () => {}

  const onAddSticker = () => setIsModalVisible(true)

  const closeModal = () => setIsModalVisible(false)

  const onSelectEmoji = (emoji: ImageSource) => {
    setSelectedEmoji(emoji)
    closeModal()
  }

  const imageToDisplay = selectedImage
    ? { uri: selectedImage }
    : placeholderImage
  return (
    <View className="bg-[#25292e] flex-1 items-center">
      <View className="flex-1 pt-5">
        <ImageViewer source={imageToDisplay} />
        {selectedEmoji && (
          <EmojiSticker source={selectedEmoji} imageSize={40} />
        )}
      </View>
      {selectedImage ? (
        <ImageOptions
          onReset={onReset}
          onSave={onSaveImageAsync}
          onAddSticker={onAddSticker}
        />
      ) : (
        <View className="items-center gap-2 mb-5">
          <Button style={styles.chooseButton} onPress={pickImageAsync}>
            <>
              <FontAwesome
                name="picture-o"
                size={18}
                color={'#25292e'}
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
    </View>
  )
}

const styles = StyleSheet.create({
  chooseButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 320,
    borderColor: '#ffd33d',
    borderWidth: 4,
  },
  chooseLabel: {
    color: '#25292e',
    fontSize: 16,
  },
  chooseIcon: {
    paddingRight: 8,
  },
})

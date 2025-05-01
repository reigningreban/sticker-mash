import { Image, type ImageSource } from 'expo-image'
import { useState } from 'react'
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import { Button } from './Button'
import { emojis } from '@/assets/images/images'

export interface EmojiListProps {
  onSelect: (emoji: ImageSource) => void
}

export function EmojiList({ onSelect }: EmojiListProps) {
  const [emoji] = useState<ImageSource[]>(emojis)
  return (
    <View style={styles.container}>
      <FlatList
        data={emoji}
        numColumns={5}
        renderItem={({ item, index }) => (
          <Button key={index} onPress={() => onSelect(item)}>
            <Image source={item} style={styles.image} />
          </Button>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflowX: 'scroll',
    height: '100%',
  },
  image: {
    height: 25,
    width: 25,
  },
})

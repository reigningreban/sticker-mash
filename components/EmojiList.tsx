import { Image, type ImageSource } from 'expo-image'
import { useState } from 'react'
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import { Button } from './Button'

export interface EmojiListProps {
  onSelect: (emoji: ImageSource) => void
}

export function EmojiList({ onSelect }: EmojiListProps) {
  const [emoji] = useState<ImageSource[]>([
    require('@/assets/images/emoji1.png'),
    require('@/assets/images/emoji2.png'),
    require('@/assets/images/emoji3.png'),
    require('@/assets/images/emoji4.png'),
    require('@/assets/images/emoji5.png'),
    require('@/assets/images/emoji6.png'),
  ])
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={Platform.OS === 'web'}
        data={emoji}
        contentContainerStyle={{}}
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
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
  },
  image: {
    height: 100,
    width: 100,
  },
})

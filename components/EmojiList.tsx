import { emojis } from '@/assets/images/images'
import { Image, type ImageSource } from 'expo-image'
import { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button } from './Button'
import { ScrollView } from 'react-native-gesture-handler'

export interface EmojiListProps {
  onSelect: (emoji: ImageSource) => void
}

export function EmojiList({ onSelect }: EmojiListProps) {
  const [emoji] = useState<ImageSource[]>(emojis)

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <FlatList
          data={emoji}
          numColumns={Math.ceil(emoji.length / 2)}
          renderItem={({ item, index }) => (
            <Button key={index} onPress={() => onSelect(item)}>
              <Image source={item} style={styles.image} />
            </Button>
          )}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflowX: 'scroll',
    height: '100%',
  },
  image: {
    height: 50,
    width: 50,
  },
})

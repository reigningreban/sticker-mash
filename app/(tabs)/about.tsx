import { colors, commonStyles } from '@/styles/common-styles'
import { View, Text, StyleSheet } from 'react-native'

export default function AboutPage() {
  return (
    <View style={[commonStyles.fullCenter, commonStyles.background]}>
      <Text style={styles.titleText}>About Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    color: colors.white,
  },
})

import { Link, Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Page Not Found' }} />
      <View style={styles.container}>
        <Link href={'/'} style={styles.linkText}>
          Go back to Home Screen!
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: 'blue',
  },
})

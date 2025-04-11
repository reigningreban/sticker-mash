import { Link, Stack } from 'expo-router'
import { View } from 'react-native'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Page Not Found' }} />
      <View className="flex-1 justify-center items-center">
        <Link href={'/'} className="text-blue-500">
          Go back to Home Screen!
        </Link>
      </View>
    </>
  )
}

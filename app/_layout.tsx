import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar'
import { Platform } from 'react-native'

export default function RootLayout() {
  if (Platform.OS === 'android') {
    NavigationBar.setPositionAsync('absolute')
    NavigationBar.setBackgroundColorAsync('#ffffff01') // To make in transparent
    NavigationBar.setButtonStyleAsync('dark')
  }
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'About' }} />
      </Stack>
    </>
  )
}

import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar'
import { Platform } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 2000,
  fade: true,
})

export default function RootLayout() {
  useEffect(() => {
    // simulate add load time
    setTimeout(() => SplashScreen.hide(), 2000)
  }, [])

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

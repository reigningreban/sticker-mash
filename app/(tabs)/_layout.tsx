import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '@/styles/common-styles'

interface TabBarIconProps {
  focused: boolean
  color: string
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerStyle: { backgroundColor: colors.secondary },
        headerShadowVisible: true,
        headerTintColor: colors.white,
        tabBarStyle: {
          backgroundColor: colors.secondary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }: TabBarIconProps) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ focused, color }: TabBarIconProps) => (
            <Ionicons
              name={
                focused ? 'information-circle' : 'information-circle-outline'
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  )
}
